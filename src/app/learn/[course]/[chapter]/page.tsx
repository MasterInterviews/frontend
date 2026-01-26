
import { notFound } from "next/navigation";
import { getCourse, getChapter } from "@/lib/data";
import { getChapterContent } from "@/lib/content";
import { CourseSidebar } from "@/components/layout/CourseSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChevronLeft, ChevronRight, Clock, Sparkles,
    Lock
} from "lucide-react";
import Link from "next/link";
import { StreakCalendar } from "@/components/StreakCalendar";
import { TableOfContents } from "@/components/TableOfContents";
import { ChapterInteractions } from "@/components/chapter/ChapterInteractions";

// Regular Markdown & Custom Components
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { Tip } from "@/components/mdx/Tip";
import { Accordion, AccordionItem } from "@/components/mdx/Accordion";
import { AccordionWrapper } from "@/components/mdx/AccordionWrapper";
import { AccordionItemWrapper } from "@/components/mdx/AccordionItemWrapper";
import { PatternCard } from "@/components/mdx/PatternCard";
import { SolutionCard } from "@/components/mdx/SolutionCard";
import { Annotation } from "@/components/mdx/Annotation";
import { ContentImage } from "@/components/mdx/Image";


interface ChapterPageProps {
    params: Promise<{ course: string; chapter: string }>;
}

function RemarkDirectivePlugin() {
    return (tree: any) => {
        // Process all directives
        visit(tree, (node) => {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                const data = node.data || (node.data = {});
                const tagName = node.name;

                data.hName = tagName;
                data.hProperties = { ...node.attributes, ...data.hProperties };
            }
        });
    };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
    const { course: courseSlug, chapter: chapterSlug } = await params;
    const course = getCourse(courseSlug);
    const chapter = course ? getChapter(courseSlug, chapterSlug) : undefined;

    if (!course || !chapter) {
        notFound();
    }

    const content = getChapterContent(courseSlug, chapterSlug);
    const chapterIndex = course.chapters.findIndex((ch) => ch.slug === chapterSlug);
    const prevChapter = chapterIndex > 0 ? course.chapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < course.chapters.length - 1 ? course.chapters[chapterIndex + 1] : null;

    // Check if content is locked (premium chapter for non-premium user)
    // TODO: Implement actual user permission check here
    const isLocked = chapter.isPremium;

    // Extract headings for "On This Page"
    const headings = content.match(/^(##|###)\s+(.+)$/gm)?.map((h) => {
        const level = h.startsWith("###") ? 3 : 2;
        const text = h.replace(/^(##|###)\s+/, "");
        const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        return { id, text, level };
    }) || [];

    const components = {
        // Standardized Typography
        h1: ({ node, ...props }: any) => <h1 className="text-3xl font-bold mt-6 mb-3 text-foreground" {...props} />,
        h2: ({ node, ...props }: any) => <h2 className="text-2xl font-semibold mt-6 mb-2 text-foreground" {...props} />,
        h3: ({ node, ...props }: any) => <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground" {...props} />,
        h4: ({ node, ...props }: any) => <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground" {...props} />,
        h5: ({ node, ...props }: any) => <h5 className="text-base font-semibold mt-3 mb-1 text-foreground" {...props} />,
        h6: ({ node, ...props }: any) => <h6 className="text-base font-semibold mt-3 mb-1 text-foreground" {...props} />,
        p: ({ node, ...props }: any) => <p className="text-base mb-4 text-foreground" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="list-disc pl-5 mb-4 text-base text-foreground" {...props} />,
        ol: ({ node, ...props }: any) => <ol className="list-decimal pl-5 mb-4 text-base text-foreground" {...props} />,
        li: ({ node, ...props }: any) => <li className="leading-relaxed" {...props} />,
        code: ({ node, ...props }: any) => <code className="bg-muted px-1 py-0.5 text-sm font-mono" {...props} />,
        pre: ({ node, ...props }: any) => <pre className="bg-muted p-4 overflow-x-auto mb-4 text-sm font-mono" {...props} />,
        blockquote: ({ node, ...props }: any) => <blockquote className="border-l-2 border-foreground pl-4 italic my-4" {...props} />,
        a: ({ node, ...props }: any) => <a className="text-foreground underline underline-offset-2 hover:text-foreground/80 font-medium transition-colors" {...props} />,
        img: ({ node, ...props }: any) => {
            // Support for images with captions via alt text or data attributes
            const alt = props.alt || "";
            const caption = props["data-caption"] || (alt && alt !== props.src ? alt : undefined);
            return <ContentImage src={props.src} alt={alt} caption={caption} {...props} />;
        },
        // Custom Directives
        tip: (props: any) => <Tip type={props.type || "general"} title={props.title} {...props} />,
        annotation: (props: any) => <Annotation type={props.type || "note"} title={props.title} {...props} />,
        accordion: (props: any) => {
            // ReactMarkdown passes children as an array - ensure we collect all items
            const children = props.children || [];
            return <AccordionWrapper {...props}>{children}</AccordionWrapper>;
        },
        item: (props: any) => {
            // Create a component that stores props and can be identified
            const ItemComponent = () => <AccordionItemWrapper {...props} isAccordionItem={true} />;
            (ItemComponent as any).__itemProps = props;
            return <ItemComponent />;
        },
        patterncard: (props: any) => <PatternCard {...props} />,
        solutioncard: (props: any) => <SolutionCard type={props.type || "good"} title={props.title} {...props} />,
        // Legacy support
        Tip: (props: any) => <Tip type={props.type || "general"} title={props.title} {...props} />,
        Annotation: (props: any) => <Annotation type={props.type || "note"} title={props.title} {...props} />,
        Accordion: (props: any) => <AccordionWrapper {...props}>{props.children}</AccordionWrapper>,
        AccordionItem: (props: any) => <AccordionItem {...props} />,
        PatternCard: (props: any) => <PatternCard {...props} />,
        SolutionCard: (props: any) => <SolutionCard type={props.type || "good"} title={props.title} {...props} />,
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
            {/* Sidebar */}
            <div className="border-r border-border h-full hidden lg:block w-64">
                <CourseSidebar course={course} currentChapterSlug={chapterSlug} />
            </div>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    {/* Header - Simple */}
                    <div className="mb-8 pb-6 border-b border-border">
                        <div className="text-xs text-muted-foreground mb-3">
                            <Link href={`/learn/${course.slug}`} className="hover:text-foreground">
                                {course.title}
                            </Link>
                            <span className="mx-2">/</span>
                            <span>{chapter.section}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-3">
                            {chapter.title}
                        </h1>
                        <div className="text-xs text-muted-foreground">
                            {chapter.estimatedReadTime} min read
                        </div>
                    </div>

                    {/* Content */}
                    <div className="markdown-content">
                        {content.includes("Coming Soon") || content.trim() === "" ? (
                            <div className="py-12 text-center">
                                <p className="text-muted-foreground">Coming Soon</p>
                            </div>
                        ) : isLocked ? (
                            <div className="py-12 text-center border border-border p-6">
                                <Lock className="h-6 w-6 mx-auto mb-3 text-foreground" />
                                <h3 className="font-semibold mb-2">Premium Content</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Subscribe to unlock this chapter.
                                </p>
                                <Button className="bg-foreground text-background hover:bg-foreground/90 h-8 text-sm">
                                    Upgrade
                                </Button>
                            </div>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkDirective, RemarkDirectivePlugin]}
                                components={components}
                            >
                                {content}
                            </ReactMarkdown>
                        )}
                    </div>

                    {/* Footer / Navigation - Simple */}
                    <div className="mt-12 pt-6 border-t border-border">
                        <div className="flex justify-between items-center text-sm">
                            {prevChapter ? (
                                <Link href={`/learn/${course.slug}/${prevChapter.slug}`} className="text-muted-foreground hover:text-foreground">
                                    ← {prevChapter.title}
                                </Link>
                            ) : <div></div>}

                            {nextChapter ? (
                                <Link href={`/learn/${course.slug}/${nextChapter.slug}`} className="text-muted-foreground hover:text-foreground">
                                    {nextChapter.title} →
                                </Link>
                            ) : <div></div>}
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar - TOC - Simple */}
            <div className="border-l border-border w-48 hidden xl:block p-4">
                <TableOfContents headings={headings} />
            </div>
        </div>
    );
}
