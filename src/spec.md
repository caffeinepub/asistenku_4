# Specification

## Summary
**Goal:** Add backend-only core modules for Services, Tasks, Partner Wallet, and Financial Summary in `backend/main.mo`, with strict role-based authorization and empty-safe reads, without changing existing User/Role/ID logic.

**Planned changes:**
- Add a Services module: `Service` data model, `servicesById` / `servicesByClientId` storage, and endpoints for creating/updating services, client service reads, caller active-service check, and SUPERADMIN-only service stats (all empty-safe).
- Add a Tasks module: `Task` data model, `tasksById` / `tasksByClientId` / `tasksByPartnerId` storage, and endpoints for client task creation (requires ACTIVE service), staff assignment/status updates, and client/partner “my tasks” reads (all empty-safe; no automatic transitions).
- Add a Partner Wallet module: `PartnerWallet` model, `walletByPartnerId` storage, minimal withdrawal-request model + storage, and endpoints for PARTNER wallet read (zero-safe), PARTNER withdraw request, and ADMIN/SUPERADMIN approval (no automatic payout actions).
- Add a SUPERADMIN-only Financial Summary endpoint that aggregates GMV from services and partner payouts from wallets with fully empty-safe 0/empty-map outputs and Nat-safe gross margin arithmetic.

**User-visible outcome:** No UI changes; new canister methods become available to manage services, tasks, partner wallets/withdrawals, and to fetch SUPERADMIN financial summaries with safe behavior on empty/missing data.
