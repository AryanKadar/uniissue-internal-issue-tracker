import { formatDistanceToNow, format } from "date-fns";
import type { Priority, Status } from "./data";

export const priorityColor = (p: Priority) => {
  const map: Record<Priority, string> = {
    Low: "bg-priority-low/15 text-priority-low border-priority-low/30",
    Medium: "bg-priority-medium/15 text-priority-medium border-priority-medium/30",
    High: "bg-priority-high/15 text-priority-high border-priority-high/30",
    Critical: "bg-priority-critical/15 text-priority-critical border-priority-critical/30",
  };
  return map[p];
};

export const statusColor = (s: Status) => {
  const map: Record<Status, string> = {
    Open: "bg-status-open/15 text-status-open border-status-open/30",
    "In Progress": "bg-status-in-progress/15 text-status-in-progress border-status-in-progress/30",
    Resolved: "bg-status-resolved/15 text-status-resolved border-status-resolved/30",
    Closed: "bg-status-closed/15 text-status-closed border-status-closed/30",
  };
  return map[s];
};

export const statusDotColor = (s: Status) => {
  const map: Record<Status, string> = {
    Open: "bg-status-open",
    "In Progress": "bg-status-in-progress",
    Resolved: "bg-status-resolved",
    Closed: "bg-status-closed",
  };
  return map[s];
};

/** Accepts an ISO 8601 string (from backend JSON) or a Date object */
export const relativeTime = (date: string | Date) =>
  formatDistanceToNow(typeof date === "string" ? new Date(date) : date, { addSuffix: true });

export const formatDate = (date: string | Date) =>
  format(typeof date === "string" ? new Date(date) : date, "MMM d, yyyy");

export const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

// CSV export is now handled server-side via GET /api/export-csv
// Use api.exportCSV() from @/lib/api instead.
