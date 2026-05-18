# Step 4: Project Setup in VS Code

## Objective
Initialize a working Next.js + TypeScript + Tailwind project in the current workspace.

## Setup Outcome
A runnable app scaffold was created manually due environment constraints.

## Environment Constraints Encountered
- Folder naming restriction with uppercase letters blocked `create-next-app` in-place.
- Node runtime is v18, while latest `create-next-app` package expected Node 20+.

## Implemented Approach
- Manual Next.js 15 scaffold in current workspace.
- Compatible package versions installed for Node 18 environment.
- Config files created:
  - `tsconfig.json`
  - `next.config.ts`
  - `postcss.config.js`
  - `tailwind.config.ts`
  - `.eslintrc.json`
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`

## Verification
- `npm run dev` starts successfully.
- App served at `http://localhost:3000`.
