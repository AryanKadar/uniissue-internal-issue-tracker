"""
schemas.py — Pydantic models for request/response validation.
"""

from __future__ import annotations
import uuid
from enum import Enum
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


# ─── Enums (match seed data / frontend values) ──────────────────────────────
class ProjectEnum(str, Enum):
    ALPHA   = "Project Alpha"
    BETA    = "Client Beta"
    GAMMA   = "Internal Gamma"
    DELTA   = "Mobile Delta"


class PriorityEnum(str, Enum):
    LOW      = "Low"
    MEDIUM   = "Medium"
    HIGH     = "High"
    CRITICAL = "Critical"


class StatusEnum(str, Enum):
    OPEN        = "Open"
    IN_PROGRESS = "In Progress"
    RESOLVED    = "Resolved"
    CLOSED      = "Closed"


# ─── Comment Schemas ─────────────────────────────────────────────────────────
class CommentCreate(BaseModel):
    author: str
    text: str


class CommentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    issue_id: uuid.UUID
    author: str
    text: str
    created_at: datetime


# ─── Issue Schemas ───────────────────────────────────────────────────────────
class IssueCreate(BaseModel):
    title: str
    description: str
    project: ProjectEnum
    priority: PriorityEnum
    assignee: str
    status: StatusEnum = StatusEnum.OPEN


class IssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    project: Optional[ProjectEnum] = None
    priority: Optional[PriorityEnum] = None
    assignee: Optional[str] = None
    status: Optional[StatusEnum] = None


class IssueOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    description: str
    project: str
    priority: str
    assignee: str
    status: str
    created_at: datetime
    updated_at: datetime
    comments: list[CommentOut] = []


# ─── Utility ─────────────────────────────────────────────────────────────────
class MessageResponse(BaseModel):
    message: str
