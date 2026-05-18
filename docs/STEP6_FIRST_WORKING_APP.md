# Step 6: First Working App (Mock-backed UI)

## Objective
Deliver a clickable, demo-ready app with core counselor workflows using realistic mock data.

## Implemented UI Modules
- Authentication placeholder (`lib/auth/mock-session.ts`)
- Dashboard (`app/dashboard/page.tsx`)
- Student roster (`app/students/page.tsx`)
- Student profile (`app/students/[id]/page.tsx`)
- Route placeholders for notes/interventions/career-plan/alerts/communications/meetings/analytics/settings

## Reusable Components Added
- App shell and navigation (`components/shared/app-shell.tsx`)
- Copilot panel (`components/copilot/copilot-panel.tsx`)
- Risk alert list (`components/alerts/risk-alert-list.tsx`)
- Intervention timeline (`components/interventions/intervention-timeline.tsx`)
- Student list table (`components/students/student-list-table.tsx`)

## Mock Data
- `data/mock/students.ts`
- Includes:
  - students
  - risk alerts
  - dashboard tasks
  - intervention samples

## Safety UX in MVP
- AI output explicitly marked draft-only.
- Human approval messaging shown in UI.
- No auto-send / no auto-save behavior represented in flow.

## Verification
- App pages render and route correctly.
- `npm run dev` starts successfully.
