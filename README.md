# UniIssue — Internal Issue Tracker

UniIssue is a full‑stack internal issue tracker built for a small consulting firm. It provides a dark, professional dashboard to create, view, filter, and update issues across multiple projects, with comments and status tracking.

## Demo video

- `2026-03-02 15-09-26.mp4` (included in this repo)

## The problem (client brief)

A small consulting firm needs a simple internal tool where a ~15 person team can log issues (bugs, feature requests, improvements) for 4 projects. They want:

- Issue creation with validation (title, description, project, priority, assignee, status)
- A dashboard showing all issues, with filtering and search (title/description)
- Status counts summary (Open / In Progress / Resolved / Closed)
- Issue detail view with status change + timestamped text comments
- A clean REST API that works via curl/Postman (server-side validation)
- A database with a clean schema and seeded sample data (12–15 realistic issues)

## The solution (what this project implements)

UniIssue implements the full brief end‑to‑end:

- Full CRUD for issues (create/read/update/delete)
- Filtering by project / priority / status / assignee + search
- Issue details + comments with timestamps
- FastAPI REST API + OpenAPI docs
- PostgreSQL database schema with relationships + Alembic migrations + seed data

## Tech stack

### Frontend

- React 18 + TypeScript
- Vite (dev server, typically `http://localhost:5173`)
- Tailwind + component UI library (shadcn-style components under `Frontend/src/components/ui`)

### Backend

- FastAPI (Python)
- SQLAlchemy 2.0 + Alembic
- PostgreSQL (async driver: `asyncpg`)

## High-level architecture

- The **React frontend** calls the **FastAPI backend** over HTTP.
- The **FastAPI backend** validates requests (Pydantic), applies business rules, and reads/writes to **PostgreSQL** (SQLAlchemy).
- Issues have a one-to-many relationship with comments.

For the full architecture write-up (endpoints, schema, component responsibilities), see:
- `Plan_Md/ARCHITECTURE.md`

## API overview

Common endpoints (see the full list in OpenAPI docs):

- `GET /health`
- Issues:
  - `GET /issues`
  - `GET /issues/{issue_id}`
  - `POST /issues`
  - `PUT /issues/{issue_id}`
  - `PATCH /issues/{issue_id}/status`
  - `DELETE /issues/{issue_id}`
- Comments:
  - `GET /issues/{issue_id}/comments`
  - `POST /issues/{issue_id}/comments`

Docs:
- Swagger: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database schema (summary)

- `issues`
  - title, description, project, priority, assignee, status, created_at, updated_at
- `comments`
  - issue_id (FK), author, body, created_at

Relationship:
- One issue → many comments (cascade delete)

## Getting started (local)

### Prerequisites

- Node.js + npm
- Python 3.x
- PostgreSQL

### 1) Backend setup

From repo root:

```bash
cd Backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

Configure env:

- Copy `Backend/.env.example` → `Backend/.env` and set your Postgres connection values.

Run:

```bash
.\backend.bat
```

Backend will run on `http://localhost:8000`.

### 2) Frontend setup

From repo root:

```bash
cd Frontend
npm install
```

Configure env:

- Copy `Frontend/.env.example` → `Frontend/.env` and set `VITE_API_URL` if needed.

Run:

```bash
.\frontend.bat
```

Frontend will run on `http://localhost:5173`.

## Tests

Backend tests live in `Test/`:

```bash
cd Test
pytest
```

## Project structure

```
Backend/   # FastAPI + DB models + migrations
Frontend/  # React + TS UI
Test/      # API + connectivity tests
Plan_Md/   # architecture, prompts, planning docs
2026-03-02 15-09-26.mp4  # demo video
```

## Notes

- If you commit additional videos/assets in the future and the repo becomes too large, consider Git LFS.

