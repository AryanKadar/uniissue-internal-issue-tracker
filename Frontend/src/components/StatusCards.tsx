import { CircleDot, Timer, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import type { Issue, Status } from "@/lib/data";

interface StatusCardsProps {
  issues: Issue[];
}

const cards: { status: Status; label: string; icon: typeof CircleDot; colorClass: string }[] = [
  { status: "Open", label: "Open", icon: CircleDot, colorClass: "text-status-open bg-status-open/10" },
  { status: "In Progress", label: "In Progress", icon: Timer, colorClass: "text-status-in-progress bg-status-in-progress/10" },
  { status: "Resolved", label: "Resolved", icon: CheckCircle2, colorClass: "text-status-resolved bg-status-resolved/10" },
  { status: "Closed", label: "Closed", icon: XCircle, colorClass: "text-status-closed bg-status-closed/10" },
];

export function StatusCards({ issues }: StatusCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const count = issues.filter((i) => i.status === c.status).length;
        return (
          <div key={c.status} className="glass-card p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.colorClass}`}>
                <c.icon className="w-4.5 h-4.5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                +2 today
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">{count}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{c.label}</p>
          </div>
        );
      })}
    </div>
  );
}
