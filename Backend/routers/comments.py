"""
routers/comments.py — Comments CRUD scoped to a parent issue.
All routes prefixed with /api/issues/{issue_id}/comments.
"""

import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
import crud
from schemas import CommentCreate, CommentOut

router = APIRouter(
    prefix="/api/issues/{issue_id}/comments",
    tags=["comments"],
)

NOT_FOUND_ISSUE   = "Issue not found"
NOT_FOUND_COMMENT = "Comment not found"


# ─── List Comments ────────────────────────────────────────────────────────────
@router.get("", response_model=list[CommentOut], summary="Get all comments for an issue")
async def list_comments(issue_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Return all comments for the given issue, ordered oldest-first."""
    if not await crud.get_issue(db, issue_id):
        raise HTTPException(status_code=404, detail=NOT_FOUND_ISSUE)
    return await crud.get_comments(db, issue_id)


# ─── Add Comment ──────────────────────────────────────────────────────────────
@router.post("", response_model=CommentOut, status_code=status.HTTP_201_CREATED, summary="Add a comment")
async def add_comment(issue_id: uuid.UUID, data: CommentCreate, db: AsyncSession = Depends(get_db)):
    """Add a text comment to an issue. Timestamp is set server-side."""
    if not await crud.get_issue(db, issue_id):
        raise HTTPException(status_code=404, detail=NOT_FOUND_ISSUE)
    return await crud.add_comment(db, issue_id, data)


# ─── Delete Comment ───────────────────────────────────────────────────────────
@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a comment")
async def delete_comment(issue_id: uuid.UUID, comment_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Delete a specific comment. Returns 204 on success."""
    if not await crud.delete_comment(db, issue_id, comment_id):
        raise HTTPException(status_code=404, detail=NOT_FOUND_COMMENT)
