"""
routers/issues.py — Issue CRUD endpoints + CSV export + seed.
All routes prefixed with /api.
"""

import csv
import io
import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
import crud
from schemas import IssueCreate, IssueUpdate, IssueOut, MessageResponse
from seed import SEED_DATA

router = APIRouter(prefix="/api", tags=["issues"])


# ─── List Issues ──────────────────────────────────────────────────────────────
@router.get("/issues", response_model=list[IssueOut], summary="Get all issues")
async def list_issues(
    project:  Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    status:   Optional[str] = Query(None),
    assignee: Optional[str] = Query(None),
    search:   Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Return all issues, with optional filter/search query params."""
    return await crud.get_issues(
        db, project=project, priority=priority,
        status=status, assignee=assignee, search=search,
    )


# ─── Get Single Issue ─────────────────────────────────────────────────────────
@router.get("/issues/{issue_id}", response_model=IssueOut, summary="Get issue by ID")
async def get_issue(issue_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Return a single issue with all its comments."""
    issue = await crud.get_issue(db, issue_id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue


# ─── Create Issue ─────────────────────────────────────────────────────────────
@router.post("/issues", response_model=IssueOut, status_code=status.HTTP_201_CREATED, summary="Create a new issue")
async def create_issue(data: IssueCreate, db: AsyncSession = Depends(get_db)):
    """Create a new issue. All fields validated server-side."""
    return await crud.create_issue(db, data)


# ─── Update Issue (PATCH) ─────────────────────────────────────────────────────
@router.patch("/issues/{issue_id}", response_model=IssueOut, summary="Partially update an issue")
async def update_issue(issue_id: uuid.UUID, data: IssueUpdate, db: AsyncSession = Depends(get_db)):
    """Partial update — only send the fields you want to change (e.g. just status)."""
    issue = await crud.update_issue(db, issue_id, data)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue


# ─── Delete Issue ─────────────────────────────────────────────────────────────
@router.delete("/issues/{issue_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an issue")
async def delete_issue(issue_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Delete issue and cascade-delete all its comments."""
    deleted = await crud.delete_issue(db, issue_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Issue not found")


# ─── Export CSV ───────────────────────────────────────────────────────────────
@router.get("/export-csv", summary="Export all issues as CSV download")
async def export_csv(db: AsyncSession = Depends(get_db)):
    """Download all issues as a CSV file — bonus feature."""
    issues = await crud.get_issues(db)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Title", "Description", "Project", "Priority", "Assignee", "Status", "Created At", "Comment Count"])
    for issue in issues:
        writer.writerow([
            str(issue.id), issue.title, issue.description, issue.project,
            issue.priority, issue.assignee, issue.status,
            issue.created_at.isoformat(), len(issue.comments),
        ])
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=issues_export.csv"},
    )


# ─── Seed Database ────────────────────────────────────────────────────────────
@router.post("/seed", response_model=MessageResponse, status_code=status.HTTP_201_CREATED, summary="Seed DB with 15 issues")
async def seed_database(db: AsyncSession = Depends(get_db)):
    """Wipe issues+comments tables and insert 15 realistic sample issues with comments."""
    from models import Issue, Comment
    await crud.clear_all(db)
    for issue_data in SEED_DATA:
        comments_raw = issue_data.pop("comments", [])
        issue = Issue(**issue_data)
        db.add(issue)
        await db.flush()
        for c in comments_raw:
            db.add(Comment(issue_id=issue.id, **c))
    await db.commit()
    return {"message": f"Seeded {len(SEED_DATA)} issues successfully"}
