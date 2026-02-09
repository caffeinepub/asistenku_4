# Specification

## Summary
**Goal:** Patch the internal registration and approval flow so authenticated users can self-register once, receive per-role generated internal IDs, see superadmin-claim visibility in the login UI, and enforce role-based approval authorization.

**Planned changes:**
- Backend: Allow any authenticated (non-anonymous) caller to register an internal profile via `registerInternalUser(role, name, email, whatsapp)`, enforcing a hard guard of 1 Principal → 1 UserProfile (trap exactly `"User already has a profile"` if already registered).
- Backend: Add `generateInternalUserIdByRole(role)` with per-role counters, exact prefix mapping, and 6-digit zero padding; reject invalid roles (trap with `"Invalid role"` or equivalent) and prevent SUPERADMIN registration via this flow.
- Backend: Treat internal userId collisions as a hard error (trap if `userProfilesById` already contains the generated userId; no auto-regeneration).
- Backend: Persist newly registered internal profiles with status `#pending`, internalData `{name,email,whatsapp}`, and save to both `userProfilesById` and `userProfilesByPrincipal`; return the generated userId.
- Backend: Rework `listApprovals` / `setApproval` authorization to be based on the caller role stored in `userProfilesByPrincipal` (SUPERADMIN can approve any; ADMIN can approve any except ADMIN/SUPERADMIN; others unauthorized; missing target traps exactly `"User not found"`).
- Backend: Add query endpoint `isSuperadminClaimed(): async Bool` for frontend visibility.
- Frontend: Update `/internal/daftar` to a single registration form (role dropdown, required name/whatsapp/email, userId read-only placeholder `"(will be generated)"`, principalId read-only with copy) and show a success state with `"Pending — waiting for admin approval"` (no auto-redirect).
- Frontend: Update `/internal/daftar` “My Workspace” button to fetch the caller profile; if status is pending, show a pending message and do not navigate; otherwise preserve existing navigation behavior.
- Frontend: Map registration trap errors to English UI strings: `"User already has a profile"` → `"This account is already registered. Please log in."`; invalid role → `"Role is not available."`; otherwise → `"Registration failed. Please try again."`.
- Frontend: Update `/internal/login` to hide the “Claim Superadmin” card when `isSuperadminClaimed()` is true, without calling `claimSuperadmin()` as a check.

**User-visible outcome:** Internal users can register exactly once from `/internal/daftar`, see that their user ID will be generated and their status is pending until approved, avoid incorrect dashboard navigation while pending, see clearer registration errors, and the “Claim Superadmin” option disappears after it has been claimed.
