# Specification

## Summary
**Goal:** Unify the internal-user approval flow by using the existing backend `internalRoles` set as the single source of truth, and merge Customer Service approvals into the main internal approvals list in the superadmin dashboard.

**Planned changes:**
- Backend: Refactor all internal-approval role checks to use the existing `internalRoles` set in `backend/main.mo` (no new internal-role set/variable).
- Backend: Provide a single role-agnostic query for pending internal approvals that returns only users with `(role ∈ internalRoles) AND (status == pending)`, with no per-role branching.
- Backend: Make internal-user approval role-agnostic for any role in `internalRoles`, and persist approved users’ status to `active` immediately.
- Frontend (Superadmin): Remove the separate “Customer Service Users” section and show CUSTOMER_SERVICE users in the same internal approval (pending) table and internal users list as other internal roles.
- Frontend: Add lightweight automatic refresh (polling) to the caller-profile React Query so status changes (e.g., pending → active) update in the UI without manual refresh.

**User-visible outcome:** Superadmins see all internal pending approvals (including Customer Service) in one unified list and can approve/reject them through the same flow; internal users’ status updates appear in the UI automatically shortly after approval.
