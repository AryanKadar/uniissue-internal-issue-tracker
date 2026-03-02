/**
 * data.ts — Static constants + TypeScript types.
 * Seed data has been removed — issues now come from the PostgreSQL backend.
 * Types updated to match the JSON shapes returned by the FastAPI API.
 */

export const PROJECTS = [
  "Project Alpha",
  "Client Beta",
  "Internal Gamma",
  "Mobile Delta",
] as const;

export const TEAM_MEMBERS = [
  { id: "1", name: "Alice Johnson", initials: "AJ" },
  { id: "2", name: "Bob Smith", initials: "BS" },
  { id: "3", name: "Carol Williams", initials: "CW" },
  { id: "4", name: "David Brown", initials: "DB" },
  { id: "5", name: "Emma Davis", initials: "ED" },
] as const;

export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Status = "Open" | "In Progress" | "Resolved" | "Closed";
export type Project = (typeof PROJECTS)[number];

/** A comment on an issue — shape matches the backend CommentOut schema */
export interface Comment {
  id: string;   // UUID from backend
  issue_id: string;   // parent issue UUID
  author: string;
  text: string;
  created_at: string;   // ISO 8601 string from JSON
}

/** A single issue — shape matches the backend IssueOut schema */
export interface Issue {
  id: string;   // UUID from backend
  title: string;
  description: string;
  project: string;
  priority: string;
  assignee: string;
  status: string;
  created_at: string;   // ISO 8601 string from JSON
  updated_at: string;   // ISO 8601 string from JSON
  comments: Comment[];
}
