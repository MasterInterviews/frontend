"use client";

import { FileText, AlertCircle, BookOpen, Info, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnnotationType = "note" | "important" | "example" | "info";

interface AnnotationProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    content?: string;
    type?: AnnotationType;
}

const annotationConfig: Record<AnnotationType, { icon: LucideIcon; defaultTitle: string; borderColor: string; bgColor: string; iconColor: string }> = {
    note: {
        icon: FileText,
        defaultTitle: "Note",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    important: {
        icon: AlertCircle,
        defaultTitle: "Important",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    example: {
        icon: BookOpen,
        defaultTitle: "Example",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    info: {
        icon: Info,
        defaultTitle: "Info",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
};

export function Annotation({ children, className = "", title, content, type = "note" }: AnnotationProps) {
    const config = annotationConfig[type];
    const Icon = config.icon;
    const displayTitle = title;

    return (
        <div className={cn(
            "my-4 p-4",
            config.borderColor,
            config.bgColor,
            className
        )}>
            <div className="flex items-start gap-3">
                <Icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", config.iconColor)} />
                <div className="flex-1">
                    {displayTitle && (
                        <div className="font-medium text-foreground mb-1 text-sm">
                            {displayTitle}
                        </div>
                    )}
                    <div className="text-foreground text-sm leading-relaxed">
                        {children || content}
                    </div>
                </div>
            </div>
        </div>
    );
}
