import { Search, Plus, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopNavbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  onNewIssue: () => void;
  onMenuToggle: () => void;
}

export function TopNavbar({ search, onSearchChange, onNewIssue, onMenuToggle }: TopNavbarProps) {
  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4 sticky top-0 z-30">
      <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-md hover:bg-muted text-muted-foreground">
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search issues..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-muted border-border h-9 text-sm focus-visible:ring-primary"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>
        <Button onClick={onNewIssue} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 font-medium">
          <Plus className="w-4 h-4" />
          New Issue
        </Button>
      </div>
    </header>
  );
}
