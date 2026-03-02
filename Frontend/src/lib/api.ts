/**
 * api.ts — Central API client for the Issue Tracker backend.
 * All HTTP calls go through this module. No fetch calls in components.
 *
 * Base URL is read from the environment variable VITE_API_URL
 * (defaults to http://localhost:8000 for local development).
 */

import type { Issue, Comment } from "./data";

const BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:8000") + "/api";

// ─── Generic fetch wrapper ─────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail = body?.detail ?? res.statusText;
    throw new Error(`API ${res.status}: ${detail}`);
  }

  // 204 No Content — return null
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

// ─── Issue query params ────────────────────────────────────────────────────

export interface IssueFilters {
  project?:  string;
  priority?: string;
  status?:   string;
  assignee?: string;
  search?:   string;
}

// ─── Create / Update payloads ──────────────────────────────────────────────

export interface IssueCreatePayload {
  title:       string;
  description: string;
  project:     string;
  priority:    string;
  assignee:    string;
  status?:     string;
}

export interface IssueUpdatePayload {
  title?:       string;
  description?: string;
  project?:     string;
  priority?:    string;
  assignee?:    string;
  status?:      string;
}

export interface CommentCreatePayload {
  author: string;
  text:   string;
}

// ─── API functions ─────────────────────────────────────────────────────────

export const api = {
  /** GET /api/issues — list all issues with optional filters */
  getIssues: (filters: IssueFilters = {}): Promise<Issue[]> => {
    const params = new URLSearchParams();
    if (filters.project)  params.set("project",  filters.project);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.status)   params.set("status",   filters.status);
    if (filters.assignee) params.set("assignee", filters.assignee);
    if (filters.search)   params.set("search",   filters.search);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return request<Issue[]>(`/issues${qs}`);
  },

  /** GET /api/issues/{id} — single issue with comments */
  getIssue: (id: string): Promise<Issue> =>
    request<Issue>(`/issues/${id}`),

  /** POST /api/issues — create new issue */
  createIssue: (data: IssueCreatePayload): Promise<Issue> =>
    request<Issue>("/issues", { method: "POST", body: JSON.stringify(data) }),

  /** PATCH /api/issues/{id} — partial update (e.g., status change) */
  updateIssue: (id: string, data: IssueUpdatePayload): Promise<Issue> =>
    request<Issue>(`/issues/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  /** DELETE /api/issues/{id} — delete issue + cascade comments */
  deleteIssue: (id: string): Promise<null> =>
    request<null>(`/issues/${id}`, { method: "DELETE" }),

  /** GET /api/issues/{id}/comments */
  getComments: (issueId: string): Promise<Comment[]> =>
    request<Comment[]>(`/issues/${issueId}/comments`),

  /** POST /api/issues/{id}/comments — add a comment */
  addComment: (issueId: string, data: CommentCreatePayload): Promise<Comment> =>
    request<Comment>(`/issues/${issueId}/comments`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** DELETE /api/issues/{id}/comments/{commentId} */
  deleteComment: (issueId: string, commentId: string): Promise<null> =>
    request<null>(`/issues/${issueId}/comments/${commentId}`, { method: "DELETE" }),

  /** POST /api/seed — clear DB and insert 15 seed issues */
  seed: (): Promise<{ message: string }> =>
    request<{ message: string }>("/seed", { method: "POST" }),

  /** GET /api/export-csv — trigger CSV download in browser */
  exportCSV: (): void => {
    window.open(`${BASE}/export-csv`, "_blank");
  },

  /** GET /health — check if backend is reachable */
  health: (): Promise<{ status: string }> =>
    fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/health`)
      .then((r) => r.json()),
};
