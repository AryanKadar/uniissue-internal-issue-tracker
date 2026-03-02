"""
crud.py — All async database operations (Create, Read, Update, Delete).
Routers call these functions; no HTTP logic lives here.
"""

from __future__ import annotations
import uuid
from typing import Optional
from sqlalchemy import select, func, delete
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from models import Issue, Comment
from schemas import IssueCreate, IssueUpdate, CommentCreate


# ═══════════════════════════════════════════════════════════════════════════════
#  ISSUES
# ═══════════════════════════════════════════════════════════════════════════════

async def get_issues(
    db: AsyncSession,
    project:  Optional[str] = None,
    priority: Optional[str] = None,
    status:   Optional[str] = None,
    assignee: Optional[str] = None,
    search:   Optional[str] = None,
) -> list[Issue]:
    """Return all issues, optionally filtered. Includes comment count."""
    stmt = select(Issue).options(selectinload(Issue.comments))

    if project:  stmt = stmt.where(Issue.project  == project)
    if priority: stmt = stmt.where(Issue.priority == priority)
    if status:   stmt = stmt.where(Issue.status   == status)
    if assignee: stmt = stmt.where(Issue.assignee == assignee)
    if search:
        pattern = f"%{search.lower()}%"
        stmt = stmt.where(
            (func.lower(Issue.title)       .like(pattern)) |
            (func.lower(Issue.description) .like(pattern))
        )

    stmt = stmt.order_by(Issue.created_at.desc())
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_issue(db: AsyncSession, issue_id: uuid.UUID) -> Optional[Issue]:
    """Return a single issue with all comments loaded."""
    stmt = (
        select(Issue)
        .where(Issue.id == issue_id)
        .options(selectinload(Issue.comments))
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def create_issue(db: AsyncSession, data: IssueCreate) -> Issue:
    """Insert a new issue into the database."""
    issue = Issue(
        title       = data.title,
        description = data.description,
        project     = data.project.value,
        priority    = data.priority.value,
        assignee    = data.assignee,
        status      = data.status.value,
    )
    db.add(issue)
    await db.commit()
    await db.refresh(issue)
    # Load comments relationship (empty on creation)
    if not hasattr(issue, "_comments_loaded"):
        stmt = select(Issue).where(Issue.id == issue.id).options(selectinload(Issue.comments))
        result = await db.execute(stmt)
        issue = result.scalar_one()
    return issue


async def update_issue(
    db: AsyncSession, issue_id: uuid.UUID, data: IssueUpdate
) -> Optional[Issue]:
    """Partially update an issue (PATCH semantics)."""
    issue = await get_issue(db, issue_id)
    if not issue:
        return None

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        # Enum values need .value extraction
        setattr(issue, field, value.value if hasattr(value, "value") else value)

    await db.commit()
    await db.refresh(issue)
    # Reload with comments
    stmt = select(Issue).where(Issue.id == issue.id).options(selectinload(Issue.comments))
    result = await db.execute(stmt)
    return result.scalar_one()


async def delete_issue(db: AsyncSession, issue_id: uuid.UUID) -> bool:
    """Delete issue and cascade-delete all its comments."""
    issue = await get_issue(db, issue_id)
    if not issue:
        return False
    await db.delete(issue)
    await db.commit()
    return True


# ═══════════════════════════════════════════════════════════════════════════════
#  COMMENTS
# ═══════════════════════════════════════════════════════════════════════════════

async def get_comments(db: AsyncSession, issue_id: uuid.UUID) -> list[Comment]:
    """Return all comments for a given issue, oldest first."""
    stmt = (
        select(Comment)
        .where(Comment.issue_id == issue_id)
        .order_by(Comment.created_at)
    )
    result = await db.execute(stmt)
    return result.scalars().all()


async def add_comment(
    db: AsyncSession, issue_id: uuid.UUID, data: CommentCreate
) -> Comment:
    """Add a new comment to an issue."""
    comment = Comment(
        issue_id = issue_id,
        author   = data.author,
        text     = data.text,
    )
    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return comment


async def delete_comment(
    db: AsyncSession, issue_id: uuid.UUID, comment_id: uuid.UUID
) -> bool:
    """Delete a specific comment."""
    stmt = (
        select(Comment)
        .where(Comment.issue_id == issue_id, Comment.id == comment_id)
    )
    result = await db.execute(stmt)
    comment = result.scalar_one_or_none()
    if not comment:
        return False
    await db.delete(comment)
    await db.commit()
    return True


# ═══════════════════════════════════════════════════════════════════════════════
#  SEED HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

async def clear_all(db: AsyncSession) -> None:
    """Delete all comments then all issues (for re-seeding)."""
    await db.execute(delete(Comment))
    await db.execute(delete(Issue))
    await db.commit()
