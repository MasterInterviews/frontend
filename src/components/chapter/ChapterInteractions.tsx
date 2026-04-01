"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, FileText, Check, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ChapterInteractionsProps {
    courseId: string;
    chapterId: string;
    courseSlug?: string;
    nextChapterSlug?: string;
    nextChapterTitle?: string;
}

const burstParticles = [
    { x: -55, y: -45, color: "bg-primary", delay: 0 },
    { x: 55, y: -45, color: "bg-primary", delay: 0.04 },
    { x: -72, y: 4, color: "bg-primary/70", delay: 0.08 },
    { x: 72, y: 4, color: "bg-primary", delay: 0.04 },
    { x: -45, y: 52, color: "bg-primary/70", delay: 0.1 },
    { x: 45, y: 52, color: "bg-primary", delay: 0.06 },
    { x: 4, y: -68, color: "bg-primary", delay: 0.02 },
    { x: 4, y: 65, color: "bg-primary/70", delay: 0.08 },
];

export function ChapterInteractions({
    courseId,
    chapterId,
    courseSlug,
    nextChapterSlug,
    nextChapterTitle,
}: ChapterInteractionsProps) {
    const [isStarred, setIsStarred] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [burstKey, setBurstKey] = useState(0);

    const getCompletionKey = (cId: string, chId: string) => `completed_${cId}_${chId}`;

    useEffect(() => {
        const completed = localStorage.getItem(getCompletionKey(courseId, chapterId)) === "true";
        setIsCompleted(completed);
    }, [courseId, chapterId]);

    // Auto-dismiss modal after 6s
    useEffect(() => {
        if (!showCelebration) return;
        const timer = setTimeout(() => setShowCelebration(false), 6000);
        return () => clearTimeout(timer);
    }, [showCelebration]);

    const toggleCompletion = () => {
        const wasCompleted = isCompleted;
        const newState = !isCompleted;
        setIsCompleted(newState);
        localStorage.setItem(getCompletionKey(courseId, chapterId), String(newState));

        window.dispatchEvent(
            new CustomEvent("chapterCompleted", {
                detail: { courseId, chapterId, completed: newState },
            }),
        );

        if (!wasCompleted && newState) {
            setBurstKey((k) => k + 1);
            setShowCelebration(true);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2 mb-8">
                {/* Star */}
                <button
                    className={`flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition-all border ${
                        isStarred
                            ? "border-amber-400/60 text-amber-500 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                    }`}
                    onClick={() => setIsStarred(!isStarred)}
                >
                    <Star className={`h-3.5 w-3.5 ${isStarred ? "fill-current" : ""}`} />
                    <span>{isStarred ? "Starred" : "Star"}</span>
                </button>

                {/* Mark Complete — pill button with burst */}
                <div className="relative">
                    <motion.button
                        onClick={toggleCompletion}
                        className={`relative flex items-center gap-2 h-8 px-4 rounded-full text-xs font-medium transition-colors border overflow-visible ${
                            isCompleted
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/25"
                        }`}
                        whileTap={{ scale: 0.94 }}
                    >
                        <span className="relative flex items-center justify-center w-3.5 h-3.5">
                            <AnimatePresence mode="wait">
                                {isCompleted ? (
                                    <motion.span
                                        key="checked"
                                        className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-primary-foreground/20"
                                        initial={{ scale: 0, rotate: -30 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <Check className="h-2 w-2 text-primary-foreground" strokeWidth={3.5} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="unchecked"
                                        className="flex items-center justify-center w-3.5 h-3.5 rounded-full border border-current"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    />
                                )}
                            </AnimatePresence>
                        </span>
                        <AnimatePresence mode="wait">
                            {isCompleted ? (
                                <motion.span
                                    key="done"
                                    initial={{ opacity: 0, x: 4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    Completed
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="mark"
                                    initial={{ opacity: 0, x: 4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    Mark Complete
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Burst particles */}
                    <AnimatePresence>
                        {burstParticles.map((p, i) => (
                            <motion.div
                                key={`${burstKey}-${i}`}
                                className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full pointer-events-none ${p.color}`}
                                style={{ marginLeft: -3, marginTop: -3 }}
                                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
                                transition={{ duration: 0.65, delay: p.delay, ease: "easeOut" }}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Notes */}
                <button className="flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Notes</span>
                </button>
            </div>

            {/* Celebration Modal */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        style={{ backgroundColor: "hsl(var(--background) / 0.65)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setShowCelebration(false)}
                    >
                        {/* Backdrop blur */}
                        <div className="absolute inset-0 backdrop-blur-sm" />

                        <motion.div
                            className="relative z-10 w-full max-w-xs flex flex-col items-center rounded-2xl border border-border bg-card shadow-2xl pt-10 pb-8 px-8"
                            initial={{ scale: 0.88, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 12 }}
                            transition={{ type: "spring", stiffness: 320, damping: 26 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close */}
                            <button
                                type="button"
                                className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                onClick={() => setShowCelebration(false)}
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>

                            {/* Animated checkmark */}
                            <div className="relative mb-5">
                                <motion.div
                                    className="absolute inset-[-10px] rounded-full bg-primary/15"
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    animate={{ scale: [0.8, 1.25, 1.05], opacity: [0.8, 0.15, 0.25] }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                />
                                <motion.svg
                                    width="72"
                                    height="72"
                                    viewBox="0 0 72 72"
                                    fill="none"
                                >
                                    <motion.circle
                                        cx="36"
                                        cy="36"
                                        r="32"
                                        stroke="var(--primary)"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.55, ease: "easeOut" }}
                                    />
                                    <motion.path
                                        d="M21 36 L31 47 L51 25"
                                        stroke="var(--primary)"
                                        strokeWidth="4.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.38, delay: 0.48, ease: "easeOut" }}
                                    />
                                </motion.svg>
                            </div>

                            {/* Text */}
                            <motion.div
                                className="text-center mb-6"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                            >
                                <h3 className="text-lg font-semibold mb-1">Chapter complete!</h3>
                                <p className="text-xs text-muted-foreground">
                                    {nextChapterTitle
                                        ? `Up next: ${nextChapterTitle}`
                                        : "Keep the momentum going."}
                                </p>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                className="flex gap-2 w-full"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                            >
                                {nextChapterSlug && courseSlug ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 rounded-xl h-9 text-xs"
                                            onClick={() => setShowCelebration(false)}
                                        >
                                            Stay here
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 rounded-xl h-9 text-xs gap-1 bg-foreground text-background hover:bg-foreground/90"
                                            asChild
                                        >
                                            <Link
                                                href={`/learn/${courseSlug}/${nextChapterSlug}`}
                                                onClick={() => setShowCelebration(false)}
                                            >
                                                Next <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        size="sm"
                                        className="flex-1 rounded-xl h-9 text-xs bg-foreground text-background hover:bg-foreground/90"
                                        onClick={() => setShowCelebration(false)}
                                    >
                                        Keep going
                                    </Button>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
