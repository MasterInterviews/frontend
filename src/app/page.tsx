"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/courses/CourseCard";
import { Footer } from "@/components/layout/Footer";
import { courses } from "@/lib/data";
import { ArrowRight, Sparkles, Users, BookOpen, Trophy, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const topics = [
    "System Design",
    "Distributed Systems",
    "ML Infrastructure",
    "Design Patterns",
    "Scalable Architecture",
];

export default function HomePage() {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTopicIndex((prevIndex) => (prevIndex + 1) % topics.length);
                setIsAnimating(false);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />

                <div className="container mx-auto px-6 md:px-8 relative">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Announcement Badge */}
                        <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
                            <Badge
                                variant="outline"
                                className="px-4 py-2 bg-primary/10 border-primary/30 text-primary gap-2 text-sm font-bold hover:bg-primary/20 transition-colors cursor-pointer shadow-sm"
                            >
                                <Sparkles className="h-4 w-4" />
                                For Senior & Staff Engineers
                                <ArrowRight className="h-4 w-4" />
                            </Badge>
                        </div>

                        {/* Hero Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Master{" "}
                            <span
                                className={`inline-block px-4 md:px-6 py-2 md:py-3 my-2 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 rounded-2xl transition-all duration-300 ${
                                    isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                                }`}
                            >
                                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                    {topics[currentTopicIndex]}
                                </span>
                            </span>
                        </h1>

                        {/* Hero Subtitle */}
                        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                            Advanced curriculum for <span className="text-foreground font-semibold">SDE 3 and Staff</span> positions.
                            Deep dive into design patterns, distributed systems, and production ML infrastructure.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                            <Link href="/learn">
                                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 rounded-xl">
                                    Start Learning
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/learn/low-level-design">
                                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-2 border-border/60 hover:bg-muted/60 hover:border-foreground/20 transition-all rounded-xl">
                                    Browse Curriculum
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-7 duration-700 delay-500">
                            {[
                                { icon: BookOpen, value: "80+", label: "In-depth Chapters" },
                                { icon: Users, value: "5K+", label: "Senior Engineers" },
                                { icon: Trophy, value: "L6+", label: "Career Levels" },
                                { icon: Zap, value: "6", label: "Learning Paths" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center group cursor-default">
                                    <div className="p-3 rounded-xl bg-primary/5 w-fit mx-auto mb-4 group-hover:bg-primary/15 transition-all border border-primary/10">
                                        <stat.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                                    </div>
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-2">{stat.value}</div>
                                    <div className="text-sm md:text-base text-muted-foreground font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-20 md:py-28 border-t border-border/50 bg-muted/20">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                            Learning Paths
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed">
                            Comprehensive courses designed for senior engineers building production systems at scale.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
