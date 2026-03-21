export interface SbiExample {
    id: string;
    year: number;
    dimension: string;
    situation: string;
    behavior: string;
    impact: string;
    createdAt: string;
}

export const DIMENSIONS = [
    "Leadership",
    "Conflict Resolution",
    "Project Ownership",
    "Handling Mistakes",
    "Teamwork",
    "Communication",
    "Innovation",
    "Customer Obsession",
    "Mentorship",
    "Technical Decision",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

export const DIMENSION_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    Leadership: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30", dot: "bg-blue-500" },
    "Conflict Resolution": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30", dot: "bg-amber-500" },
    "Project Ownership": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30", dot: "bg-emerald-500" },
    "Handling Mistakes": { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500/30", dot: "bg-rose-500" },
    Teamwork: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/30", dot: "bg-violet-500" },
    Communication: { bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/30", dot: "bg-cyan-500" },
    Innovation: { bg: "bg-fuchsia-500/10", text: "text-fuchsia-600 dark:text-fuchsia-400", border: "border-fuchsia-500/30", dot: "bg-fuchsia-500" },
    "Customer Obsession": { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/30", dot: "bg-orange-500" },
    Mentorship: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", border: "border-teal-500/30", dot: "bg-teal-500" },
    "Technical Decision": { bg: "bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/30", dot: "bg-indigo-500" },
};
