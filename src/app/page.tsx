"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/courses/CourseCard";
import { Footer } from "@/components/layout/Footer";
import { courses } from "@/lib/data";
import { ArrowRight, Sparkles, Users, BookOpen, Trophy, Zap, CheckCircle2, Star } from "lucide-react";
import { useState, useEffect } from "react";

const topics = [
    "ML Platform Design",
    "GenAI Native Design",
    "ML Applications",
    "System Design",
    "Behavioral Interviews",
];

const features = [
    "ML System & Platform Design",
    "GenAI & Agentic Patterns",
    "System Design & LLD",
    "Behavioral & Leadership",
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
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 md:px-8 relative">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Announcement Badge */}
                        <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
                            <Badge
                                variant="outline"
                                className="px-4 py-2 bg-primary/10 border-primary/30 text-primary gap-2 text-sm font-bold hover:bg-primary/20 transition-colors cursor-pointer shadow-sm"
                            >
                                <Sparkles className="h-4 w-4" />
                                Your complete interview prep
                                <ArrowRight className="h-4 w-4" />
                            </Badge>
                        </div>

                        {/* Hero Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Crack Your Next
                            <br />
                            <span
                                className={`inline-block px-4 md:px-6 py-2 md:py-3 my-2 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 rounded-2xl transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                                    }`}
                            >
                                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                    {topics[currentTopicIndex]}
                                </span>
                            </span>
                            <br />
                            Interview
                        </h1>

                        {/* Hero Subtitle */}
                        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                            One platform for <span className="text-foreground font-semibold">System Design, LLD, ML & GenAI</span> interviews.
                            <br className="hidden md:block" />
                            Everything you need to land your dream offer.
                        </p>

                        {/* Feature List */}
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                            <Link href="/learn">
                                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 rounded-xl">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/learn">
                                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-2 border-border/60 hover:bg-muted/60 hover:border-foreground/20 transition-all rounded-xl">
                                    Explore All Courses
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-7 duration-700 delay-500">
                            {[
                                { icon: BookOpen, value: "80+", label: "Design Modules" },
                                { icon: Users, value: "5K+", label: "Engineers" },
                                { icon: Trophy, value: "90%", label: "Offer Rate" },
                                { icon: Zap, value: "6", label: "Tracks" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center group cursor-default">
                                    <div className="p-3 rounded-xl bg-primary/5 w-fit mx-auto mb-3 group-hover:bg-primary/15 transition-all border border-primary/10">
                                        <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                    </div>
                                    <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-1">{stat.value}</div>
                                    <div className="text-xs md:text-sm text-muted-foreground font-semibold">{stat.label}</div>
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
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                            Interview Tracks
                        </Badge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
                            Master Every Interview Type
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
                            From Low Level Design to ML System Design — comprehensive prep tracks
                            designed by engineers who&apos;ve cracked FAANG interviews.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16">
                        <Link href="/learn">
                            <Button size="lg" className="h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl">
                                View All Courses
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-16 md:py-20 border-t border-border/50">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-muted-foreground font-medium mb-8">
                            Trusted by engineers at
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-2xl md:text-3xl font-bold text-muted-foreground/40">
                            <span>Google</span>
                            <span>Meta</span>
                            <span>Amazon</span>
                            <span>Netflix</span>
                            <span>Apple</span>
                            <span>Microsoft</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

