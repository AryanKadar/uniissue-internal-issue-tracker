from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

from routers import issues, comments

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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(issues.router)
app.include_router(comments.router)


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
