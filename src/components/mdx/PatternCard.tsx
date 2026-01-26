"use client";

import { ExternalLink, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface PatternCardProps {
    title: string;
    description: string;
    href?: string;
    tags?: string; // string for comma-separated parsing
    summary?: string; // fallback if needed
}

export function PatternCard({ title, description, href, tags, summary }: PatternCardProps) {
    const tagsList = tags ? tags.split(',').map(t => t.trim()) : [];

    return (
        <div className="my-4 border-l-2 border-foreground pl-4">
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base text-foreground">
                    {title}
                </h3>
                {href && (
                    <Link href={href} className="text-muted-foreground hover:text-foreground">
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>
            <p className="text-sm text-foreground mb-2">
                {description || summary}
            </p>
            {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                    {tagsList.map((tag, i) => (
                        <span key={i}>{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
