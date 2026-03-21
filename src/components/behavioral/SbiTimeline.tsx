"use client";

import { useState } from "react";
import { useSbiExamples } from "@/hooks/use-sbi-examples";
import { DIMENSIONS, DIMENSION_COLORS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Sparkles,
    X,
    ArrowRight,
} from "lucide-react";

const currentYear = new Date().getFullYear();

interface FormState {
    year: number;
    dimension: string;
    situation: string;
    behavior: string;
    impact: string;
}

const emptyForm: FormState = {
    year: currentYear,
    dimension: DIMENSIONS[0],
    situation: "",
    behavior: "",
    impact: "",
};

export function SbiTimeline() {
    const { examples, isLoaded, addExample, deleteExample } = useSbiExamples();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (!isLoaded) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.situation.trim() || !form.behavior.trim() || !form.impact.trim()) return;
        addExample(form);
        setForm(emptyForm);
        setShowForm(false);
    };

    const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    // Group examples by year for timeline rendering
    const yearGroups = examples.reduce<Record<number, typeof examples>>(
        (acc, ex) => {
            if (!acc[ex.year]) acc[ex.year] = [];
            acc[ex.year].push(ex);
            return acc;
        },
        {}
    );
    const sortedYears = Object.keys(yearGroups)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[var(--gold)]" />
                        <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            Your Experience Timeline
                        </h2>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                        Document your career examples in{" "}
                        <span className="font-semibold text-foreground">SBI format</span>{" "}
                        (Situation → Behavior → Impact). Build your personal story bank
                        before diving into the lessons.
                    </p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    size="sm"
                    className="shrink-0 gap-1.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-[var(--gold-foreground)] font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {showForm ? "Cancel" : "Add Example"}
                </Button>
            </div>

            {/* Add Form */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${showForm
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-5 md:p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Row 1: Year + Dimension */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">
                                            Year
                                        </label>
                                        <input
                                            type="number"
                                            min={2000}
                                            max={currentYear + 1}
                                            value={form.year}
                                            onChange={(e) =>
                                                updateField("year", parseInt(e.target.value) || currentYear)
                                            }
                                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">
                                            Dimension
                                        </label>
                                        <select
                                            value={form.dimension}
                                            onChange={(e) => updateField("dimension", e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none cursor-pointer"
                                        >
                                            {DIMENSIONS.map((d) => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* SBI Fields */}
                                <div className="space-y-4">
                                    {(
                                        [
                                            {
                                                key: "situation" as const,
                                                label: "Situation",
                                                hint: "Set the scene. What was the context or challenge?",
                                                color: "text-blue-500",
                                            },
                                            {
                                                key: "behavior" as const,
                                                label: "Behavior",
                                                hint: "What specific actions did you take?",
                                                color: "text-amber-500",
                                            },
                                            {
                                                key: "impact" as const,
                                                label: "Impact",
                                                hint: "What was the measurable outcome or result?",
                                                color: "text-emerald-500",
                                            },
                                        ] as const
                                    ).map((field) => (
                                        <div key={field.key} className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                                <span
                                                    className={`inline-block w-1.5 h-1.5 rounded-full ${field.color.replace("text-", "bg-")}`}
                                                />
                                                {field.label}
                                            </label>
                                            <textarea
                                                rows={2}
                                                placeholder={field.hint}
                                                value={form[field.key]}
                                                onChange={(e) =>
                                                    updateField(field.key, e.target.value)
                                                }
                                                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add to Timeline
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Timeline */}
            {examples.length === 0 ? (
                <div className="text-center py-12 px-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
                        <ArrowRight className="h-7 w-7 text-muted-foreground/50 rotate-90" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No examples yet
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Add your first career example above. Think of impactful projects,
                        leadership moments, or challenges you&apos;ve overcome.
                    </p>
                </div>
            ) : (
                <div className="relative pl-6 md:pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

                    <div className="space-y-8">
                        {sortedYears.map((year) => (
                            <div key={year} className="relative">
                                {/* Year marker */}
                                <div className="flex items-center gap-3 mb-4 -ml-6 md:-ml-8">
                                    <div className="relative z-10 flex items-center justify-center w-[22px] h-[22px] md:w-[30px] md:h-[30px] rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-bold shadow-md shadow-primary/20 ring-4 ring-background">
                                        <span className="hidden md:inline">{year}</span>
                                    </div>
                                    <span className="text-base md:text-lg font-bold text-foreground">
                                        {year}
                                    </span>
                                </div>

                                {/* Cards for this year */}
                                <div className="space-y-4">
                                    {yearGroups[year].map((example) => {
                                        const colors =
                                            DIMENSION_COLORS[example.dimension] ||
                                            DIMENSION_COLORS["Leadership"];
                                        const isExpanded = expandedId === example.id;

                                        return (
                                            <div key={example.id} className="relative">
                                                {/* Dot connector */}
                                                <div
                                                    className={`absolute -left-6 md:-left-8 top-5 w-[10px] h-[10px] md:w-3 md:h-3 rounded-full ${colors.dot} ring-4 ring-background z-10 shadow-sm`}
                                                />
                                                {/* Horizontal connector */}
                                                <div className="absolute -left-3.5 md:-left-4.5 top-[23px] md:top-[26px] w-3.5 md:w-4.5 h-0.5 bg-border/50" />

                                                <Card
                                                    className={`group border ${colors.border} bg-card/60 backdrop-blur-sm hover:bg-card/90 hover:shadow-md transition-all duration-200 cursor-pointer`}
                                                    onClick={() =>
                                                        setExpandedId(isExpanded ? null : example.id)
                                                    }
                                                >
                                                    <CardContent className="p-4 md:p-5">
                                                        {/* Top row: dimension + actions */}
                                                        <div className="flex items-center justify-between mb-3">
                                                            <Badge
                                                                className={`${colors.bg} ${colors.text} border ${colors.border} text-xs font-semibold px-2.5 py-0.5`}
                                                            >
                                                                {example.dimension}
                                                            </Badge>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        deleteExample(example.id);
                                                                    }}
                                                                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                                                                    title="Delete example"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </button>
                                                                {isExpanded ? (
                                                                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                                                ) : (
                                                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Preview / Collapsed */}
                                                        <p className="text-sm text-foreground line-clamp-2 font-medium">
                                                            {example.situation}
                                                        </p>

                                                        {/* Expanded SBI details */}
                                                        <div
                                                            className={`grid transition-all duration-300 ease-in-out ${isExpanded
                                                                    ? "grid-rows-[1fr] opacity-100 mt-4"
                                                                    : "grid-rows-[0fr] opacity-0 mt-0"
                                                                }`}
                                                        >
                                                            <div className="overflow-hidden">
                                                                <div className="space-y-3 pt-3 border-t border-border/40">
                                                                    {/* Situation */}
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                                            Situation
                                                                        </span>
                                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                                            {example.situation}
                                                                        </p>
                                                                    </div>

                                                                    {/* Behavior */}
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                                            Behavior
                                                                        </span>
                                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                                            {example.behavior}
                                                                        </p>
                                                                    </div>

                                                                    {/* Impact */}
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                            Impact
                                                                        </span>
                                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                                            {example.impact}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
