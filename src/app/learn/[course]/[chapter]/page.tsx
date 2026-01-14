"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { getCourse, getChapter } from "@/lib/data";
import { getChapterContent } from "@/lib/content";
import { CourseSidebar } from "@/components/layout/CourseSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FileText, Star, CheckCircle, MessageSquare,
    ChevronLeft, ChevronRight, Clock, Sparkles,
    Lock
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { StreakCalendar } from "@/components/StreakCalendar";
import { TableOfContents } from "@/components/TableOfContents";

interface ChapterPageProps {
    params: Promise<{ course: string; chapter: string }>;
}

export default function ChapterPage({ params }: ChapterPageProps) {
    const { course: courseSlug, chapter: chapterSlug } = use(params);
    const course = getCourse(courseSlug);
    const chapter = course ? getChapter(courseSlug, chapterSlug) : undefined;
    const [isStarred, setIsStarred] = useState(false);

    // Completion tracking with localStorage
    const getCompletionKey = (courseId: string, chapterId: string) => `completed_${courseId}_${chapterId}`;
    const [isCompleted, setIsCompleted] = useState(false);
    const [courseProgress, setCourseProgress] = useState({ completed: 0, total: 0 });

    useEffect(() => {
        if (course && chapter) {
            const completed = localStorage.getItem(getCompletionKey(course.id, chapter.id)) === 'true';
            setIsCompleted(completed);

            // Calculate course progress
            const completedChapters = course.chapters.filter((ch) => {
                const key = `completed_${course.id}_${ch.id}`;
                return localStorage.getItem(key) === 'true';
            }).length;
            setCourseProgress({ completed: completedChapters, total: course.chapters.length });
        }
    }, [course, chapter]);

    const toggleCompletion = () => {
        if (course && chapter) {
            const newState = !isCompleted;
            setIsCompleted(newState);
            localStorage.setItem(getCompletionKey(course.id, chapter.id), String(newState));

            // Update progress
            const completedChapters = course.chapters.filter((ch) => {
                const key = `completed_${course.id}_${ch.id}`;
                if (ch.id === chapter.id) return newState;
                return localStorage.getItem(key) === 'true';
            }).length;
            setCourseProgress({ completed: completedChapters, total: course.chapters.length });

            // Trigger a custom event to update sidebar
            window.dispatchEvent(new CustomEvent('chapterCompleted', {
                detail: { courseId: course.id, chapterId: chapter.id, completed: newState }
            }));
        }
    };

    if (!course || !chapter) {
        notFound();
    }

    const content = getChapterContent(courseSlug, chapterSlug);
    const chapterIndex = course.chapters.findIndex((ch) => ch.slug === chapterSlug);
    const prevChapter = chapterIndex > 0 ? course.chapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < course.chapters.length - 1 ? course.chapters[chapterIndex + 1] : null;

    // Check if content is locked (premium chapter for non-premium user)
    const isLocked = chapter.isPremium;

    // Extract headings from content for "On This Page"
    const headings = content.match(/^(##|###)\s+(.+)$/gm)?.map((h) => {
        const level = h.startsWith("###") ? 3 : 2;
        const text = h.replace(/^(##|###)\s+/, "");
        const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        return { id, text, level };
    }) || [];

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
            {/* Sidebar */}
            <div className="border-r border-border/40 h-full hidden lg:block">
                <CourseSidebar course={course} currentChapterSlug={chapterSlug} />
            </div>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto">
                <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 lg:py-12">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6">
                            <Link href={`/learn/${course.slug}`} className="hover:text-foreground transition-colors">
                                {course.title}
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-foreground/70">{chapter.section}</span>
                        </div>

                        <div className="space-y-6 pb-8 border-b border-border/40">
                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
                                    {chapter.title}
                                </h1>
                                {chapter.isPremium && (
                                    <Badge variant="secondary" className="bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-600/20 dark:border-blue-500/20 px-3 py-1 text-sm font-semibold uppercase flex-shrink-0">
                                        Premium
                                    </Badge>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">SM</AvatarFallback>
                                    </Avatar>
                                    <span>System Mastery Team</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>{chapter.estimatedReadTime} min read</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                    <span>Updated Jan 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <article className="markdown-content prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:text-base prose-p:leading-7 prose-p:text-foreground/90 prose-li:text-base prose-li:text-foreground/85 prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none">
                        {content.includes("Coming Soon") || content.trim() === "" ? (
                            <div className="py-16 text-center">
                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                                        <Clock className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            This chapter is currently being written. Check back soon for the full content!
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            In the meantime, explore our other available chapters to continue your learning journey.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : isLocked ? (
                            <>
                                {/* Show preview */}
                                <div dangerouslySetInnerHTML={{ __html: formatMarkdown(content.substring(0, 1500)) }} className="mask-image-b-50" />
                                <div className="relative bottom-48 h-48 bg-gradient-to-t from-background to-transparent" />

                                {/* Premium Lock Card */}
                                <div className="relative z-20 -mt-24">
                                    <div className="mx-auto max-w-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-1 shadow-2xl">
                                        <div className="bg-background/40 rounded-[20px] p-8 md:p-12 text-center space-y-6">
                                            <div className="w-16 h-16 mx-auto bg-blue-600/20 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-blue-600/20 dark:ring-blue-500/20">
                                                <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-2xl font-bold text-foreground">Premium Content</h3>
                                                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                                                    Subscribe to <span className="text-primary font-semibold">SystemsMastery Premium</span> to unlock this chapter and access our entire library of expert-led system design courses.
                                                </p>
                                            </div>

                                            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20 transition-all hover:scale-105">
                                                <Sparkles className="mr-2 h-5 w-5" />
                                                Upgrade to Unlock
                                            </Button>

                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest pt-4">
                                                30-Day Money-Back Guarantee
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
                        )}
                    </article>

                    {/* Footer / Navigation */}
                    <div className="mt-20 pt-8 border-t border-border/40">
                        {/* Action Buttons Row */}
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
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-muted-foreground hover:text-foreground"}`}
                                onClick={toggleCompletion}
                            >
                                {isCompleted ? (
                                    <CheckCircle className="h-4 w-4 fill-green-600 dark:fill-green-400 text-green-600 dark:text-green-400" strokeWidth={2.5} />
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

                        {/* Navigation Row */}
                        <div className="flex items-center justify-between gap-6">
                            {prevChapter ? (
                                <Link href={`/learn/${course.slug}/${prevChapter.slug}`} className="group flex-1 max-w-[48%]">
                                    <Button variant="outline" className="w-full h-auto py-4 justify-start gap-4 text-sm border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 shadow-sm hover:shadow-md">
                                        <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0" />
                                        <div className="text-left min-w-0 flex-1 py-1">
                                            <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Previous Lesson</div>
                                            <div className="text-base font-bold truncate text-foreground/90 group-hover:text-primary transition-colors">{prevChapter.title}</div>
                                        </div>
                                    </Button>
                                </Link>
                            ) : (
                                <div className="flex-1 max-w-[48%]" />
                            )}
                            {nextChapter && (
                                <Link href={`/learn/${course.slug}/${nextChapter.slug}`} className="group flex-1 max-w-[48%] ml-auto">
                                    <Button className="w-full h-auto py-4 justify-end gap-4 text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 border border-transparent">
                                        <div className="text-right min-w-0 flex-1 py-1">
                                            <div className="text-xs font-medium text-blue-100 mb-1.5 uppercase tracking-wide">Next Lesson</div>
                                            <div className="text-base font-bold truncate text-white">{nextChapter.title}</div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="hidden xl:block w-72 border-l border-border/40 bg-muted/10 h-full overflow-y-auto">
                <div className="p-6">
                    {/* Study Streak Widget */}
                    <div className="mb-8">
                        <StreakCalendar streakDays={[1, 2, 3, 4]} currentStreak={4} />
                    </div>

                    {headings.length > 0 && (
                        <TableOfContents headings={headings} />
                    )}
                </div>
            </aside>
        </div>
    );
}

// Simple markdown to HTML converter
function formatMarkdown(content: string): string {
    return content
        .replace(/^### (.+)$/gm, (_, p1) => {
            console.log("formatMarkdown H3:", p1); // Added checking
            const id = p1.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            return `<h3 id="${id}" class="scroll-mt-24 text-xl font-semibold mt-6 mb-3 text-foreground">${p1}</h3>`;
        })
        .replace(/^## (.+)$/gm, (_, p1) => {
            const id = p1.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            return `<h2 id="${id}" class="scroll-mt-24 text-2xl font-semibold mt-8 mb-4 text-foreground">${p1}</h2>`;
        })
        .replace(/^# (.+)$/gm, '') // Remove H1 as it's handled by the page header
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/^\- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[h|u|o|l|p])/gm, '<p>')
        .replace(/\n---\n/g, '<hr/>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<[h|u|o|l])/g, '$1')
        .replace(/(<\/[h|u|o|l][^>]*>)<\/p>/g, '$1');
}
