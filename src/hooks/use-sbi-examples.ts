"use client";

import { useState, useEffect, useCallback } from "react";
import type { SbiExample } from "@/lib/types";

const STORAGE_KEY = "sbi_examples";

function loadExamples(): SbiExample[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as SbiExample[];
    } catch {
        return [];
    }
}

function saveExamples(examples: SbiExample[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(examples));
}

export function useSbiExamples() {
    const [examples, setExamples] = useState<SbiExample[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        setExamples(loadExamples());
        setIsLoaded(true);
    }, []);

    // Persist whenever examples change (after initial load)
    useEffect(() => {
        if (isLoaded) {
            saveExamples(examples);
        }
    }, [examples, isLoaded]);

    const addExample = useCallback(
        (example: Omit<SbiExample, "id" | "createdAt">) => {
            const newExample: SbiExample = {
                ...example,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            };
            setExamples((prev) =>
                [...prev, newExample].sort((a, b) => b.year - a.year)
            );
        },
        []
    );

    const deleteExample = useCallback((id: string) => {
        setExamples((prev) => prev.filter((e) => e.id !== id));
    }, []);

    const editExample = useCallback(
        (id: string, updates: Partial<Omit<SbiExample, "id" | "createdAt">>) => {
            setExamples((prev) =>
                prev
                    .map((e) => (e.id === id ? { ...e, ...updates } : e))
                    .sort((a, b) => b.year - a.year)
            );
        },
        []
    );

    return { examples, isLoaded, addExample, deleteExample, editExample };
}
