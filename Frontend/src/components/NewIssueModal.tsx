import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROJECTS, TEAM_MEMBERS } from "@/lib/data";
import type { Priority, Project } from "@/lib/data";
import type { IssueCreatePayload } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface NewIssueModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IssueCreatePayload) => Promise<void>;
}

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const priorityDots: Record<Priority, string> = {
  Low: "bg-priority-low",
  Medium: "bg-priority-medium",
  High: "bg-priority-high",
  Critical: "bg-priority-critical",
};

export function NewIssueModal({ open, onClose, onSubmit }: NewIssueModalProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setTitle(""); setDescription(""); setProject(""); setPriority(""); setAssignee("");
    setErrors({}); setSubmitting(false);
  };

  const handleSubmit = async () => {
    const errs: Record<string, boolean> = {};
    if (!title.trim()) errs.title = true;
    if (!description.trim()) errs.description = true;
    if (!project) errs.project = true;
    if (!priority) errs.priority = true;
    if (!assignee) errs.assignee = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        project: project as Project,
        priority: priority as Priority,
        assignee,
        status: "Open",
      });
      toast({ title: "Issue created", description: `"${title}" has been added.` });
      reset();
      onClose();
    } catch {
      toast({ title: "Failed to create issue", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground text-lg">Create New Issue</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label className={errors.title ? "text-destructive" : "text-muted-foreground"}>Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title"
              className={`bg-muted border-border mt-1 ${errors.title ? "border-destructive" : ""}`} />
            {errors.title && <p className="text-xs text-destructive mt-1">Title is required</p>}
          </div>
          <div>
            <Label className={errors.description ? "text-destructive" : "text-muted-foreground"}>Description *</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              className={`bg-muted border-border mt-1 min-h-[80px] ${errors.description ? "border-destructive" : ""}`} />
            {errors.description && <p className="text-xs text-destructive mt-1">Description is required</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className={errors.project ? "text-destructive" : "text-muted-foreground"}>Project *</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger className={`bg-muted border-border mt-1 ${errors.project ? "border-destructive" : ""}`}>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {PROJECTS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.project && <p className="text-xs text-destructive mt-1">Required</p>}
            </div>
            <div>
              <Label className={errors.assignee ? "text-destructive" : "text-muted-foreground"}>Assignee *</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className={`bg-muted border-border mt-1 ${errors.assignee ? "border-destructive" : ""}`}>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {TEAM_MEMBERS.map((m) => <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.assignee && <p className="text-xs text-destructive mt-1">Required</p>}
            </div>
          </div>
          <div>
            <Label className={errors.priority ? "text-destructive" : "text-muted-foreground"}>Priority *</Label>
            <div className="flex gap-2 mt-2">
              {priorities.map((p) => (
                <button key={p} type="button" onClick={() => setPriority(p)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${priority === p
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-muted text-muted-foreground hover:border-primary/50"
                    }`}>
                  <span className={`w-2 h-2 rounded-full ${priorityDots[p]}`} />
                  {p}
                </button>
              ))}
            </div>
            {errors.priority && <p className="text-xs text-destructive mt-1">Priority is required</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => { reset(); onClose(); }} className="text-muted-foreground">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {submitting ? "Creating…" : "Create Issue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
