/**
 * useIssues.ts — Custom React hook for issue data management.
 * Wraps api.ts with loading, error state, and refetch capability.
 * All components use this hook instead of calling api.ts directly.
 */

import { useState, useEffect, useCallback } from "react";
import { api, IssueCreatePayload, IssueUpdatePayload, CommentCreatePayload } from "@/lib/api";
import type { Issue } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function useIssues() {
    const { toast } = useToast();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ─── Fetch all issues ─────────────────────────────────────────────────────

    const fetchIssues = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getIssues();
            setIssues(data);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed to load issues";
            setError(msg);
            toast({
                title: "Connection Error",
                description: "Could not reach the backend. Is it running on port 8000?",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    // Load on mount
    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    // ─── Create issue ──────────────────────────────────────────────────────────

    const createIssue = useCallback(
        async (data: IssueCreatePayload): Promise<boolean> => {
            try {
                const newIssue = await api.createIssue(data);
                setIssues((prev) => [newIssue, ...prev]);
                toast({ title: "Issue created", description: `"${data.title}" has been added.` });
                return true;
            } catch (err) {
                toast({
                    title: "Failed to create issue",
                    description: err instanceof Error ? err.message : "Please try again.",
                    variant: "destructive",
                });
                return false;
            }
        },
        [toast]
    );

    // ─── Update issue (status change, etc.) ───────────────────────────────────

    const updateIssue = useCallback(
        async (id: string, data: IssueUpdatePayload): Promise<Issue | null> => {
            try {
                const updated = await api.updateIssue(id, data);
                setIssues((prev) => prev.map((i) => (i.id === id ? updated : i)));
                return updated;
            } catch (err) {
                toast({
                    title: "Failed to update issue",
                    description: err instanceof Error ? err.message : "Please try again.",
                    variant: "destructive",
                });
                return null;
            }
        },
        [toast]
    );

    // ─── Add comment ───────────────────────────────────────────────────────────

    const addComment = useCallback(
        async (issueId: string, data: CommentCreatePayload): Promise<boolean> => {
            try {
                const comment = await api.addComment(issueId, data);
                // Merge comment into the matching issue in local state
                setIssues((prev) =>
                    prev.map((i) =>
                        i.id === issueId
                            ? { ...i, comments: [...i.comments, comment] }
                            : i
                    )
                );
                return true;
            } catch (err) {
                toast({
                    title: "Failed to post comment",
                    description: err instanceof Error ? err.message : "Please try again.",
                    variant: "destructive",
                });
                return false;
            }
        },
        [toast]
    );

    // ─── Delete issue ──────────────────────────────────────────────────────────

    const deleteIssue = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                await api.deleteIssue(id);
                setIssues((prev) => prev.filter((i) => i.id !== id));
                toast({ title: "Issue deleted" });
                return true;
            } catch (err) {
                toast({
                    title: "Failed to delete issue",
                    description: err instanceof Error ? err.message : "Please try again.",
                    variant: "destructive",
                });
                return false;
            }
        },
        [toast]
    );

    return {
        issues,
        loading,
        error,
        refetch: fetchIssues,
        createIssue,
        updateIssue,
        addComment,
        deleteIssue,
    };
}
