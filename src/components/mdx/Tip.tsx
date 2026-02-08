"use client";

import { Lightbulb, Briefcase, AlertCircle, Info, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TipType = "interview" | "general" | "warning" | "info" | "success" | "danger";

interface TipProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    content?: string;
    type?: TipType;
}

const tipConfig: Record<TipType, { icon: LucideIcon; defaultTitle: string; borderColor: string; bgColor: string; iconColor: string }> = {
    interview: {
        icon: Briefcase,
        defaultTitle: "Interview Tip",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    general: {
        icon: Lightbulb,
        defaultTitle: "Tip",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    warning: {
        icon: AlertCircle,
        defaultTitle: "Warning",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    info: {
        icon: Info,
        defaultTitle: "Note",
        borderColor: "border-l-2 border-foreground",
        bgColor: "bg-muted",
        iconColor: "text-foreground",
    },
    success: {
        icon: Lightbulb,
        defaultTitle: "Tip",
        borderColor: "border-l-4 border-emerald-500",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    danger: {
        icon: AlertCircle,
        defaultTitle: "Warning",
        borderColor: "border-l-4 border-red-500",
        bgColor: "bg-red-50 dark:bg-red-950/30",
        iconColor: "text-red-600 dark:text-red-400",
    },
};

export function Tip({ children, className = "", title, content, type = "general" }: TipProps) {
    const config = tipConfig[type];
    const Icon = config.icon;
    const displayTitle = title;

    return (
        <div className={cn(
            "my-6 p-4",
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
