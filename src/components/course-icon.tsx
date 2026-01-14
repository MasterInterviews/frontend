import { BrainCircuit, Bot, Globe, AppWindow, Code2, Sparkles, Layout, Database, FileCode } from "lucide-react";

export const iconMap = {
    BrainCircuit,
    Bot,
    Globe,
    AppWindow,
    Code2,
    Sparkles,
    Layout,
    Database,
    FileCode
};

export type IconName = keyof typeof iconMap;

export function CourseIcon({ name, className }: { name: string, className?: string }) {
    const Icon = iconMap[name as keyof typeof iconMap];

    if (!Icon) {
        return <Globe className={className} />;
    }

    return <Icon className={className} />;
}
