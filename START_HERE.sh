#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "==> Counselor AI OS startup"

if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: npm is not installed. Please install Node.js + npm first."
  exit 1
fi

if [[ -f "package-lock.json" ]]; then
  echo "==> Installing dependencies with npm ci"
  npm ci
else
  echo "==> Installing dependencies with npm install"
  npm install
fi

if [[ ! -f ".env" ]]; then
  if [[ -f ".env.example" ]]; then
    echo "==> Creating .env from .env.example"
    cp .env.example .env
  else
    echo "WARNING: .env.example not found. Create .env manually if needed."
  fi
fi

# Load .env variables for this script (if file exists)
if [[ -f ".env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

DEFAULT_DB_URL="postgresql://postgres:postgres@localhost:5432/counselor_ai?schema=public"
DATABASE_URL="${DATABASE_URL:-$DEFAULT_DB_URL}"

maybe_start_postgres() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "==> Docker not found. Skipping local Postgres container startup."
    return
  fi

  if docker ps --format '{{.Names}}' | grep -qx "counselor-postgres"; then
    echo "==> Postgres container already running (counselor-postgres)"
    return
  fi

  if docker ps -a --format '{{.Names}}' | grep -qx "counselor-postgres"; then
    echo "==> Starting existing Postgres container (counselor-postgres)"
    docker start counselor-postgres >/dev/null
    return
  fi

  echo "==> Creating local Postgres container (counselor-postgres)"
  docker run --name counselor-postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=counselor_ai \
    -p 5432:5432 \
    -d pgvector/pgvector:pg16 >/dev/null
}

wait_for_postgres() {
  local max_tries=20
  local try=1

  until npm run prisma:generate >/dev/null 2>&1 && DATABASE_URL="$DATABASE_URL" npx prisma db pull --print >/dev/null 2>&1; do
    if (( try >= max_tries )); then
      echo "==> Database is not reachable after waiting."
      return 1
    fi
    echo "==> Waiting for database... ($try/$max_tries)"
    sleep 2
    ((try++))
  done

  return 0
}

maybe_start_postgres

echo "==> Generating Prisma client"
DATABASE_URL="$DATABASE_URL" npm run prisma:generate

if wait_for_postgres; then
  echo "==> Pushing Prisma schema"
  DATABASE_URL="$DATABASE_URL" npm run prisma:push

  echo "==> Seeding database"
  DATABASE_URL="$DATABASE_URL" npm run db:seed
else
  echo "WARNING: Skipping prisma:push and db:seed because database is not reachable."
  echo "         You can still run the app with mock fallback data."
fi

echo "==> Starting Next.js dev server on http://localhost:3000"
npm run dev
