"""
test_full_stack_connectivity.py — Sanity check for DB ↔ backend ↔ frontend.

This test verifies:
- PostgreSQL is reachable and the `issues` table has a consistent row count.
- The FastAPI backend running on http://localhost:8000 is reachable and
  returns the same issue count as the direct DB query (proves real DB, no mocks).
- The React/Vite frontend running on http://localhost:5173 is reachable.

Run from the project root (with backend and frontend already running):

    pytest Test/test_full_stack_connectivity.py -v
"""

import os
import sys

import pytest
from httpx import AsyncClient
from sqlalchemy import text

# Make Backend/ importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "Backend"))

from database import engine  # type: ignore  # imported via adjusted sys.path


API_BASE = os.getenv("API_BASE", "http://localhost:8000")
FRONTEND_BASE = os.getenv("FRONTEND_BASE", "http://localhost:5173")


@pytest.mark.asyncio
async def test_database_to_backend_and_frontend_chain():
    # ─── 1) Direct DB query ────────────────────────────────────────────────────
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT count(*) FROM issues"))
        db_issue_count = result.scalar_one()

    assert db_issue_count >= 0

    # ─── 2) Backend over HTTP (not ASGITransport) ──────────────────────────────
    async with AsyncClient(base_url=API_BASE) as client:
        # Health check
        health_res = await client.get("/health")
        assert health_res.status_code == 200
        assert health_res.json().get("status") == "ok"

        # Issues list
        issues_res = await client.get("/api/issues")
        assert issues_res.status_code == 200
        issues = issues_res.json()
        assert isinstance(issues, list)

    # The backend count should match the direct DB count — proves the backend
    # is reading from the real database, not hard-coded mock data.
    assert len(issues) == db_issue_count

    # ─── 3) Frontend is up and serving the app ─────────────────────────────────
    async with AsyncClient(base_url=FRONTEND_BASE, follow_redirects=True) as client:
        front_res = await client.get("/")

    assert 200 <= front_res.status_code < 400
    # We just sanity-check that some expected text from the SPA is present.
    body = front_res.text.lower()
    assert ("lovable app" in body) or ("issue" in body) or ("dashboard" in body)

