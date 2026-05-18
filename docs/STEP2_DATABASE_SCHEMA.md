# Step 2: Database Schema (Prisma)

## Objective
Design a production-ready schema for school counseling workflows with safety, auditability, and explainability built in.

## Implemented File
- `prisma/schema.prisma`

## Core Models
- `School`
- `User`
- `Student`
- `Guardian`
- `StudentGuardian` (join table)
- `CounselorNote`
- `Intervention`
- `RiskAlert`
- `Communication`
- `Meeting`
- `Task`
- `Document`
- `AIAuditLog`
- `StudentMetric`
- `CareerPlan`
- `CollegeApplication`

## Key Design Choices
- Multi-entity school context through `schoolId` for district-readiness.
- Explainable risk model with `RiskAlert.explanation`, `evidence`, and `recommendation`.
- Human-in-loop controls via fields such as:
  - `requiresHumanReview`
  - `reviewedByHuman`
  - `approvedByHuman`
- FERPA-aware note metadata:
  - `ferpaSafe`
  - `containsSensitiveContent`
- AI governance and traceability through `AIAuditLog`.

## Enum Coverage
Includes enums for roles, statuses, levels, channels, priorities, alert types, audit actions, and application states.

## Validation
- Prisma schema validated and Prisma Client generation succeeds.
