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

from grok to antigravity:
"create a detail plan md for my backend ,changes in existing frontend and creation of tables in unico database and problem is given in image above ,i have already created frontend so you have just make changes in frontend here is problem in plan md 
prompt "You are an expert full-stack architect. 

SCAN the entire current project (Frontend/, Backend/, Plan_Md/, Test/ folders, problem.md, and the dashboard screenshot in the workspace).

TASK: Create a complete professional PLAN.md (and all code files) so the existing Lovable React frontend talks to a real FastAPI backend with PostgreSQL "unico" database.

STRICT REQUIREMENTS:
• Backend folder → FastAPI + SQLAlchemy 2.0 (async) + Alembic + Pydantic v2
• Use existing "unico" PostgreSQL database (public schema)
• Create exactly 2 tables: issues + comments (UUID PK, proper relationships, timestamps)
• Seed 15 realistic issues + 2-4 comments each via /api/seed
• Full CRUD REST API on /api/issues and /api/issues/{id}/comments
• Add /api/export-csv bonus
• CORS for http://localhost:5173
• Backend runs on port 8000

• Update existing Frontend/ folder to use real API (axios/fetch) instead of local state
• Keep Chakra UI dark theme exactly as it is

FOLDERS (use these only):
- Backend/ (all FastAPI code)
- Frontend/ (modify existing)
- Plan_Md/ (all PLAN files)
- Test/ (create test files)

OUTPUT FIRST:
1. Plan_Md/PLAN_backend.md
2. Plan_Md/PLAN_frontend_changes.md  
3. Plan_Md/PLAN_setup.md (with .env placeholders, batch files, migration steps)

Then generate:
• All backend files (models, schemas, crud, routers, main.py, seed.py, alembic)
• Update necessary frontend files to connect to real backend
• backend.bat + frontend.bat in root
• .env.example with placeholders (DB password, etc.)
• requirements.txt
• Test files in Test/ folder
• Update ARCHITECTURE.md and README.md

Include in every PLAN file:
- Database schema (text diagram)
- Full API list with request/response
- Step-by-step setup (virtual env, migration, seed, run)
- How data flows: DB → Backend → Frontend
- What to improve with more time

Generate everything clean, commented, production-ready and interview-friendly. Start now"

problem.md
 "

me to antigravity:
"i got this error when i run backend @terminal:uvicorn and frontend run well @terminal:uvicorn and why frontend is not running no 5173 port 

logs.txt
  and before all that first give me commit message so that i can commit my save "
  
me to antigravity:
  "make sure the frontend is run on 5173 and backend is run on 8000 and also make sure that when i run backend.bat and frontend.bat it kill all the esiting process so that backend is run on 8000 and frontend is run on 5173 and also make sure the terminal give clean and professinal message in terminal with color and symbol and banner and continue with above response "

me to antigravity:
  "can you run backend.bat and frontend.bat for me to check backend and frontend is working and also make sure the terminal for both frontend and backend show output is clean ,professinal manner with color and symbol  "

me to cursor
  "fix this issue @logs.txt 
scan frontend ,scan backend scan database and fix this issue"