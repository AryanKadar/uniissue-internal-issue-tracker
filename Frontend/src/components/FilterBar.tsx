import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROJECTS, TEAM_MEMBERS } from "@/lib/data";
import type { Priority, Status, Project } from "@/lib/data";

export interface Filters {
  project: string;
  priority: string;
  status: string;
  assignee: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const statuses: Status[] = ["Open", "In Progress", "Resolved", "Closed"];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const set = (key: keyof Filters, val: string) => onChange({ ...filters, [key]: val });
  const hasFilters = Object.values(filters).some((v) => v !== "all");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={filters.project} onValueChange={(v) => set("project", v)}>
        <SelectTrigger className="w-[160px] bg-muted border-border h-9 text-sm">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Projects</SelectItem>
          {PROJECTS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={filters.priority} onValueChange={(v) => set("priority", v)}>
        <SelectTrigger className="w-[140px] bg-muted border-border h-9 text-sm">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Priorities</SelectItem>
          {priorities.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(v) => set("status", v)}>
        <SelectTrigger className="w-[150px] bg-muted border-border h-9 text-sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={filters.assignee} onValueChange={(v) => set("assignee", v)}>
        <SelectTrigger className="w-[160px] bg-muted border-border h-9 text-sm">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Assignees</SelectItem>
          {TEAM_MEMBERS.map((m) => <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>)}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange({ project: "all", priority: "all", status: "all", assignee: "all" })}
          className="text-muted-foreground hover:text-foreground gap-1 h-9"
        >
          <X className="w-3 h-3" /> Clear
        </Button>
      )}
    </div>
  );
}
