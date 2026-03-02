"""
seed.py — Realistic seed data matching the existing frontend SEED_ISSUES.
15 issues across 4 projects, 2–4 comments each.
Called by POST /api/seed  OR  run directly: python seed.py
"""

import asyncio
from datetime import datetime, timezone, timedelta

def d(days_ago: int) -> datetime:
    """Return a UTC datetime N days in the past."""
    return datetime.now(timezone.utc) - timedelta(days=days_ago)


# ─── Seed Payload ─────────────────────────────────────────────────────────────
# Each dict maps directly to Issue columns (+ a "comments" list for Comment rows).

SEED_DATA = [
    {
        "title":       "Login page crashes on invalid email",
        "description": "When entering an email without '@', the login form throws an unhandled exception and the page becomes unresponsive.",
        "project":     "Project Alpha",
        "priority":    "Critical",
        "assignee":    "Alice Johnson",
        "status":      "Open",
        "created_at":  d(12),
        "comments": [
            {"author": "Bob Smith",    "text": "I can reproduce this on Chrome and Firefox.", "created_at": d(11)},
            {"author": "Alice Johnson","text": "Looking into the validation logic now.",        "created_at": d(10)},
        ],
    },
    {
        "title":       "Add dark mode support",
        "description": "Users have requested a dark theme option. Need to implement theme switching across all pages.",
        "project":     "Client Beta",
        "priority":    "Medium",
        "assignee":    "Carol Williams",
        "status":      "In Progress",
        "created_at":  d(15),
        "comments": [
            {"author": "Carol Williams","text": "Started with the color token system.",                               "created_at": d(14)},
            {"author": "Emma Davis",    "text": "Make sure to test contrast ratios for accessibility.",                "created_at": d(13)},
            {"author": "Carol Williams","text": "Good call, will run lighthouse checks.",                              "created_at": d(12)},
        ],
    },
    {
        "title":       "Optimize image loading on dashboard",
        "description": "Dashboard loads 40+ unoptimized images causing 8s+ load time. Need lazy loading and WebP conversion.",
        "project":     "Project Alpha",
        "priority":    "High",
        "assignee":    "David Brown",
        "status":      "Open",
        "created_at":  d(8),
        "comments": [
            {"author": "David Brown",  "text": "Profiled the page — images account for 85% of load time.","created_at": d(7)},
            {"author": "Alice Johnson","text": "Can we use a CDN with auto-format?",                       "created_at": d(6)},
        ],
    },
    {
        "title":       "Fix mobile nav overlap",
        "description": "On screens below 768px, the navigation menu overlaps with the main content area.",
        "project":     "Mobile Delta",
        "priority":    "High",
        "assignee":    "Emma Davis",
        "status":      "Resolved",
        "created_at":  d(20),
        "comments": [
            {"author": "Emma Davis","text": "Fixed with proper z-index and position:fixed.", "created_at": d(18)},
            {"author": "Bob Smith", "text": "Verified on iPhone 14 and Pixel 7.",            "created_at": d(17)},
            {"author": "Emma Davis","text": "Also added a backdrop blur effect.",             "created_at": d(16)},
        ],
    },
    {
        "title":       "Database migration script fails",
        "description": "The v2.3 migration script throws a foreign key constraint error on the comments table.",
        "project":     "Internal Gamma",
        "priority":    "Critical",
        "assignee":    "Bob Smith",
        "status":      "In Progress",
        "created_at":  d(3),
        "comments": [
            {"author": "Bob Smith",    "text": "Found the issue — orphaned records in comments table.",  "created_at": d(2)},
            {"author": "David Brown",  "text": "Should we add a cleanup step before migration?",         "created_at": d(1)},
        ],
    },
    {
        "title":       "Add CSV export for reports",
        "description": "Management needs the ability to export filtered issue reports as CSV files.",
        "project":     "Client Beta",
        "priority":    "Low",
        "assignee":    "Alice Johnson",
        "status":      "Open",
        "created_at":  d(10),
        "comments": [
            {"author": "Alice Johnson", "text": "Will use papaparse for CSV generation.",                   "created_at": d(9)},
            {"author": "Carol Williams","text": "Make sure to handle special characters in descriptions.",   "created_at": d(8)},
        ],
    },
    {
        "title":       "Implement push notifications",
        "description": "Set up Firebase Cloud Messaging for real-time push notifications on issue updates.",
        "project":     "Mobile Delta",
        "priority":    "Medium",
        "assignee":    "David Brown",
        "status":      "Open",
        "created_at":  d(6),
        "comments": [
            {"author": "David Brown","text": "FCM setup complete, working on the service worker.",           "created_at": d(5)},
            {"author": "Emma Davis", "text": "Don't forget to handle notification permissions gracefully.",   "created_at": d(4)},
            {"author": "David Brown","text": "Added a custom permission prompt UI.",                          "created_at": d(3)},
        ],
    },
    {
        "title":       "Refactor authentication module",
        "description": "Current auth module is monolithic. Break it into separate concerns: session, tokens, permissions.",
        "project":     "Internal Gamma",
        "priority":    "Medium",
        "assignee":    "Carol Williams",
        "status":      "Closed",
        "created_at":  d(30),
        "comments": [
            {"author": "Carol Williams","text": "Completed the refactor. PR is up for review.", "created_at": d(25)},
            {"author": "Bob Smith",     "text": "LGTM, merged.",                                "created_at": d(24)},
        ],
    },
    {
        "title":       "Fix timezone bug in scheduling",
        "description": "Events created in PST show wrong time for EST users. Need to normalize all times to UTC.",
        "project":     "Project Alpha",
        "priority":    "High",
        "assignee":    "Bob Smith",
        "status":      "Resolved",
        "created_at":  d(14),
        "comments": [
            {"author": "Bob Smith",    "text": "Switched all storage to UTC, converting on display.",   "created_at": d(12)},
            {"author": "Alice Johnson","text": "Tested across 4 timezones, looks correct now.",          "created_at": d(11)},
        ],
    },
    {
        "title":       "Add search autocomplete",
        "description": "Implement typeahead suggestions in the global search bar using existing issue data.",
        "project":     "Client Beta",
        "priority":    "Low",
        "assignee":    "Emma Davis",
        "status":      "Open",
        "created_at":  d(5),
        "comments": [
            {"author": "Emma Davis",    "text": "Using a debounced search with fuzzy matching.",              "created_at": d(4)},
            {"author": "Carol Williams","text": "Consider adding keyboard navigation for the suggestions.",    "created_at": d(3)},
        ],
    },
    {
        "title":       "Performance audit Q1",
        "description": "Run comprehensive performance audit on all client-facing pages. Document findings and recommendations.",
        "project":     "Internal Gamma",
        "priority":    "Low",
        "assignee":    "David Brown",
        "status":      "In Progress",
        "created_at":  d(7),
        "comments": [
            {"author": "David Brown",  "text": "Lighthouse scores collected for all 12 pages.",       "created_at": d(6)},
            {"author": "Alice Johnson","text": "Share the report in the team channel when ready.",     "created_at": d(5)},
            {"author": "David Brown",  "text": "Will have the full report by EOD Friday.",            "created_at": d(4)},
        ],
    },
    {
        "title":       "Update onboarding flow",
        "description": "Redesign the new user onboarding to reduce drop-off. Current completion rate is only 34%.",
        "project":     "Mobile Delta",
        "priority":    "High",
        "assignee":    "Alice Johnson",
        "status":      "Open",
        "created_at":  d(4),
        "comments": [
            {"author": "Alice Johnson","text": "Wireframes ready for review.",            "created_at": d(3)},
            {"author": "Emma Davis",   "text": "Love the progressive disclosure approach.","created_at": d(2)},
        ],
    },
    {
        "title":       "API rate limiting implementation",
        "description": "Add rate limiting to all public API endpoints to prevent abuse. Target: 100 req/min per API key.",
        "project":     "Internal Gamma",
        "priority":    "Medium",
        "assignee":    "Bob Smith",
        "status":      "Resolved",
        "created_at":  d(18),
        "comments": [
            {"author": "Bob Smith",   "text": "Using token bucket algorithm with Redis.",         "created_at": d(16)},
            {"author": "David Brown", "text": "Load tested at 500 req/min, rate limiter holds.",   "created_at": d(15)},
        ],
    },
    {
        "title":       "Fix broken image uploads",
        "description": "Image uploads over 5MB silently fail. Need proper validation and error messaging.",
        "project":     "Client Beta",
        "priority":    "High",
        "assignee":    "Carol Williams",
        "status":      "In Progress",
        "created_at":  d(2),
        "comments": [
            {"author": "Carol Williams","text": "Added client-side size validation with clear error.", "created_at": d(1)},
            {"author": "Bob Smith",     "text": "Also need to update the server-side limit.",          "created_at": d(0)},
        ],
    },
    {
        "title":       "Accessibility compliance review",
        "description": "Ensure WCAG 2.1 AA compliance across all forms and interactive elements.",
        "project":     "Project Alpha",
        "priority":    "Medium",
        "assignee":    "Emma Davis",
        "status":      "Closed",
        "created_at":  d(25),
        "comments": [
            {"author": "Emma Davis",   "text": "All forms now have proper aria labels and roles.",  "created_at": d(22)},
            {"author": "Alice Johnson","text": "Ran axe-core, zero violations. Great work!",         "created_at": d(21)},
        ],
    },
]


# ─── Standalone runner ────────────────────────────────────────────────────────
# Run with: python seed.py  (from Backend/ with venv active)

async def main():
    from database import AsyncSessionLocal
    from models import Issue, Comment
    import crud

    async with AsyncSessionLocal() as db:
        print("Clearing existing data...")
        await crud.clear_all(db)

        print(f"Inserting {len(SEED_DATA)} issues...")
        for issue_data in SEED_DATA:
            comments_raw = issue_data.pop("comments", [])
            issue = Issue(**issue_data)
            db.add(issue)
            await db.flush()
            for c in comments_raw:
                comment = Comment(issue_id=issue.id, **c)
                db.add(comment)

        await db.commit()
        print("✅ Seed complete!")


if __name__ == "__main__":
    asyncio.run(main())
