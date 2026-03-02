## Repo Metadata (Suggested)

- **Project name (product)**: UniIssue – Internal Issue Tracker  
- **Suggested GitHub repo name**: `uniissue-internal-issue-tracker`  
- **Short description**:  
  - **One‑liner**: “Full‑stack internal issue tracker with a dark, professional dashboard for a 4‑project consulting team.”  
  - **Longer description**:  
    - “UniIssue is a full‑stack issue tracker built with React + TypeScript (Vite) on the frontend and FastAPI + SQLAlchemy + PostgreSQL on the backend. It provides a dark, professional dashboard where a 15‑person consulting team can log issues, filter by project/priority/status/assignee, change status, and add timestamped comments. The repo also includes a demo video of the app in action.”
- **Recommended GitHub topics**: `issue-tracker`, `fastapi`, `react`, `typescript`, `postgresql`, `full-stack`, `vite`, `dark-theme`

## What This Repository Contains

- **Frontend** (`Frontend/`)
  - React 18 + TypeScript + Vite app
  - UI components (Shadcn/Chakra‑style) for dashboard, filters, issue table, modals, and status cards
  - Hooks (`useIssues`, `use-toast`) and API helper (`src/lib/api.ts`)
  - Test setup and example tests (`src/test/`)
- **Backend** (`Backend/`)
  - FastAPI app (`main.py`) with routers for `issues` and `comments`
  - SQLAlchemy models, Pydantic schemas, Alembic migrations, and seed script
  - PostgreSQL connection via `database.py`
- **Tests** (`Test/`)
  - API tests for issues and comments
  - Full‑stack connectivity test (DB ↔ backend ↔ frontend)
- **Plans & Docs** (`Plan_Md/`)
  - `ARCHITECTURE.md`, `PROMPTS.md`, `problem.md`, `git_commit.md`, and this `PLAN_github.md`
- **Demo video**
  - Root‑level file: `Demo_video.mp4`  
  - This must be **committed and pushed** with the rest of the code so the GitHub repo includes a full walkthrough of the app.

## Prerequisites

- **Git** is installed and configured with your GitHub user/email.
- You are inside the project root in your terminal:  
  - `c:\Users\aryan\OneDrive\Desktop\unico`
- This folder is already a Git repo (it is, based on `git status`).

## Step 1 – Create the GitHub Repository

1. Go to GitHub in your browser and create a **new repository**.
2. Set:
   - **Owner**: your GitHub user (e.g. `AryanKadar`)
   - **Repository name**: `uniissue-internal-issue-tracker`
   - **Description**: copy/paste the longer description from **Repo Metadata** above.
   - **Visibility**: choose **Public** (or Private if you prefer).
3. **Do not** initialize with a README, `.gitignore`, or license (the local repo already exists).
4. Click **Create repository** and copy the **`https`** and/or **`ssh`** URL.

## Step 2 – Point Local Git Repo to GitHub

In a terminal at `c:\Users\aryan\OneDrive\Desktop\unico`:

- If there is **no** `origin` yet:

```bash
git remote add origin https://github.com/<your-username>/uniissue-internal-issue-tracker.git
```

  - Or with SSH:

```bash
git remote add origin git@github.com:<your-username>/uniissue-internal-issue-tracker.git
```

- If `origin` already exists and points somewhere else, update it:

```bash
git remote set-url origin https://github.com/<your-username>/uniissue-internal-issue-tracker.git
```

## Step 3 – Make Sure the Demo Video Is Tracked

1. Confirm the video is **not ignored**:
   - Root `.gitignore` does **not** exist, and frontend/backend `.gitignore` files only apply in their subfolders, so `Demo_video.mp4` will be tracked.
2. Explicitly stage the video (to be safe):

```bash
git add "Demo_video.mp4"
```

3. Be aware that this file is large; pushing it is fine for this project demo, but for future projects consider Git LFS if videos become very big or frequent.

## Step 4 – Stage All Project Files

From the project root:

```bash
git add .
```

- This stages:
  - `Backend/`, `Frontend/`, `Test/`, `Plan_Md/`, batch files, and the demo video.

If you want to follow the planned commit structure in `Plan_Md/git_commit.md`, you can stage and commit in smaller chunks (backend, frontend, tests, docs). For a one‑time upload, a single commit is acceptable.

## Step 5 – Commit with a Clear Message

- For a **first push**, a good commit message that matches your plan file is:

```bash
git commit -m "chore: initial import of UniIssue full-stack issue tracker"
```

- Or, if you already have earlier local commits, just commit whatever is currently staged using a message that fits the changes.

## Step 6 – Push to GitHub

1. Check your current branch name:

```bash
git branch
```

2. If it is `main` (recommended), push:

```bash
git push -u origin main
```

3. If it is `master` or another name (e.g. `unico`), push with that branch name:

```bash
git push -u origin <your-branch-name>
```

4. After the first push, you can later use simply:

```bash
git push
```

## Step 7 – Verify GitHub Repo Contents

After pushing, open the repository page on GitHub and confirm:

- **Code structure**:
  - `Backend/`, `Frontend/`, `Test/`, `Plan_Md/` directories are present.
- **Docs**:
  - `Plan_Md/ARCHITECTURE.md`, `Plan_Md/problem.md`, `Plan_Md/PROMPTS.md`, `Plan_Md/git_commit.md`, and `Plan_Md/PLAN_github.md` are visible.
- **Demo video**:
  - `Demo_video.mp4` appears in the root of the repo.
- **GitHub default branch** matches the branch you pushed (`main` or equivalent).

## Step 8 – Optional Polish on GitHub

- **Add a README** directly in GitHub or from your local repo describing:
  - Stack (React + TypeScript + Vite, FastAPI, PostgreSQL)
  - Core features (issue creation, filters, comments, status counts)
  - How to run:
    - `backend.bat` and `frontend.bat` scripts
  - Link to or mention the demo video file.
- **Add a license** (MIT is a good default for open source).
- **Set topics** on the repo (see Repo Metadata section) to make it more discoverable.

## README.md (Copy/Paste Template)

Create a new file at the repo root named `README.md` with the content below. (This README includes the **problem**, the **solution**, the **tech stack**, and a clear **architecture summary**. For the full deep-dive architecture doc, it also links to `Plan_Md/ARCHITECTURE.md`.)

```md
# UniIssue — Internal Issue Tracker

UniIssue is a full‑stack internal issue tracker built for a small consulting firm. It provides a dark, professional dashboard to create, view, filter, and update issues across multiple projects, with comments and status tracking.

## Demo video

- `Demo_video.mp4` (included in this repo)

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
..\backend.bat
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
..\frontend.bat
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
Demo_video.mp4  # demo video
```

## Notes

- If you commit additional videos/assets in the future and the repo becomes too large, consider Git LFS.
```

Following this plan will push your entire UniIssue project, including the demo video, to a clean GitHub repository that matches the architecture and planning files already in `Plan_Md/`.

