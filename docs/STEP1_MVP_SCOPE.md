# Step 1: MVP Scope for Counselor AI OS

## Product Goal
Build an AI Operating System for School Counseling Departments that reduces counselor administrative burden, improves proactive support for students, and increases intervention quality and follow-through while maintaining FERPA-aware, human-in-the-loop workflows.

## Scope Segmentation

### Must-have MVP (Demo-ready)

#### 1) Core Platform Foundations
- Authentication placeholder with role concept: Counselor, Admin.
- Basic role-based access control checks in server-side handlers.
- FERPA-aware defaults: minimum required data shown in UI and logs.
- Audit logging for AI generation and approval events.

#### 2) Counselor Dashboard
- Daily priority list of students needing action.
- Student risk alerts list with explainable reasons.
- Upcoming meetings widget.
- Follow-up task reminders.
- Caseload overview cards (active students, open alerts, pending tasks).
- AI recommendations panel (draft suggestions only).

#### 3) Student Records
- Student list page with search and filters.
- Student profile page with:
  - Academic history snapshot
  - Attendance trends
  - Behavior notes
  - Counselor notes
  - Guardian contacts
  - Intervention history timeline
- AI-generated student summary with explicit human approval before save.
- Risk score explanation panel (why alert was created).

#### 4) AI Counselor Copilot (Assistive-only)
- Draft parent email.
- Draft intervention plan.
- Suggest next-best actions.
- Create meeting agenda.
- Convert free text notes into structured case notes.
- Safety rule: no auto-send, no auto-save, no diagnosis generation.

#### 5) Risk Detection Agent (Rules-first, explainable)
- Detect grade drops.
- Detect chronic absenteeism.
- Detect missed intervention follow-ups.
- Detect graduation risk signals.
- Emit explainable alerts with confidence labels and evidence fields.
- Human review required before any sensitive workflow action.

#### 6) Parent Communication Agent (MVP)
- Draft email/SMS text.
- Translation draft support.
- Parent-friendly summary generation.
- Communication history tracking.
- Human approval required before any outbound action.

#### 7) Crisis and Escalation Workflow (Safety-critical)
- Crisis triage view with human-in-the-loop decision points.
- Safety protocol checklist template.
- Referral and emergency contact workflow tracking.
- Explicit disclaimer that AI does not replace licensed professionals.
- Hard guardrail: no autonomous crisis decisions.

#### 8) Documentation and Compliance Agent
- Meeting summary drafts.
- FERPA-safe note formatting templates.
- Intervention documentation drafts.
- Exportable summary reports (CSV/PDF in later MVP sprint if needed).
- Full AI audit trail for generated and approved outputs.

#### 9) MVP Analytics
- Counselor workload snapshot.
- Student risk snapshot.
- Intervention status snapshot.
- Attendance change summary.
- Time-saved estimate (heuristic baseline).

---

### Should-have (Post-MVP / Phase 1.5)

#### College and Career Planning Agent
- Career pathway suggestions.
- College checklist and milestone tracking.
- Scholarship reminders.
- FAFSA reminder workflows.
- Application milestone tracking dashboard.

#### Workflow Automation and Jobs
- Scheduled reminders for stale tasks and unresolved alerts.
- Batch risk recalculation jobs.
- Notification digests by counselor.

#### Integrations (Initial)
- Google/Microsoft calendar sync for meetings.
- Email provider integration.
- CSV import tools for SIS exports.

#### Data and Documents
- Upload and parse PDFs, CSVs, and counselor notes.
- Attach parsed context to student profile and AI draft generation.

#### Enhanced Analytics
- Intervention outcome trend chart.
- FAFSA completion tracking.
- Attendance improvement tracking by cohort.

---

### Later Roadmap (Enterprise Platform)

#### District-grade Scale
- Multi-school, multi-tenant district architecture.
- Advanced RBAC and policy controls by district.
- District and school benchmark analytics.

#### Advanced AI and Memory
- Vector memory with pgvector or Pinecone.
- Retrieval-augmented generation over policy/procedure docs.
- Agent orchestration across risk, communication, and compliance events.

#### Ecosystem Integrations
- SIS: PowerSchool, Infinite Campus.
- LMS: Google Classroom, Canvas.
- State reporting pipelines and templates.

#### Governance and Fairness
- Bias monitoring dashboards for risk logic outcomes.
- Explainability and confidence calibration tooling.
- Model and prompt governance with version history.

#### Clinical Safety Extensions
- Higher-confidence escalation support with institutional protocols.
- Expanded referral partner workflows with strict human control.

---

## Non-negotiable MVP Guardrails
- AI is assistive only.
- No autonomous crisis decisions.
- No diagnosis generation.
- Human approval before sensitive actions, outbound communication, and record persistence.
- Explainable risk alerts only (no black-box scoring).
- Audit log every AI generation, review, approval, rejection, and edit.

---

## Definition of Done for Step 1
Step 1 is complete when all product features are prioritized into:
1. Must-have MVP
2. Should-have
3. Later roadmap

This document satisfies that requirement and is the baseline for Step 2 (Prisma schema design).
