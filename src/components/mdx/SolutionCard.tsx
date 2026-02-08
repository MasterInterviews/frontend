"use client";

import { CheckCircle2, AlertCircle, Sparkles, LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type SolutionType = "good" | "bad" | "best";

interface SolutionCardProps {
    type: SolutionType;
    title?: string;
    content?: string;
    children?: React.ReactNode;
    defaultOpen?: boolean;
}

const styles = {
    good: {
        leftBorder: "border-l-2 border-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        headerBg: "bg-yellow-100/50 dark:bg-yellow-950/40",
        icon: CheckCircle2,
        iconColor: "text-yellow-600 dark:text-yellow-500",
        textColor: "text-foreground",
        defaultTitle: "Good Solution"
    },
    bad: {
        leftBorder: "border-l-2 border-red-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        headerBg: "bg-red-100/50 dark:bg-red-950/40",
        icon: AlertCircle,
        iconColor: "text-red-600 dark:text-red-500",
        textColor: "text-foreground",
        defaultTitle: "Bad Solution"
    },
    best: {
        leftBorder: "border-l-2 border-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        headerBg: "bg-emerald-100/50 dark:bg-emerald-950/40",
        icon: Sparkles,
        iconColor: "text-emerald-600 dark:text-emerald-500",
        textColor: "text-foreground",
        defaultTitle: "Great Solution"
    }
} as const;

export function SolutionCard({ type, title, content, children, defaultOpen = false }: SolutionCardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const config = styles[type];
    const Icon = config.icon as LucideIcon;

    return (
        <div className={cn(
            "my-4 overflow-hidden",
            config.leftBorder,
            config.bg
        )}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full px-4 py-3 flex items-center justify-between text-left",
                    config.headerBg,
                    "hover:bg-secondary"
                )}
            >
                <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", config.iconColor)} />
                    <span className={cn("font-medium text-sm", config.textColor)}>
                        {title || config.defaultTitle}
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className={cn("h-4 w-4", config.textColor)} />
                ) : (
                    <ChevronDown className={cn("h-4 w-4", config.textColor)} />
                )}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 pt-2 text-foreground text-sm leading-relaxed">
                    {content || children}
                </div>
            )}
        </div>
    );
}
