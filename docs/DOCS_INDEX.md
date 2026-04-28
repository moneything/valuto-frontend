# Docs Index

Guide to which docs are current source-of-truth and which are older implementation notes.

## Read These First

- `docs/START_HERE.md`
- `README.md`
- `backend/docs/SETUP_GUIDE.md`
- `frontend/docs/APP_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`

## Current Source-Of-Truth Docs

- `README.md`
  - repo overview, stack, route groups, access model
- `docs/START_HERE.md`
  - fastest path for a new developer
- `docs/ACCESS_AND_BILLING_FLOW.md`
  - auth, onboarding, paywall, Stripe flow
- `backend/docs/SETUP_GUIDE.md`
  - backend and local environment setup
- `backend/docs/API_DOCUMENTATION.md`
  - current backend route surface
- `backend/docs/ops-testing-runbook.md`
  - staging and production validation
- `frontend/docs/APP_GUIDE.md`
  - current frontend route and integration view
- `FRONTEND_INTEGRATION_GUIDE.md`
  - frontend plus backend integration checks
- `DEPLOYMENT_CHECKLIST.md`
  - production deployment and validation

## Historical Or Feature-Specific Notes

Most files under `frontend/docs/` and some files under `backend/docs/` are implementation notes for one feature or change. They can still be useful for context, but they should not be treated as the current system contract unless they agree with the source-of-truth docs above.

Examples:

- `frontend/docs/CUSTOM_AUTH_PAGE.md`
- `frontend/docs/LAUNCH_APP_FLOW.md`
- `frontend/docs/DASHBOARD_IMPROVEMENTS.md`
- `frontend/docs/HERO_ENHANCEMENTS.md`
- `backend/docs/PROJECT_COMPLETION_REPORT.md`
- `backend/docs/BACKEND_IMPLEMENTATION_SUMMARY.md`

## When Updating Docs

- Update the source-of-truth docs first.
- Keep route lists and env vars aligned across frontend and backend docs.
- If a feature note becomes stale, either refresh it or treat it as historical context instead of active guidance.
