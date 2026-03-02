"""
Test/test_issues.py — Integration tests for the Issues API.
Uses httpx AsyncClient + pytest-asyncio against a live test session.

Run with:  pytest Test/ -v  (from project root, venv active)
"""

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
import sys, os

# Make Backend/ importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "Backend"))

from main import app


@pytest_asyncio.fixture
async def client():
    """Async test client that talks to the FastAPI app."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac


# ─── Health ───────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_health(client):
    """GET /health should return 200 and {"status": "ok"}"""
    res = await client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


# ─── CRUD ─────────────────────────────────────────────────────────────────────

VALID_ISSUE = {
    "title":       "Test issue from pytest",
    "description": "This was created by the automated test suite.",
    "project":     "Project Alpha",
    "priority":    "High",
    "assignee":    "Alice Johnson",
    "status":      "Open",
}


@pytest.mark.asyncio
async def test_create_issue(client):
    """POST /api/issues should return 201 with the created issue."""
    res = await client.post("/api/issues", json=VALID_ISSUE)
    assert res.status_code == 201
    data = res.json()
    assert data["title"]    == VALID_ISSUE["title"]
    assert data["project"]  == VALID_ISSUE["project"]
    assert data["priority"] == VALID_ISSUE["priority"]
    assert data["status"]   == "Open"
    assert "id"         in data
    assert "created_at" in data
    assert "comments"   in data
    assert isinstance(data["comments"], list)


@pytest.mark.asyncio
async def test_list_issues(client):
    """GET /api/issues should return a list."""
    res = await client.get("/api/issues")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.asyncio
async def test_get_issue_not_found(client):
    """GET /api/issues/{bad-uuid} should return 404."""
    res = await client.get("/api/issues/00000000-0000-0000-0000-000000000000")
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_create_and_get_issue(client):
    """Create an issue then fetch it by ID."""
    create_res = await client.post("/api/issues", json=VALID_ISSUE)
    assert create_res.status_code == 201
    issue_id = create_res.json()["id"]

    get_res = await client.get(f"/api/issues/{issue_id}")
    assert get_res.status_code == 200
    assert get_res.json()["id"] == issue_id


@pytest.mark.asyncio
async def test_update_issue_status(client):
    """PATCH /api/issues/{id} should update status."""
    create_res = await client.post("/api/issues", json=VALID_ISSUE)
    issue_id = create_res.json()["id"]

    patch_res = await client.patch(f"/api/issues/{issue_id}", json={"status": "In Progress"})
    assert patch_res.status_code == 200
    assert patch_res.json()["status"] == "In Progress"


@pytest.mark.asyncio
async def test_delete_issue(client):
    """DELETE /api/issues/{id} should return 204 and make the issue unfetchable."""
    create_res = await client.post("/api/issues", json=VALID_ISSUE)
    issue_id = create_res.json()["id"]

    del_res = await client.delete(f"/api/issues/{issue_id}")
    assert del_res.status_code == 204

    get_res = await client.get(f"/api/issues/{issue_id}")
    assert get_res.status_code == 404


# ─── Validation ───────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_create_issue_missing_fields(client):
    """POST /api/issues with missing fields should return 422."""
    res = await client.post("/api/issues", json={"title": "Incomplete"})
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_create_issue_invalid_priority(client):
    """POST /api/issues with an invalid priority should return 422."""
    bad = {**VALID_ISSUE, "priority": "Extreme"}
    res = await client.post("/api/issues", json=bad)
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_create_issue_invalid_project(client):
    """POST /api/issues with an invalid project should return 422."""
    bad = {**VALID_ISSUE, "project": "Non-existent Project"}
    res = await client.post("/api/issues", json=bad)
    assert res.status_code == 422


# ─── Filters ──────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_filter_by_project(client):
    """GET /api/issues?project=... should return only matching issues."""
    res = await client.get("/api/issues?project=Project Alpha")
    assert res.status_code == 200
    for issue in res.json():
        assert issue["project"] == "Project Alpha"


@pytest.mark.asyncio
async def test_filter_by_priority(client):
    """GET /api/issues?priority=Critical should return only Critical issues."""
    res = await client.get("/api/issues?priority=Critical")
    assert res.status_code == 200
    for issue in res.json():
        assert issue["priority"] == "Critical"


@pytest.mark.asyncio
async def test_search_issues(client):
    """GET /api/issues?search=login should return issues matching title/description."""
    res = await client.get("/api/issues?search=login")
    assert res.status_code == 200
    # Just check the request succeeds — content depends on seeded data
