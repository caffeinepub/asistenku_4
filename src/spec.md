# Specification

## Summary
**Goal:** Fix backend internal user registration so multiple internal users can be registered by the same SUPERADMIN without overwriting, ensure IDs remain unique across upgrades, and make CUSTOMER_SERVICE role handling consistent with other internal roles.

**Planned changes:**
- Update `backend/main.mo` `registerInternalUser(role, name, email, whatsapp)` to generate unique internal user IDs using a counter-based `INT-<number>` strategy (not derived from caller Principal) so repeated calls from the same SUPERADMIN create distinct entries in `userProfilesById`.
- Persist/restore the internal ID counter safely across canister upgrades, with a minimal conditional migration if needed to prevent new `INT-*` IDs from colliding with existing keys in `userProfilesById`.
- Add a safety guard in `registerInternalUser` to prevent silent overwrite if a generated `userId` already exists in `userProfilesById` (deterministically retry to a free ID or trap with a clear error).
- Keep `registerInternalUser` authorization unchanged: only callable by authenticated callers whose existing profile role is `SUPERADMIN`; reject anonymous and non-SUPERADMIN callers.
- Ensure `CUSTOMER_SERVICE` registration and returned/listed data uses the same `UserProfile` structure/path as other internal roles (role preserved as `CUSTOMER_SERVICE`, status `#pending`, stored in both `userProfilesById` and `userProfilesByPrincipal`) and avoid any special-case DTO/path that loses role information.

**User-visible outcome:** A SUPERADMIN can register multiple internal users (including CUSTOMER_SERVICE) without registrations overwriting each other, and after upgrades new internal registrations continue producing non-colliding `INT-*` IDs while role information remains consistent in backend data.
