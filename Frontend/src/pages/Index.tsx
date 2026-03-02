import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { StatusCards } from "@/components/StatusCards";
import { FilterBar, type Filters } from "@/components/FilterBar";
import { IssueTable } from "@/components/IssueTable";
import { NewIssueModal } from "@/components/NewIssueModal";
import { IssueDetailModal } from "@/components/IssueDetailModal";
import { SEED_ISSUES, PROJECTS } from "@/lib/data";
import { exportToCSV } from "@/lib/helpers";
import type { Issue } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download, FolderOpen } from "lucide-react";

const Index = () => {
  const [issues, setIssues] = useState<Issue[]>(SEED_ISSUES);
  const [activeView, setActiveView] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({ project: "all", priority: "all", status: "all", assignee: "all" });
  const [newIssueOpen, setNewIssueOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = issues;

    // View-specific filtering
    if (activeView === "assignments") {
      result = result.filter((i) => i.assignee === "Aryan Sharma" || i.assignee === "Alice Johnson");
    }

    if (filters.project !== "all") result = result.filter((i) => i.project === filters.project);
    if (filters.priority !== "all") result = result.filter((i) => i.priority === filters.priority);
    if (filters.status !== "all") result = result.filter((i) => i.status === filters.status);
    if (filters.assignee !== "all") result = result.filter((i) => i.assignee === filters.assignee);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }

    return result;
  }, [issues, filters, search, activeView]);

  const handleNewIssue = (issue: Issue) => setIssues((prev) => [issue, ...prev]);

  const handleUpdateIssue = (updated: Issue) => {
    setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setSelectedIssue(updated);
  };

  const renderContent = () => {
    if (activeView === "projects") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p) => {
            const count = issues.filter((i) => i.project === p).length;
            const openCount = issues.filter((i) => i.project === p && i.status === "Open").length;
            return (
              <div key={p} className="glass-card p-6 animate-fade-in hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => { setFilters({ ...filters, project: p }); setActiveView("dashboard"); }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{p}</h3>
                    <p className="text-xs text-muted-foreground">{count} issues • {openCount} open</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <>
        <StatusCards issues={issues} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterBar filters={filters} onChange={setFilters} />
          <Button variant="ghost" size="sm" onClick={() => exportToCSV(filtered)} className="text-muted-foreground hover:text-foreground gap-1.5 h-9">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
        <IssueTable issues={filtered} onSelect={setSelectedIssue} />
      </>
    );
  };

  const viewTitles: Record<string, string> = {
    dashboard: "Dashboard",
    issues: "All Issues",
    assignments: "My Assignments",
    projects: "Projects",
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar activeView={activeView} onNavigate={setActiveView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[250px] flex flex-col min-h-screen">
        <TopNavbar search={search} onSearchChange={setSearch} onNewIssue={() => setNewIssueOpen(true)} onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">{viewTitles[activeView]}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeView === "projects" ? "Browse issues by project" : `${filtered.length} issues`}
            </p>
          </div>
          {renderContent()}
        </main>
      </div>

      <NewIssueModal open={newIssueOpen} onClose={() => setNewIssueOpen(false)} onSubmit={handleNewIssue} />
      <IssueDetailModal issue={selectedIssue} open={!!selectedIssue} onClose={() => setSelectedIssue(null)} onUpdate={handleUpdateIssue} />
    </div>
  );
};

export default Index;
