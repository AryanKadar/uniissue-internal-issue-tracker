"""
Initial migration — create issues and comments tables.

Revision ID: 0001
Revises: 
Create Date: 2026-03-02
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Enable pgcrypto for gen_random_uuid() (PostgreSQL 14+: pgcrypto not needed, use gen_random_uuid() natively)
    op.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    op.create_table(
        "issues",
        sa.Column("id",          postgresql.UUID(as_uuid=True), primary_key=True,  server_default=sa.text("gen_random_uuid()")),
        sa.Column("title",       sa.Text,        nullable=False),
        sa.Column("description", sa.Text,        nullable=False),
        sa.Column("project",     sa.String(100), nullable=False),
        sa.Column("priority",    sa.String(20),  nullable=False),
        sa.Column("assignee",    sa.String(100), nullable=False),
        sa.Column("status",      sa.String(20),  nullable=False, server_default="Open"),
        sa.Column("created_at",  sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at",  sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("now()")),
    )

    op.create_table(
        "comments",
        sa.Column("id",         postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("issue_id",   postgresql.UUID(as_uuid=True), sa.ForeignKey("issues.id", ondelete="CASCADE"), nullable=False),
        sa.Column("author",     sa.String(100), nullable=False),
        sa.Column("text",       sa.Text,        nullable=False),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text("now()")),
    )

    # Index for faster filter queries
    op.create_index("ix_issues_project",  "issues", ["project"])
    op.create_index("ix_issues_priority", "issues", ["priority"])
    op.create_index("ix_issues_status",   "issues", ["status"])
    op.create_index("ix_issues_assignee", "issues", ["assignee"])
    op.create_index("ix_comments_issue",  "comments", ["issue_id"])


def downgrade() -> None:
    op.drop_table("comments")
    op.drop_table("issues")
