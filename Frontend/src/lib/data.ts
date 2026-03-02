export const PROJECTS = ["Project Alpha", "Client Beta", "Internal Gamma", "Mobile Delta"] as const;

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

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  project: Project;
  priority: Priority;
  assignee: string;
  status: Status;
  createdAt: Date;
  comments: Comment[];
}

let nextId = 16;
export const generateId = () => `UI-${String(nextId++).padStart(3, "0")}`;

const d = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

export const SEED_ISSUES: Issue[] = [
  { id: "UI-001", title: "Login page crashes on invalid email", description: "When entering an email without '@', the login form throws an unhandled exception and the page becomes unresponsive.", project: "Project Alpha", priority: "Critical", assignee: "Alice Johnson", status: "Open", createdAt: d(12), comments: [
    { id: "c1", author: "Bob Smith", text: "I can reproduce this on Chrome and Firefox.", createdAt: d(11) },
    { id: "c2", author: "Alice Johnson", text: "Looking into the validation logic now.", createdAt: d(10) },
  ]},
  { id: "UI-002", title: "Add dark mode support", description: "Users have requested a dark theme option. Need to implement theme switching across all pages.", project: "Client Beta", priority: "Medium", assignee: "Carol Williams", status: "In Progress", createdAt: d(15), comments: [
    { id: "c3", author: "Carol Williams", text: "Started with the color token system.", createdAt: d(14) },
    { id: "c4", author: "Emma Davis", text: "Make sure to test contrast ratios for accessibility.", createdAt: d(13) },
    { id: "c5", author: "Carol Williams", text: "Good call, will run lighthouse checks.", createdAt: d(12) },
  ]},
  { id: "UI-003", title: "Optimize image loading on dashboard", description: "Dashboard loads 40+ unoptimized images causing 8s+ load time. Need lazy loading and WebP conversion.", project: "Project Alpha", priority: "High", assignee: "David Brown", status: "Open", createdAt: d(8), comments: [
    { id: "c6", author: "David Brown", text: "Profiled the page — images account for 85% of load time.", createdAt: d(7) },
    { id: "c7", author: "Alice Johnson", text: "Can we use a CDN with auto-format?", createdAt: d(6) },
  ]},
  { id: "UI-004", title: "Fix mobile nav overlap", description: "On screens below 768px, the navigation menu overlaps with the main content area.", project: "Mobile Delta", priority: "High", assignee: "Emma Davis", status: "Resolved", createdAt: d(20), comments: [
    { id: "c8", author: "Emma Davis", text: "Fixed with proper z-index and position:fixed.", createdAt: d(18) },
    { id: "c9", author: "Bob Smith", text: "Verified on iPhone 14 and Pixel 7.", createdAt: d(17) },
    { id: "c10", author: "Emma Davis", text: "Also added a backdrop blur effect.", createdAt: d(16) },
  ]},
  { id: "UI-005", title: "Database migration script fails", description: "The v2.3 migration script throws a foreign key constraint error on the comments table.", project: "Internal Gamma", priority: "Critical", assignee: "Bob Smith", status: "In Progress", createdAt: d(3), comments: [
    { id: "c11", author: "Bob Smith", text: "Found the issue — orphaned records in comments table.", createdAt: d(2) },
    { id: "c12", author: "David Brown", text: "Should we add a cleanup step before migration?", createdAt: d(1) },
  ]},
  { id: "UI-006", title: "Add CSV export for reports", description: "Management needs the ability to export filtered issue reports as CSV files.", project: "Client Beta", priority: "Low", assignee: "Alice Johnson", status: "Open", createdAt: d(10), comments: [
    { id: "c13", author: "Alice Johnson", text: "Will use papaparse for CSV generation.", createdAt: d(9) },
    { id: "c14", author: "Carol Williams", text: "Make sure to handle special characters in descriptions.", createdAt: d(8) },
  ]},
  { id: "UI-007", title: "Implement push notifications", description: "Set up Firebase Cloud Messaging for real-time push notifications on issue updates.", project: "Mobile Delta", priority: "Medium", assignee: "David Brown", status: "Open", createdAt: d(6), comments: [
    { id: "c15", author: "David Brown", text: "FCM setup complete, working on the service worker.", createdAt: d(5) },
    { id: "c16", author: "Emma Davis", text: "Don't forget to handle notification permissions gracefully.", createdAt: d(4) },
    { id: "c17", author: "David Brown", text: "Added a custom permission prompt UI.", createdAt: d(3) },
  ]},
  { id: "UI-008", title: "Refactor authentication module", description: "Current auth module is monolithic. Break it into separate concerns: session, tokens, permissions.", project: "Internal Gamma", priority: "Medium", assignee: "Carol Williams", status: "Closed", createdAt: d(30), comments: [
    { id: "c18", author: "Carol Williams", text: "Completed the refactor. PR is up for review.", createdAt: d(25) },
    { id: "c19", author: "Bob Smith", text: "LGTM, merged.", createdAt: d(24) },
  ]},
  { id: "UI-009", title: "Fix timezone bug in scheduling", description: "Events created in PST show wrong time for EST users. Need to normalize all times to UTC.", project: "Project Alpha", priority: "High", assignee: "Bob Smith", status: "Resolved", createdAt: d(14), comments: [
    { id: "c20", author: "Bob Smith", text: "Switched all storage to UTC, converting on display.", createdAt: d(12) },
    { id: "c21", author: "Alice Johnson", text: "Tested across 4 timezones, looks correct now.", createdAt: d(11) },
  ]},
  { id: "UI-010", title: "Add search autocomplete", description: "Implement typeahead suggestions in the global search bar using existing issue data.", project: "Client Beta", priority: "Low", assignee: "Emma Davis", status: "Open", createdAt: d(5), comments: [
    { id: "c22", author: "Emma Davis", text: "Using a debounced search with fuzzy matching.", createdAt: d(4) },
    { id: "c23", author: "Carol Williams", text: "Consider adding keyboard navigation for the suggestions.", createdAt: d(3) },
  ]},
  { id: "UI-011", title: "Performance audit Q1", description: "Run comprehensive performance audit on all client-facing pages. Document findings and recommendations.", project: "Internal Gamma", priority: "Low", assignee: "David Brown", status: "In Progress", createdAt: d(7), comments: [
    { id: "c24", author: "David Brown", text: "Lighthouse scores collected for all 12 pages.", createdAt: d(6) },
    { id: "c25", author: "Alice Johnson", text: "Share the report in the team channel when ready.", createdAt: d(5) },
    { id: "c26", author: "David Brown", text: "Will have the full report by EOD Friday.", createdAt: d(4) },
  ]},
  { id: "UI-012", title: "Update onboarding flow", description: "Redesign the new user onboarding to reduce drop-off. Current completion rate is only 34%.", project: "Mobile Delta", priority: "High", assignee: "Alice Johnson", status: "Open", createdAt: d(4), comments: [
    { id: "c27", author: "Alice Johnson", text: "Wireframes ready for review.", createdAt: d(3) },
    { id: "c28", author: "Emma Davis", text: "Love the progressive disclosure approach.", createdAt: d(2) },
  ]},
  { id: "UI-013", title: "API rate limiting implementation", description: "Add rate limiting to all public API endpoints to prevent abuse. Target: 100 req/min per API key.", project: "Internal Gamma", priority: "Medium", assignee: "Bob Smith", status: "Resolved", createdAt: d(18), comments: [
    { id: "c29", author: "Bob Smith", text: "Using token bucket algorithm with Redis.", createdAt: d(16) },
    { id: "c30", author: "David Brown", text: "Load tested at 500 req/min, rate limiter holds.", createdAt: d(15) },
  ]},
  { id: "UI-014", title: "Fix broken image uploads", description: "Image uploads over 5MB silently fail. Need proper validation and error messaging.", project: "Client Beta", priority: "High", assignee: "Carol Williams", status: "In Progress", createdAt: d(2), comments: [
    { id: "c31", author: "Carol Williams", text: "Added client-side size validation with clear error.", createdAt: d(1) },
    { id: "c32", author: "Bob Smith", text: "Also need to update the server-side limit.", createdAt: d(0) },
  ]},
  { id: "UI-015", title: "Accessibility compliance review", description: "Ensure WCAG 2.1 AA compliance across all forms and interactive elements.", project: "Project Alpha", priority: "Medium", assignee: "Emma Davis", status: "Closed", createdAt: d(25), comments: [
    { id: "c33", author: "Emma Davis", text: "All forms now have proper aria labels and roles.", createdAt: d(22) },
    { id: "c34", author: "Alice Johnson", text: "Ran axe-core, zero violations. Great work!", createdAt: d(21) },
  ]},
];
