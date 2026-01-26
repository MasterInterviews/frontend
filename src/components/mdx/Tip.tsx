"use client";

import { Lightbulb, Briefcase, AlertCircle, Info, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TipType = "interview" | "general" | "warning" | "info";

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
