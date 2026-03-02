The Problem
A small consulting firm needs an internal Issue Tracker for their team.
They’ve described what they want in a client brief below. You are the
developer. Build it from scratch in 3 hours.
CLIENT BRIEF
“Hey, we need a simple tool where our team can log issues they find in our
projects — bugs, feature requests, improvements. I want to see all issues in
one dashboard, filter by project and priority, and be able to assign them to
team members. Nothing fancy. We just need it to work, be clean, and not
break. Our team is about 15 people across 4 projects.”
— Client (Verbal brief over a call, no formal spec)

What You Must Build
Core features (required):
1. Issue creation form — Title, description, project (dropdown: 4 projects), priority (Low /
Medium / High / Critical), assignee (dropdown: 5 team members), status (Open / In Progress /
Resolved / Closed). All fields validated.
2. Dashboard — Shows all issues. Filter by project, priority, status, and assignee. Search by
title/description. Show counts per status.

3. Issue detail view — Click an issue to see full details. Allow status changes and adding comments
(text only, with timestamp).
4. REST API — Clean endpoints. Server-side validation (never trust the client). Proper HTTP
status codes. Must work via curl/Postman independent of the frontend.
5. Database — Any SQL or NoSQL. Clean schema with proper relationships. Seed with 12–15
realistic sample issues across all 4 projects.

Bonus (not required, earns extra credit):
● Real-time updates when a new issue is created
● Export issues as CSV
● Simple chart: issues by project or by priority
● Dark mode toggle
● Drag-and-drop Kanban board view