## Architecture Overview

This project is an internal Issue Tracker for a small consulting firm. It lets the team create, view, filter, and update issues across multiple projects, with comments and status tracking, via a clean dark-theme web UI and a RESTful backend.

## Why This Stack?

- **Frontend: React 18 + TypeScript + Chakra UI**
  - **React + TypeScript**: Modern, component-based UI with strong typing for safer refactors and clearer contracts between components and API responses.
  - **Chakra UI**: Accessible, themeable component library that makes it fast to build a polished dark-mode interface consistent with the brief (dark black, professional design).
  - **Vite dev server (port 5173)**: Very fast local development, hot-module reload, and simple configuration for a single-page app.

- **Backend: FastAPI (Python)**
  - **FastAPI**: High-performance async framework with automatic OpenAPI docs, clear request/response models (Pydantic), and strong typing.
  - **Clean RESTful design**: Each resource (issues, comments) has predictable CRUD endpoints and appropriate HTTP status codes.

- **Database: SQL (via SQLAlchemy)**
  - **Relational schema** fits naturally with issues, comments, projects, and assignees.
  - **SQLAlchemy models** provide a clean abstraction over the underlying database engine and enforce relationships and constraints.
  - **Seed data** ensures the app is useful immediately and demonstrates realistic usage across four projects.

This stack balances development speed, reliability, and clarity while staying within the constraints of a 3‑hour build.

## Database Schema

> Exact field names may differ slightly between code and this document, but the logical schema matches the implementation.

### `issues` table

- **id** (PK, integer, auto-increment)
- **title** (string, required)
- **description** (text, required)
- **project** (string, required; one of the four predefined projects)
- **priority** (enum/string: `Low`, `Medium`, `High`, `Critical`)
- **assignee** (string, required; one of the configured team members)
- **status** (enum/string: `Open`, `In Progress`, `Resolved`, `Closed`)
- **created_at** (datetime, default now)
- **updated_at** (datetime, auto-updated)

### `comments` table

- **id** (PK, integer, auto-increment)
- **issue_id** (FK → `issues.id`, cascade on delete)
- **author** (string, required)
- **body** (text, required)
- **created_at** (datetime, default now)

### Relationships

- **One `issue` has many `comments`**.
- Issues reference projects and assignees via constrained string values rather than separate lookup tables to keep the initial build simple.

## REST API Endpoints

All endpoints are namespaced under the backend base URL (e.g. `http://localhost:8000`). The frontend calls these from the React app; they are also usable independently via curl/Postman.

### Health / Utility

- **GET `/health`**
  - Returns a simple status payload confirming the backend and database are reachable.

### Issues

- **GET `/issues`**
  - Returns a paginated list of issues.
  - Supports query parameters for filtering by `project`, `priority`, `status`, and `assignee`, and searching by title/description.

- **GET `/issues/{issue_id}`**
  - Returns full details for a single issue, including its comments.

- **POST `/issues`**
  - Creates a new issue.
  - Validates all required fields and value enums; on validation failure returns `400` with details.

- **PUT `/issues/{issue_id}`**
  - Updates an existing issue (title, description, project, priority, assignee, status).
  - Returns `404` if the issue does not exist.

- **PATCH `/issues/{issue_id}/status`**
  - Updates only the status of an issue (e.g. Open → In Progress → Resolved → Closed).

- **DELETE `/issues/{issue_id}`**
  - Deletes the issue and cascades delete to related comments.

### Comments

- **POST `/issues/{issue_id}/comments`**
  - Adds a new text comment to the specified issue.

- **GET `/issues/{issue_id}/comments`**
  - Returns all comments for the specified issue, ordered by `created_at`.

## Frontend Component Structure

High-level React component structure (names may differ slightly but responsibilities match):

- **`App`**
  - Root component, sets up Chakra UI theme provider, global layout, and routing if present.

- **Layout Components**
  - **`TopNavbar`**: Brand/title area, optional project-wide controls (e.g. dark mode toggle, global actions).
  - **`Sidebar` / Filters panel**: Hosts filters for project, priority, status, and assignee.
  - **`MainContent`**: Contains the dashboard and detail views.

- **Dashboard & List**
  - **`IssueDashboard`**: Coordinates filters, search, and list of issues. Fetches data from `/issues` based on the current filter state.
  - **`IssueFilters`**: Controlled inputs for project, priority, status, assignee, and text search.
  - **`IssueTable` / `IssueList`**: Displays issues in a table or card grid with columns for key fields and a badge for status/priority. Clicking a row opens the detail view.
  - **`StatusSummary`**: Shows counts of issues per status (Open/In Progress/Resolved/Closed).

- **Issue Detail & Editing**
  - **`IssueDetailDrawer` / `IssueDetailModal`**: Shows full issue information and associated comments when an issue is selected.
  - **`IssueFormModal`**: Reused for both creating a new issue and editing an existing one with validation for all fields.
  - **`StatusSelect`**: Component to change the status; calls the `PATCH /issues/{id}/status` endpoint.

- **Comments**
  - **`CommentList`**: Renders a list of comments with timestamps.
  - **`CommentForm`**: Textarea + submit button that posts to `/issues/{id}/comments`.

Styling is centralized through Chakra UI theme overrides to achieve a dark, high-contrast, professional appearance (dark backgrounds, subtle borders, clear typography, and consistent spacing).

## What I’d Improve With More Time

- **Authentication & Authorization**
  - Add login, per-user identities, and role-based access control (e.g. only certain users can close issues or change priority).

- **Stronger Data Modeling**
  - Promote `projects`, `users/assignees`, and `priorities` to first-class tables with foreign keys rather than strings, plus audit fields (created_by, updated_by).

- **Real-Time Updates**
  - Use WebSockets (FastAPI websockets or a pub/sub service) so new issues and comments appear instantly across all open dashboards without manual refresh.

- **Observability & Operations**
  - Add structured logging, request tracing, and metrics (e.g. via Prometheus + Grafana).
  - Implement rate limiting and better error handling for the public REST interface.

- **UX Enhancements**
  - Keyboard shortcuts (e.g. `N` for new issue), inline editing for status/assignee, and richer empty/loading states.
  - A Kanban board and simple charts (issues by project/priority) built into the main dashboard.

These improvements would move the project from a solid internal tool to a production-ready, scalable issue tracking system.
