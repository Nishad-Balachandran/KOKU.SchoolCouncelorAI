# Step 7: Prisma + API + AI + Risk + Audit Integration

## Objective
Replace mock-only behavior with real backend-capable data flow while preserving safety controls.

## Implemented Backend Foundation

### Prisma + Queries
- Prisma client singleton: `lib/db/prisma.ts`
- Data query layer with fallback support: `lib/db/queries.ts`

### Risk Scoring
- Rules-based risk scoring engine: `lib/risk/scoring.ts`
- Recalculation endpoint: `app/api/risk/recalculate/route.ts`

### AI Layer
- OpenAI-compatible wrapper: `lib/ai/client.ts`
- Copilot draft endpoint: `app/api/copilot/draft/route.ts`

### AI Audit Logging
- Logging utility: `lib/audit/log.ts`
- Copilot draft endpoint writes `AIAuditLog` events

### API Routes Added
- `app/api/dashboard/route.ts`
- `app/api/students/route.ts`
- `app/api/students/[id]/route.ts`
- `app/api/risk-alerts/route.ts`
- `app/api/copilot/draft/route.ts`
- `app/api/risk/recalculate/route.ts`

### Seed and Environment
- Seed script: `prisma/seed.ts`
- Environment template: `.env.example`
- Scripts updated in `package.json`:
  - `prisma:generate`
  - `prisma:push`
  - `db:seed`

## UI Wiring Changes
- Dashboard, Students, Student Profile, and Alerts pages now read through the query layer.
- Query layer attempts live Prisma first and falls back to mock data if DB is unavailable.

## Validation Results
- Prisma client generation: success
- Lint: success
- Type diagnostics: no errors

## Runtime Prerequisite
Database push/seed requires PostgreSQL running locally or accessible via `DATABASE_URL`.

Example local setup:
1. `docker run --name counselor-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=counselor_ai -p 5432:5432 -d pgvector/pgvector:pg16`
2. `cp .env.example .env`
3. `npm run prisma:push`
4. `npm run db:seed`
