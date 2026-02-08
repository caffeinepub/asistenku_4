# Specification

## Summary
**Goal:** Activate real internal access-code verification and enable Superadmin to view and update Code A & Code B (including status) from the Dashboard settings tab.

**Planned changes:**
- Backend: Add anonymous internal access-code verification that returns the route for Code A (`/internal/login`) and Code B (`/internal/daftar`), and rejects any other (or inactive) code as invalid.
- Backend: Add SUPERADMIN-only APIs to fetch the current Code A/Code B values with status and last-updated timestamp, and to update/rotate both codes and their statuses.
- Frontend: Replace the InternalGatePage mock verification with a real backend call; navigate only on success and show an invalid-code error otherwise (only set existing sessionStorage flags on success).
- Frontend: Implement the Superadmin Dashboard “Pengaturan” tab to load and display Code A and Code B (value, status, last updated) and allow editing/saving, with loading + error states; all new user-facing text is in English.
- Frontend: Add/extend React Query hooks for verify/fetch/update; ensure mutations invalidate/refetch so the settings view stays current.

**User-visible outcome:** Users entering the correct internal access codes are routed to the correct internal login or registration page; Superadmins can view and update Code A and Code B (and enable/disable them) from the Dashboard “Pengaturan” tab.
