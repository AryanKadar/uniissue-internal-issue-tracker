"""
Test/test_comments.py — Integration tests for the Comments API.

Run with:  pytest Test/ -v  (from project root, venv active)
"""

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
import sys, os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "Backend"))

from main import app

VALID_ISSUE = {
    "title":       "Issue for comment tests",
    "description": "Parent issue created during comment test suite.",
    "project":     "Client Beta",
    "priority":    "Medium",
    "assignee":    "Bob Smith",
    "status":      "Open",
}


@pytest_asyncio.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac


@pytest_asyncio.fixture
async def issue_id(client):
    """Create a fresh issue for each test and return its UUID."""
    res = await client.post("/api/issues", json=VALID_ISSUE)
    assert res.status_code == 201
    return res.json()["id"]


# ─── List Comments ────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_list_comments_empty(client, issue_id):
    """GET /api/issues/{id}/comments should return empty list for a new issue."""
    res = await client.get(f"/api/issues/{issue_id}/comments")
    assert res.status_code == 200
    assert res.json() == []


@pytest.mark.asyncio
async def test_list_comments_not_found(client):
    """GET comments for a non-existent issue should return 404."""
    res = await client.get("/api/issues/00000000-0000-0000-0000-000000000000/comments")
    assert res.status_code == 404


# ─── Add Comment ──────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_add_comment(client, issue_id):
    """POST /api/issues/{id}/comments should create and return the comment."""
    payload = {"author": "Alice Johnson", "text": "This is a test comment."}
    res = await client.post(f"/api/issues/{issue_id}/comments", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert data["author"]   == "Alice Johnson"
    assert data["text"]     == "This is a test comment."
    assert data["issue_id"] == issue_id
    assert "id"         in data
    assert "created_at" in data


@pytest.mark.asyncio
async def test_add_comment_not_found(client):
    """POST comment to non-existent issue should return 404."""
    res = await client.post(
        "/api/issues/00000000-0000-0000-0000-000000000000/comments",
        json={"author": "Bob", "text": "Hello"},
    )
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_add_comment_missing_fields(client, issue_id):
    """POST comment with missing fields should return 422."""
    res = await client.post(f"/api/issues/{issue_id}/comments", json={"author": "Bob"})
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_add_comment_empty_text(client, issue_id):
    """POST comment with empty text should return 422."""
    res = await client.post(
        f"/api/issues/{issue_id}/comments",
        json={"author": "Bob", "text": ""},
    )
    assert res.status_code == 422


# ─── Comment appears in parent issue ─────────────────────────────────────────

@pytest.mark.asyncio
async def test_comment_appears_in_issue(client, issue_id):
    """After adding a comment, it should appear in GET /api/issues/{id}.comments."""
    await client.post(
        f"/api/issues/{issue_id}/comments",
        json={"author": "Carol Williams", "text": "Confirmed bug on prod."},
    )
    res = await client.get(f"/api/issues/{issue_id}")
    assert res.status_code == 200
    comments = res.json()["comments"]
    assert len(comments) == 1
    assert comments[0]["text"] == "Confirmed bug on prod."


@pytest.mark.asyncio
async def test_multiple_comments_ordered(client, issue_id):
    """Multiple comments should be returned in chronological order."""
    for text in ["First", "Second", "Third"]:
        await client.post(
            f"/api/issues/{issue_id}/comments",
            json={"author": "David Brown", "text": text},
        )
    res = await client.get(f"/api/issues/{issue_id}/comments")
    texts = [c["text"] for c in res.json()]
    assert texts == ["First", "Second", "Third"]


# ─── Delete Comment ───────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_delete_comment(client, issue_id):
    """DELETE /api/issues/{id}/comments/{comment_id} should return 204."""
    add_res = await client.post(
        f"/api/issues/{issue_id}/comments",
        json={"author": "Emma Davis", "text": "Will be deleted."},
    )
    comment_id = add_res.json()["id"]

    del_res = await client.delete(f"/api/issues/{issue_id}/comments/{comment_id}")
    assert del_res.status_code == 204

    # Verify gone
    list_res = await client.get(f"/api/issues/{issue_id}/comments")
    assert list_res.json() == []


@pytest.mark.asyncio
async def test_delete_comment_cascade_with_issue(client, issue_id):
    """Deleting parent issue should cascade-delete comments (no orphan rows)."""
    await client.post(
        f"/api/issues/{issue_id}/comments",
        json={"author": "Alice Johnson", "text": "Should be deleted with issue."},
    )
    # Delete the parent issue
    await client.delete(f"/api/issues/{issue_id}")

    # Comment list on deleted issue should 404, not 200 with orphaned data
    res = await client.get(f"/api/issues/{issue_id}/comments")
    assert res.status_code == 404
