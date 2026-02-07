# Specification

## Summary
**Goal:** Add a Client “Service Request” flow to submit and view service request tasks with a selectable request priority (requestType), supported by a minimal backend TaskRecord update.

**Planned changes:**
- Backend: extend Minimal Task record to include `requestType : Text` with allowed values `NORMAL`, `PRIORITY`, `URGENT`, and ensure older stored tasks safely default to `NORMAL` when read (or migrate on upgrade if required).
- Backend: update the client task creation endpoint to accept/persist `requestType`, validate it (reject invalid values with an English technical error), and always create tasks in `REQUESTED` status without mutating any service/layanan counters.
- Frontend: add React Query hooks for creating a client request and listing the caller’s submitted requests, following existing actor readiness/access-guard patterns and English technical error handling.
- Frontend: add a “Service Request” section/tab inside `/client` with a request form (title, description, requestType radios/segmented control with helper text, optional deadline) plus a list of submitted requests showing requestType badges and status `REQUESTED`, with no pricing fields.
- Frontend: on submit success, do not redirect; show the exact English success message and refresh the list; on error, show a non-crashing English error state/toast.
- Frontend: integrate new user-facing copy via the existing i18n system (EN/ID keys), while keeping technical/system/backend error strings in English and out of translation-based logic.

**User-visible outcome:** Clients can submit a service request (choosing Normal/Priority/Urgent and optionally a deadline) and see a list of their submitted requests with requestType badges and `REQUESTED` status, staying on the same `/client` page after submission.
