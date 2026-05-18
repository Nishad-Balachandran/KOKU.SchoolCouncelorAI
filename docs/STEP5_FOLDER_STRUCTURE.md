# Step 5: Folder Structure

## Objective
Create a clean, scalable project structure before feature expansion.

## Created Structure

### App Routes
- `app/dashboard`
- `app/students`
- `app/students/[id]`
- `app/students/[id]/notes`
- `app/students/[id]/interventions`
- `app/students/[id]/career-plan`
- `app/alerts`
- `app/communications`
- `app/meetings`
- `app/analytics`
- `app/settings`
- `app/api/*` (added in Step 7)

### Components
- `components/ui`
- `components/shared`
- `components/dashboard`
- `components/students`
- `components/alerts`
- `components/interventions`
- `components/copilot`
- `components/analytics`

### Libraries
- `lib/auth`
- `lib/db`
- `lib/ai`
- `lib/risk`
- `lib/rbac`
- `lib/audit`
- `lib/validators`
- `lib/utils`

### Data and Types
- `data/mock`
- `types`
- `prisma`
- `inngest`

## Why This Matters
- Keeps domain logic separated from UI.
- Supports incremental migration from mock data to persistent data.
- Makes safety-critical logic discoverable and testable.
