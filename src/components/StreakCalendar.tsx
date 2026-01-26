"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface StreakCalendarProps {
    streakDays?: number[]; // Days of the current month that are part of the streak
    currentStreak: number;
}

export function StreakCalendar({ streakDays = [], currentStreak = 0 }: StreakCalendarProps) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Get month name
    const monthName = now.toLocaleString('default', { month: 'long' });

    // Get number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the first day of the month (0 = Sunday, 1 = Monday, ...)
    // Adjusting to make Monday the first day (0)
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = now.getDate();

    // Weekday labels
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <Card className="border-border/50 shadow-none bg-card">
            <CardHeader className="pb-4 px-4 pt-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                        {monthName} <span className="text-muted-foreground font-normal">{year}</span>
                    </CardTitle>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        <Zap className="h-3.5 w-3.5 fill-current" />
                        <span>{currentStreak}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-7 gap-y-3 gap-x-2">
                    {/* Weekday headers */}
                    {weekDays.map((day, i) => (
                        <div key={i} className="h-6 flex items-center justify-center text-[10px] font-medium text-muted-foreground/60">
                            {day}
                        </div>
                    ))}

                    {/* Empty cells before the first day */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Days of the month */}
                    {days.map((day) => {
                        const isStreak = streakDays.includes(day);
                        const isToday = day === today;
                        const isFuture = day > today;

                        return (
                            <div key={day} className="aspect-square flex items-center justify-center relative group">
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200
                                        ${isStreak
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : isToday
                                                ? 'bg-muted text-foreground ring-2 ring-primary/20'
                                                : 'text-muted-foreground hover:bg-muted/50'}
                                        ${isFuture ? 'opacity-30 cursor-default' : 'cursor-default'}
                                    `}
                                >
                                    {day}
                                </div>

                                {isToday && (
                                    <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
