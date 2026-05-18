# Step 3: App Routes and Page Design

This document defines the application routes, page responsibilities, data contracts, and access expectations for the MVP.

## Route Map (Required)

1. `/dashboard`
2. `/students`
3. `/students/[id]`
4. `/students/[id]/notes`
5. `/students/[id]/interventions`
6. `/students/[id]/career-plan`
7. `/alerts`
8. `/communications`
9. `/meetings`
10. `/analytics`
11. `/settings`

---

## Global Navigation Structure

### Primary Sidebar
- Dashboard
- Students
- Alerts
- Communications
- Meetings
- Analytics
- Settings

### Context Tabs (Inside Student Profile)
- Overview
- Notes
- Interventions
- Career Plan

### Utility Header
- School switcher (future)
- Search students
- Notifications
- User menu

---

## Per-Route Page Design

## 1) `/dashboard`
### Purpose
Counselor command center for daily execution.

### Key Sections
- Priority list: students requiring action today.
- Risk alerts: open and escalated.
- Upcoming meetings.
- Follow-up tasks due soon.
- Caseload overview cards.
- AI recommendations panel (draft-only suggestions).

### Data Dependencies
- `Task`, `RiskAlert`, `Meeting`, `Student`, `StudentMetric`.

### Access
- Counselor, School Admin, District Admin.

---

## 2) `/students`
### Purpose
Roster and caseload management.

### Key Sections
- Search/filter table by grade, risk level, counselor, status.
- Quick student cards with risk and attendance indicators.
- Bulk actions (future).

### Data Dependencies
- `Student`, `StudentMetric`, `RiskAlert` (latest open count).

### Access
- Counselor, Support Staff, School Admin, District Admin.

---

## 3) `/students/[id]`
### Purpose
Unified student profile and longitudinal snapshot.

### Key Sections
- Student header: basic demographics, grade, counselor.
- Academic and attendance snapshot.
- Behavior and risk explanation panel.
- Guardian contacts and communication preferences.
- AI-generated student summary (must be reviewed before save).
- Mini timeline of latest notes/interventions.

### Data Dependencies
- `Student`, `Guardian`, `StudentGuardian`, `StudentMetric`, `RiskAlert`, `CounselorNote`, `Intervention`, `Communication`.

### Access
- Counselor, Support Staff (limited), School Admin, District Admin.

---

## 4) `/students/[id]/notes`
### Purpose
Case notes authoring and review.

### Key Sections
- Notes list (chronological).
- Create new note form.
- AI note drafting panel from free text.
- Human approval controls for AI-generated drafts.

### Data Dependencies
- `CounselorNote`, `AIAuditLog`.

### Access
- Counselor, School Admin.

---

## 5) `/students/[id]/interventions`
### Purpose
Intervention planning and execution tracking.

### Key Sections
- Intervention timeline by status and tier.
- New intervention creation.
- Due-date and completion tracking.
- Outcome summaries and effectiveness score.

### Data Dependencies
- `Intervention`, `Task`, `RiskAlert`.

### Access
- Counselor, School Admin.

---

## 6) `/students/[id]/career-plan`
### Purpose
College and career planning workspace.

### Key Sections
- Career interests and pathways.
- FAFSA and scholarship reminders.
- College application milestone table.
- AI career summary draft (human-reviewed).

### Data Dependencies
- `CareerPlan`, `CollegeApplication`, `Task`.

### Access
- Counselor, School Admin, Student/Family portal (future).

---

## 7) `/alerts`
### Purpose
Risk alert triage and escalation management.

### Key Sections
- Alert queue by level and status.
- Explainability pane: evidence and recommendation.
- Escalation actions with mandatory human review notes.

### Data Dependencies
- `RiskAlert`, `Student`, `Intervention`, `AIAuditLog`.

### Access
- Counselor, School Admin, District Admin.

---

## 8) `/communications`
### Purpose
Parent/guardian communication center.

### Key Sections
- Draft composer with AI assistance.
- Translation and readability helper.
- Approval and send workflow.
- Communication history log by student/guardian.

### Data Dependencies
- `Communication`, `Guardian`, `Student`, `AIAuditLog`.

### Access
- Counselor, School Admin.

---

## 9) `/meetings`
### Purpose
Meeting scheduling and follow-up tracking.

### Key Sections
- Calendar/list of meetings.
- Create/edit meeting with agenda.
- AI-generated agenda and summary drafts.
- Meeting outcome and task linkage.

### Data Dependencies
- `Meeting`, `Task`, `Student`.

### Access
- Counselor, School Admin.

---

## 10) `/analytics`
### Purpose
Outcome and operations intelligence.

### Key Sections
- Counselor workload dashboard.
- Student risk trend dashboard.
- Intervention outcome dashboard.
- Attendance improvement and time-saved estimate.

### Data Dependencies
- `StudentMetric`, `Intervention`, `RiskAlert`, `Task`, `Communication`.

### Access
- School Admin, District Admin, Counselor (limited view).

---

## 11) `/settings`
### Purpose
Configuration and policy controls.

### Key Sections
- Profile and school settings.
- Role and permission visibility (MVP read-only).
- AI safety and review preferences.
- Data retention and export settings (MVP limited).

### Data Dependencies
- `User`, `School`, policy config (future table).

### Access
- School Admin, District Admin; limited counselor profile settings.

---

## Guardrails by Route

- Sensitive workflows (`/alerts`, `/communications`, crisis-related actions) require explicit human confirmation before save/send/escalate.
- AI outputs are marked as draft until reviewed.
- Every AI action records an `AIAuditLog` entry.
- No route provides autonomous clinical decisioning.

---

## App Router File Plan (for implementation)

- `app/dashboard/page.tsx`
- `app/students/page.tsx`
- `app/students/[id]/page.tsx`
- `app/students/[id]/notes/page.tsx`
- `app/students/[id]/interventions/page.tsx`
- `app/students/[id]/career-plan/page.tsx`
- `app/alerts/page.tsx`
- `app/communications/page.tsx`
- `app/meetings/page.tsx`
- `app/analytics/page.tsx`
- `app/settings/page.tsx`

Optional shared layouts:
- `app/(app)/layout.tsx` for authenticated shell
- `app/(app)/...` route group migration in a later refactor

---

## Definition of Done for Step 3
Step 3 is complete when all required routes are documented with purpose, sections, access expectations, and implementation file targets.
