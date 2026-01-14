"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -66% 0px" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-foreground/80 uppercase tracking-widest pl-1">
                On This Page
            </h3>
            <nav className="relative">
                {/* Vertical line track */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />

                <ul className="space-y-0.5 relative z-10">
                    {headings.map((heading) => {
                        const isActive = activeId === heading.id;
                        return (
                            <li key={heading.id} className="relative">
                                {/* Active indicator line */}
                                {isActive && (
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary -ml-[0.5px] rounded-r-full transition-all duration-300 ease-in-out"
                                        style={{ height: '100%' }}
                                    />
                                )}
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start"
                                        });
                                        setActiveId(heading.id);
                                    }}
                                    className={cn(
                                        "block py-1.5 pr-2 transition-colors duration-200 text-sm leading-snug",
                                        heading.level === 3 ? "pl-6" : "pl-4",
                                        isActive
                                            ? "text-primary font-medium bg-primary/5"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                    )}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
