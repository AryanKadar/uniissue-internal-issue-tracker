first commit:
"# Git Commit History Plan (UniIssue)

1. chore: initial project setup - Lovable React frontend + FastAPI backend skeleton (database tables pending)
   → (you are committing this right now)

2. feat: setup PostgreSQL models + schemas (Issue & Comment) with proper relationships

3. feat: configure FastAPI database connection, Alembic migrations and CORS for port 5173

4. feat: implement full REST API endpoints for issues (CRUD) with server-side validation

5. feat: implement comments API (GET + POST per issue)

6. feat: create seed endpoint + script to populate 15 realistic issues + comments

7. feat: connect React frontend to FastAPI backend (replace local state with fetch/axios)

8. feat: implement dashboard filters, search, status counts and CSV export

9. feat: add issue detail modal with live status change and comment functionality

10. polish: add loading states, error handling, responsive fixes and batch files

11. docs: create ARCHITECTURE.md and PROMPTS.md with full documentation

12. chore: final cleanup, remove console.logs, update README and .env.example"

Second Commit:
"feat: add FastAPI backend + wire frontend to real API

- Add Backend/ with FastAPI + SQLAlchemy 2.0 async + Alembic + Pydantic v2
- Create issues + comments tables in unico PostgreSQL database
- Full CRUD REST API: /api/issues, /api/issues/{id}/comments, /api/export-csv, /api/seed
- Replace frontend local SEED_ISSUES state with useIssues() hook + api.ts fetch client
- Add loading/error/retry states in Index.tsx
- Update NewIssueModal and IssueDetailModal to use async API calls
- Add .env files for Backend (DB creds + CORS) and Frontend (VITE_API_URL)
- Add backend.bat + frontend.bat for one-click startup
- Add Plan_Md/PLAN_backend.md, PLAN_frontend_changes.md, PLAN_setup.md
- Add Test/test_issues.py + Test/test_comments.py
"
Third Commit:
Fourth Commit:
Fifth Commit:
Sixth Commit:
Seventh Commit:
Eighth Commit:
Ninth Commit:
Tenth Commit:
Eleventh Commit:
Twelfth Commit: