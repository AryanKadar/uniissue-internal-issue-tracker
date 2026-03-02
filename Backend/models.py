"""
models.py — SQLAlchemy ORM models matching the Alembic migration schema.
"""

import uuid
from datetime import datetime, timezone
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, relationship


class Base(DeclarativeBase):
    """Shared base for all ORM models."""
    pass


class Issue(Base):
    __tablename__ = "issues"

    id          = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=sa.text("gen_random_uuid()"))
    title       = sa.Column(sa.Text, nullable=False)
    description = sa.Column(sa.Text, nullable=False)
    project     = sa.Column(sa.String(100), nullable=False)
    priority    = sa.Column(sa.String(20), nullable=False)
    assignee    = sa.Column(sa.String(100), nullable=False)
    status      = sa.Column(sa.String(20), nullable=False, server_default="Open")
    created_at  = sa.Column(sa.TIMESTAMP(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), server_default=sa.text("now()"))
    updated_at  = sa.Column(sa.TIMESTAMP(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), server_default=sa.text("now()"), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship
    comments = relationship("Comment", back_populates="issue", cascade="all, delete-orphan", lazy="selectin")


class Comment(Base):
    __tablename__ = "comments"

    id         = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=sa.text("gen_random_uuid()"))
    issue_id   = sa.Column(UUID(as_uuid=True), sa.ForeignKey("issues.id", ondelete="CASCADE"), nullable=False)
    author     = sa.Column(sa.String(100), nullable=False)
    text       = sa.Column(sa.Text, nullable=False)
    created_at = sa.Column(sa.TIMESTAMP(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), server_default=sa.text("now()"))

    # Relationship
    issue = relationship("Issue", back_populates="comments")
