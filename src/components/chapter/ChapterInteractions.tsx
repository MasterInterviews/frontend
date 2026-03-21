"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

interface ChapterInteractionsProps {
    courseId: string;
    chapterId: string;
}

export function ChapterInteractions({ courseId, chapterId }: ChapterInteractionsProps) {
    const [isStarred, setIsStarred] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    const getCompletionKey = (cId: string, chId: string) => `completed_${cId}_${chId}`;

    useEffect(() => {
        const completed = localStorage.getItem(getCompletionKey(courseId, chapterId)) === "true";
        setIsCompleted(completed);
    }, [courseId, chapterId]);

    const toggleCompletion = () => {
        const wasCompleted = isCompleted;
        const newState = !isCompleted;
        setIsCompleted(newState);
        localStorage.setItem(getCompletionKey(courseId, chapterId), String(newState));

        // Trigger a custom event to update sidebar
        window.dispatchEvent(
            new CustomEvent("chapterCompleted", {
                detail: { courseId, chapterId, completed: newState },
            }),
        );

        // Only show celebration when a chapter is newly completed
        if (!wasCompleted && newState) {
            setShowCelebration(true);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-3 mb-8">
                <Button
                    variant="ghost"
                    size="default"
                    className={`gap-2 h-10 text-sm ${
                        isStarred
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsStarred(!isStarred)}
                >
                    <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
                    <span>Star</span>
                </Button>

                <Button
                    variant="ghost"
                    size="default"
                    className={`gap-2 h-10 text-sm ${
                        isCompleted
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={toggleCompletion}
                >
                    {isCompleted ? (
                        <CheckCircle
                            className="h-4 w-4 fill-primary text-primary"
                            strokeWidth={2.5}
                        />
                    ) : (
                        <CheckCircle className="h-4 w-4" />
                    )}
                    <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
                </Button>

                <Button
                    variant="ghost"
                    size="default"
                    className="gap-2 h-10 text-sm text-muted-foreground hover:text-foreground"
                >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Notes</span>
                    <span className="sm:hidden">Note</span>
                </Button>
            </div>

            {/* Celebration overlay */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        className="fixed inset-0 z-40 flex items-center justify-center bg-background/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCelebration(false)}
                    >
                        <motion.div
                            className="relative mx-4 flex max-w-md flex-col items-center justify-center rounded-3xl border border-primary/20 bg-linear-to-b from-background via-background/95 to-background shadow-xl shadow-primary/20 p-6 sm:p-8"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                onClick={() => setShowCelebration(false)}
                                aria-label="Close celebration"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="pointer-events-none mb-4 h-40 w-40 sm:h-48 sm:w-48">
                                {/* 
                                  NOTE: Point this to your downloaded Lottie JSON from:
                                  https://lottiefiles.com/free-animation/success-M3zFBRltpY
                                  For example, place the file at public/animations/success.json
                                  and set path=\"/animations/success.json\".
                                */}
                                {/* Lottie animation placeholder — import animationData JSON here when ready */}
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-primary">
                                    Nice work
                                </p>
                                <h3 className="text-xl sm:text-2xl font-semibold">
                                    Chapter completed!
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    You&apos;re one step closer to mastering this topic. Keep the
                                    momentum going.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
