import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { priorityColor, statusColor, relativeTime, formatDate, getInitials } from "@/lib/helpers";
import type { Issue, Status, Comment } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Calendar, FolderOpen, AlertTriangle, UserCircle, MessageSquare } from "lucide-react";

interface IssueDetailModalProps {
  issue: Issue | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (issue: Issue) => void;
}

const statuses: Status[] = ["Open", "In Progress", "Resolved", "Closed"];

export function IssueDetailModal({ issue, open, onClose, onUpdate }: IssueDetailModalProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status | "">("");
  const [comment, setComment] = useState("");

  if (!issue) return null;

  const currentStatus = status || issue.status;

  const handleSaveStatus = () => {
    if (status && status !== issue.status) {
      onUpdate({ ...issue, status });
      toast({ title: "Status updated", description: `Changed to ${status}` });
    }
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "Aryan Sharma",
      text: comment.trim(),
      createdAt: new Date(),
    };
    onUpdate({ ...issue, comments: [...issue.comments, newComment] });
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setStatus(""); setComment(""); onClose(); } }}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span className="font-mono">{issue.id}</span>
            <span>•</span>
            <span>{relativeTime(issue.createdAt)}</span>
          </div>
          <DialogTitle className="text-foreground text-xl leading-tight">{issue.title}</DialogTitle>
        </DialogHeader>

        {/* Status update */}
        <div className="flex items-center gap-3 mt-2">
          <Select value={currentStatus} onValueChange={(v) => setStatus(v as Status)}>
            <SelectTrigger className="w-[160px] bg-muted border-border h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {status && status !== issue.status && (
            <Button size="sm" onClick={handleSaveStatus} className="bg-primary hover:bg-primary/90 text-primary-foreground h-9">
              Save
            </Button>
          )}
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm text-foreground/80 leading-relaxed">{issue.description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { icon: FolderOpen, label: "Project", value: issue.project },
            { icon: AlertTriangle, label: "Priority", value: issue.priority, badge: priorityColor(issue.priority) },
            { icon: UserCircle, label: "Assignee", value: issue.assignee },
            { icon: Calendar, label: "Created", value: formatDate(issue.createdAt) },
          ].map((item) => (
            <div key={item.label} className="glass-card p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <item.icon className="w-3 h-3" />
                {item.label}
              </div>
              {item.badge ? (
                <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${item.badge}`}>{item.value}</span>
              ) : (
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Comments */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Comments ({issue.comments.length})</h3>
          </div>

          <div className="space-y-3">
            {issue.comments.map((c) => (
              <div key={c.id} className="flex gap-3 animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0 mt-0.5">
                  {getInitials(c.author)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{c.author}</span>
                    <span className="text-xs text-muted-foreground">{relativeTime(c.createdAt)}</span>
                  </div>
                  <p className="text-sm text-foreground/70 mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-muted border-border text-sm min-h-[60px]"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button
              size="sm"
              onClick={handleAddComment}
              disabled={!comment.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Post Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
