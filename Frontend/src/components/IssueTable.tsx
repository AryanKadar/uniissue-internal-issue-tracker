import { Eye, ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { priorityColor, statusColor, formatDate, getInitials } from "@/lib/helpers";
import type { Issue } from "@/lib/data";
import { useState } from "react";

interface IssueTableProps {
  issues: Issue[];
  onSelect: (issue: Issue) => void;
}

type SortKey = "id" | "title" | "project" | "priority" | "assignee" | "status" | "created_at";

const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export function IssueTable({ issues, onSelect }: IssueTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...issues].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "priority") {
      cmp =
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder];
    } else if (sortKey === "created_at") {
      cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else {
      cmp = String(a[sortKey as keyof Issue]).localeCompare(
        String(b[sortKey as keyof Issue])
      );
    }
    return sortAsc ? cmp : -cmp;
  });

  const SortHeader = ({ label, field }: { label: string; field: SortKey }) => (
    <button onClick={() => toggleSort(field)} className="flex items-center gap-1 hover:text-foreground transition-colors">
      {label}
      <ArrowUpDown className="w-3 h-3 opacity-50" />
    </button>
  );

  if (issues.length === 0) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Eye className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No issues found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-[80px] text-muted-foreground"><SortHeader label="ID" field="id" /></TableHead>
            <TableHead className="text-muted-foreground"><SortHeader label="Title" field="title" /></TableHead>
            <TableHead className="text-muted-foreground hidden md:table-cell"><SortHeader label="Project" field="project" /></TableHead>
            <TableHead className="text-muted-foreground"><SortHeader label="Priority" field="priority" /></TableHead>
            <TableHead className="text-muted-foreground hidden lg:table-cell"><SortHeader label="Assignee" field="assignee" /></TableHead>
            <TableHead className="text-muted-foreground"><SortHeader label="Status" field="status" /></TableHead>
            <TableHead className="text-muted-foreground hidden lg:table-cell"><SortHeader label="Created" field="created_at" /></TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((issue, i) => (
            <TableRow
              key={issue.id}
              className={`border-border cursor-pointer transition-colors hover:bg-muted/50 ${i % 2 === 0 ? "bg-transparent" : "bg-muted/20"}`}
              onClick={() => onSelect(issue)}
            >
              <TableCell className="font-mono text-xs text-muted-foreground">{issue.id}</TableCell>
              <TableCell className="font-medium text-foreground">{issue.title}</TableCell>
              <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{issue.project}</TableCell>
              <TableCell>
                <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${priorityColor(issue.priority)}`}>
                  {issue.priority}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary">
                    {getInitials(issue.assignee)}
                  </div>
                  <span className="text-sm text-muted-foreground">{issue.assignee}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor(issue.status)}`}>
                  {issue.status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">
                {formatDate(issue.created_at)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); onSelect(issue); }}>
                  <Eye className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
