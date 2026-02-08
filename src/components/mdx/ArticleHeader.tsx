"use client";

import { Lock, Book, Zap, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ArticleTag {
    icon?: React.ReactNode;
    label: string;
}

export interface CompanyIcon {
    name: string;
    imageSrc?: string;
    fallback: string;
}

export interface ArticleHeaderProps {
    category?: string;
    title: string;
    tags?: ArticleTag[];
    author?: string;
    publishedDate?: string;
    difficulty?: "easy" | "medium" | "hard";
    companies?: CompanyIcon[];
    className?: string;
}

const difficultyConfig = {
    easy: {
        label: "easy",
        className: "bg-green-500/20 text-green-400 border-green-500/50"
    },
    medium: {
        label: "medium",
        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
    },
    hard: {
        label: "hard",
        className: "bg-red-500/20 text-red-400 border-red-500/50"
    }
};

export function ArticleHeader({
    category,
    title,
    tags = [],
    author,
    publishedDate,
    difficulty,
    companies = [],
    className
}: ArticleHeaderProps) {
    return (
        <header className={cn("mb-8 pb-6 border-b border-border", className)}>
            {/* Category */}
            {category && (
                <div className="text-sm text-muted-foreground mb-2">
                    {category}
                </div>
            )}

            {/* Main Title */}
            <h1 className="text-4xl font-bold text-foreground mb-4 mt-0">
                {title}
            </h1>

            {/* Feature Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="px-3 py-1.5 text-sm bg-card border-border"
                        >
                            {tag.icon && <span className="mr-1.5">{tag.icon}</span>}
                            {tag.label}
                        </Badge>
                    ))}
                </div>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {author && (
                    <>
                        <span>By <span className="text-foreground font-medium">{author}</span></span>
                        <Circle className="h-1 w-1 fill-current" />
                    </>
                )}

                {publishedDate && (
                    <>
                        <span>Published {publishedDate}</span>
                        {(difficulty || companies.length > 0) && (
                            <Circle className="h-1 w-1 fill-current" />
                        )}
                    </>
                )}

                {difficulty && (
                    <>
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-xs font-semibold",
                                difficultyConfig[difficulty].className
                            )}
                        >
                            {difficultyConfig[difficulty].label}
                        </Badge>
                        {companies.length > 0 && (
                            <Circle className="h-1 w-1 fill-current" />
                        )}
                    </>
                )}

                {companies.length > 0 && (
                    <>
                        <span>Asked at:</span>
                        <div className="flex items-center gap-1">
                            {companies.slice(0, 4).map((company, index) => (
                                <Avatar key={index} className="h-6 w-6">
                                    {company.imageSrc && (
                                        <AvatarImage src={company.imageSrc} alt={company.name} />
                                    )}
                                    <AvatarFallback className="text-xs bg-muted">
                                        {company.fallback}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                            {companies.length > 4 && (
                                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium">
                                    +{companies.length - 4}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
