"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CourseIcon } from "@/components/course-icon";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn] = useState(false); // Will be connected to auth later

    // Placeholder data for dropdown - centralized source of truth ideally in data.ts
    const courseItems = [
        { title: "Low Level Design", href: "/learn/low-level-design", icon: "Code2", comingSoon: false },
        { title: "System Design Fundamentals", href: "/learn/system-design-fundamentals", icon: "Globe", comingSoon: false },
        { title: "System Design Interviews", href: "/learn/system-design-interviews", icon: "AppWindow", comingSoon: false },
        { title: "ML System Design", href: "/learn/ml-system-design", icon: "Bot", comingSoon: false },
        { title: "MLOps & LLMOps", href: "/learn/mlops-production", icon: "Cpu", comingSoon: false },
        { title: "AI Native Design", href: "/learn/ai-native-design", icon: "BrainCircuit", comingSoon: false },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 md:px-8">

                {/* Left Section: Logo & Nav */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-lg font-bold text-foreground tracking-tight">
                                Systems<span className="text-primary">Mastery</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-foreground/70 hover:text-foreground hover:bg-muted/50 font-medium gap-1 text-sm h-9 transition-all">
                                    Courses <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 bg-popover/95 backdrop-blur-xl border-border/50 p-2 shadow-xl">
                                {courseItems.map((item) => (
                                    <DropdownMenuItem key={item.title} asChild disabled={item.comingSoon}>
                                        <Link
                                            href={item.comingSoon ? "#" : item.href}
                                            className={`flex items-center gap-3 cursor-pointer py-2 ${item.comingSoon ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            <CourseIcon name={item.icon} className="h-4 w-4 text-primary" />
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.title}</span>
                                                {item.comingSoon && (
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Coming Soon</span>
                                                )}
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>

                {/* Right Section: Search & Actions */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                        <Input
                            placeholder="Search courses..."
                            className="w-56 h-9 pl-9 pr-16 bg-muted/50 border-border/40 focus:border-primary/50 text-sm placeholder:text-muted-foreground/50 transition-all focus:w-64"
                        />
                        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/60 bg-background/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground/70">
                            ⌘K
                        </kbd>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Premium Button */}
                        <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 font-semibold text-sm h-9 shadow-sm transition-all">
                            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                            Premium
                        </Button>

                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <Avatar className="h-9 w-9 border border-border">
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">HJ</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-popover border-border" align="end">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-border" />
                                    <DropdownMenuItem className="text-red-500 focus:text-red-500">Log out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <ModeToggle />
                                <Link href="/login">
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-sm h-9 text-sm transition-all hover:shadow-md">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background">
                    <nav className="container mx-auto px-6 py-4 space-y-4">
                        <div className="font-semibold text-sm text-muted-foreground px-2 mb-2">Courses</div>
                        {courseItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.comingSoon ? "#" : item.href}
                                className={`flex items-center gap-3 p-2 rounded-md hover:bg-muted ${item.comingSoon ? 'opacity-60 pointer-events-none' : ''}`}
                            >
                                <CourseIcon name={item.icon} className="h-5 w-5 text-primary" />
                                <div>
                                    <div className="font-medium text-foreground">{item.title}</div>
                                    {item.comingSoon && <div className="text-xs text-muted-foreground">Coming Soon</div>}
                                </div>
                            </Link>
                        ))}

                        <div className="pt-4 border-t border-border space-y-3 px-2">
                            <Button variant="outline" className="w-full justify-start border-primary text-primary">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Get Premium
                            </Button>
                            <Link href="/login" className="block">
                                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
