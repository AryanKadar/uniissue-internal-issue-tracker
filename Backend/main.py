from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

from routers.issues import router as issues_router
from routers.comments import router as comments_router

# ─── Application ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Issue Tracker API",
    description=(
        "REST API for the Unico Issue Tracker. "
        "Manage issues and comments for 4 projects with a 15-person team."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS ─────────────────────────────────────────────────────────────────────
# Origins are loaded from .env so both Frontend and Backend stay in sync.
_origins = [
    os.getenv("FRONTEND_ORIGIN",     "http://localhost:5173"),
    os.getenv("FRONTEND_ORIGIN_ALT", "http://127.0.0.1:5173"),
    # Vite sometimes auto-picks 8080 if 5173 is taken
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(issues_router)
app.include_router(comments_router)


# ─── Health Check ─────────────────────────────────────────────────────────────
@app.get("/health", tags=["utility"], summary="Health check")
async def health():
    """Returns {"status": "ok"} — use to verify the API is reachable."""
    return {"status": "ok"}


# ─── Root ─────────────────────────────────────────────────────────────────────
@app.get("/", tags=["utility"], summary="API root")
async def root():
    return {
        "message": "Issue Tracker API",
        "docs":    "/docs",
        "health":  "/health",
    }
