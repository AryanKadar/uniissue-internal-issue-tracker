import { formatDistanceToNow, format } from "date-fns";
import type { Priority, Status, Issue } from "./data";

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

export const relativeTime = (date: Date) => formatDistanceToNow(date, { addSuffix: true });

export const formatDate = (date: Date) => format(date, "MMM d, yyyy");

export const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

export const exportToCSV = (issues: Issue[]) => {
  const headers = ["ID", "Title", "Description", "Project", "Priority", "Assignee", "Status", "Created"];
  const rows = issues.map((i) => [
    i.id,
    `"${i.title.replace(/"/g, '""')}"`,
    `"${i.description.replace(/"/g, '""')}"`,
    i.project,
    i.priority,
    i.assignee,
    i.status,
    formatDate(i.createdAt),
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `uniissue-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
