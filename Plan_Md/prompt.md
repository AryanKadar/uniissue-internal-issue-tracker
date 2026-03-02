me to grok:
"give me detail prompt for lovable frontend to excute this project and here is the project file and make sure it is made in react charka ui with clean and professinal design with dark black color and dark theme and all the requirement in of clinet is full filled
scan this file maybe use internet and give me prompt for lovable"

grok reply Frontend for lovable:
"Create a complete, production-ready, single-page Issue Tracker web application called "UniIssue" for Unico Connect using:

• React 18 + TypeScript
• Chakra UI (latest version) with FULL dark theme
• lucide-react for icons
• Chakra toast, modals, drawer, table, forms, etc.
• No external backend — use React useState + useEffect only (local state, in-memory)

FORCE DARK THEME ONLY:
- Overall background: #0a0a0a
- Cards & panels: #121212
- Sidebar: #0f0f0f
- Accents: Indigo (#6366f1) and purple (#a855f7)
- Text: white and cool gray
- All components must use colorScheme="dark" and look premium, modern, clean, professional like Linear.app or Height.app

PROJECT REQUIREMENTS (must implement 100% of these):

HARDCODED DATA:
- 4 Projects: ["Project Alpha", "Client Beta", "Internal Gamma", "Mobile Delta"]
- 5 Team Members: ["Alice Johnson", "Bob Smith", "Carol Williams", "David Brown", "Emma Davis"]
- Priorities: Low (green), Medium (yellow), High (orange), Critical (red)
- Statuses: Open (blue), In Progress (purple), Resolved (teal), Closed (gray)

Seed exactly 15 realistic issues on first load with varied projects, priorities, statuses, and 2–4 comments each.

LAYOUT:
- Fixed left sidebar (250px) with logo "UniIssue", navigation (Dashboard, All Issues, My Assignments, Projects), bottom user avatar + name "Aryan Sharma"
- Top navbar with global search bar, "New Issue" prominent button (indigo), and notifications icon
- Main content area with proper padding

FEATURES (must be fully functional):

1. Dashboard (default view)
   - Top row: 4 large status count cards (Open, In Progress, Resolved, Closed) with big numbers, colored icons, and trend (fake +2 today)
   - Filter bar: Multi-select dropdowns for Project, Priority, Status, Assignee + Clear Filters button
   - Live search by title or description
   - Beautiful sortable Chakra Table with columns: ID, Title (clickable), Project, Priority (colored badge), Assignee (circular avatar + name), Status (colored badge), Created, Actions
   - Hover row effect, striped rows
   - "Export to CSV" button (functional — downloads all filtered issues)

2. New Issue Modal (triggered by navbar button)
   - Clean form with Chakra FormControl + validation (required fields show red error)
   - Fields: Title (input), Description (textarea), Project (select), Priority (radio group with colored labels), Assignee (select with avatars), Status (default Open)
   - Submit → adds to state instantly, shows success toast, closes modal

3. Issue Detail View (opens as large centered modal when clicking row or eye icon)
   - Top: Big title + editable Status dropdown + Save button
   - Full description
   - Metadata grid: Project, Priority, Assignee, Created date
   - Comments section:
     - List of existing comments (author avatar + name + relative time + text)
     - Add new comment box (textarea) + Post button
     - New comments appear instantly with "You" and current time

Additional Requirements:
- Fully responsive (mobile: sidebar becomes hamburger menu)
- Loading skeletons for table
- Empty state with illustration when no issues match filters
- All filters and search work live and together
- Beautiful hover states, transitions, focus rings
- Professional typography (Inter or system font)
- Clean, minimal, zero clutter design — dark black professional look

Start by creating the full app structure with ChakraProvider, theme config, and seed data. Then implement the layout and all features step-by-step so everything works perfectly out of the box.

Make it look expensive and ready for a real company demo."

me to grok:
"now what prompt should i give to antigravity for plan md for backend and database pgadmin i already have table name unico and make sure the backend is in python fast api with frontend in 5173 port and backend in 8000 port with virtual enviornment for backend and make sure the frontend is run from base folder with frontend.bat and backend is run from base folder with backend.bat"

grok reply for backend :

"You are an expert full-stack architect. Create a complete professional PLAN.md (and also generate all the code files) for the BACKEND ONLY of "UniIssue" – the internal Issue Tracker for Unico Connect.

TECH STACK (strictly follow):
- Python 3.11+
- FastAPI (latest) with Uvicorn
- SQLAlchemy 2.0 (async) + Alembic for migrations
- PostgreSQL (use the existing local database named "unico" that the user already has in PgAdmin)
- Pydantic v2 for models
- python-dotenv for environment variables
- CORS enabled for frontend running on http://localhost:5173
- Run backend on port 8000

PROJECT STRUCTURE (create exactly this):
uniissue/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── issue.py
│   │   │   └── comment.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── issue.py
│   │   │   └── comment.py
│   │   ├── crud/
│   │   │   ├── __init__.py
│   │   │   ├── issue.py
│   │   │   └── comment.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── issues.py
│   │   │   └── comments.py
│   │   ├── utils/
│   │   │   └── seed.py
│   │   └── alembic/ (Alembic config will be generated)
│   ├── .env.example
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/ (do NOT touch – user already has this from Lovable on port 5173)
├── backend.bat
├── frontend.bat
├── ARCHITECTURE.md   ← generate full professional version
├── PLAN.md           ← this is the main output I want first
└── README.md

DATABASE (use existing "unico" database in public schema):
Create these two tables with proper relationships:

1. issues table
   - id: UUID primary key (default gen_random_uuid())
   - title: varchar(255) NOT NULL
   - description: text
   - project: varchar(100) NOT NULL
   - priority: varchar(20) NOT NULL (Low, Medium, High, Critical)
   - assignee: varchar(100) NOT NULL
   - status: varchar(20) NOT NULL DEFAULT 'Open' (Open, In Progress, Resolved, Closed)
   - created_at: timestamptz DEFAULT now()
   - updated_at: timestamptz DEFAULT now()

2. comments table
   - id: UUID primary key
   - issue_id: UUID REFERENCES issues(id) ON DELETE CASCADE
   - author: varchar(100) NOT NULL
   - content: text NOT NULL
   - created_at: timestamptz DEFAULT now()

Seed exactly 15 realistic issues + 2–4 comments each when running the seed script.

REQUIRED REST API ENDPOINTS (all with proper validation, error handling, status codes):
GET    /api/issues
GET    /api/issues/{issue_id}
POST   /api/issues
PUT    /api/issues/{issue_id}          (for status change + full update)
DELETE /api/issues/{issue_id}

GET    /api/issues/{issue_id}/comments
POST   /api/issues/{issue_id}/comments

Also add:
POST   /api/seed   (to run seeding)
GET    /api/export-csv (bonus)

All endpoints must have full Pydantic request/response models and server-side validation.

Create these batch files (Windows .bat) in the root:
1. backend.bat → activates virtual env, runs uvicorn on port 8000 with reload
2. frontend.bat → cd frontend && npm run dev (port 5173)

In PLAN.md include:
- Full database schema diagram (text version)
- Complete list of all API endpoints with method, path, request body, response
- Folder structure explanation
- How to set up virtual environment
- How to run migration and seed
- Environment variables needed (.env)
- CORS configuration
- What to improve with more time

Generate everything step-by-step. First output the full PLAN.md content, then create all the actual code files in the correct folders.

Make it clean, production-ready, well-commented, and easy for an intern to understand and explain in an interview. Use meaningful names, proper typing, and follow FastAPI best practices.

Start now."
