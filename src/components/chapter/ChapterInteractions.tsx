"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, FileText } from "lucide-react";

interface ChapterInteractionsProps {
    courseId: string;
    chapterId: string;
}

export function ChapterInteractions({ courseId, chapterId }: ChapterInteractionsProps) {
    const [isStarred, setIsStarred] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const getCompletionKey = (cId: string, chId: string) => `completed_${cId}_${chId}`;

    useEffect(() => {
        const completed = localStorage.getItem(getCompletionKey(courseId, chapterId)) === 'true';
        setIsCompleted(completed);
        // Starred state could also be persisted similarly if desired
    }, [courseId, chapterId]);

    const toggleCompletion = () => {
        const newState = !isCompleted;
        setIsCompleted(newState);
        localStorage.setItem(getCompletionKey(courseId, chapterId), String(newState));

        // Trigger a custom event to update sidebar
        window.dispatchEvent(new CustomEvent('chapterCompleted', {
            detail: { courseId, chapterId, completed: newState }
        }));
    };

    return (
        <div className="flex items-center justify-center gap-3 mb-8">
            <Button
                variant="ghost"
                size="default"
                className={`gap-2 h-10 text-sm ${isStarred ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setIsStarred(!isStarred)}
            >
                <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
                <span>Star</span>
            </Button>

            <Button
                variant="ghost"
                size="default"
                className={`gap-2 h-10 text-sm ${isCompleted
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"}`}
                onClick={toggleCompletion}
            >
                {isCompleted ? (
                    <CheckCircle className="h-4 w-4 fill-primary text-primary" strokeWidth={2.5} />
                ) : (
                    <CheckCircle className="h-4 w-4" />
                )}
                <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
            </Button>

            <Button variant="ghost" size="default" className="gap-2 h-10 text-sm text-muted-foreground hover:text-foreground">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
                <span className="sm:hidden">Note</span>
            </Button>
        </div>
    );
}
