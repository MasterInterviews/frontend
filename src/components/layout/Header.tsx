"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CourseIcon } from "@/components/course-icon";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn] = useState(false); // Will be connected to auth later

    const courseItems = [
        { title: "Gen AI Native Design", href: "/learn/gen-ai-native-design", icon: "BrainCircuit" },
        { title: "System Design Fundamentals", href: "/learn/system-design-fundamentals", icon: "Globe" },
        { title: "System Design", href: "/learn/system-design-interviews", icon: "AppWindow" },
        { title: "ML Platform Design", href: "/learn/ml-platform-design", icon: "Cpu" },
        { title: "Low Level Design", href: "/learn/low-level-design", icon: "Code2" },
        { title: "Behavioral", href: "/learn/behavioral-interviews", icon: "Users" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 md:px-8">

                {/* Left Section: Logo & Nav */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                                <span className="text-[var(--primary)]">Interview</span><span className="text-[var(--gold)]">Notes</span>
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
                            <DropdownMenuContent className="w-72 bg-popover border-border p-2">
                                {courseItems.map((item) => (
                                    <DropdownMenuItem key={item.title} asChild>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 cursor-pointer py-2"
                                        >
                                            <CourseIcon name={item.icon} className="h-4 w-4 text-primary" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="/#pricing">
                            <Button variant="ghost" className="text-foreground/70 hover:text-foreground hover:bg-muted/50 font-medium text-sm h-9 transition-all">
                                Pricing
                            </Button>
                        </Link>
                        <Link href="/#faq">
                            <Button variant="ghost" className="text-foreground/70 hover:text-foreground hover:bg-muted/50 font-medium text-sm h-9 transition-all">
                                FAQ
                            </Button>
                        </Link>
                    </nav>
                </div>

                {/* Right Section: Actions */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        {/* Premium Button */}
                        <Link href="/#pricing">
                            <Button variant="outline" className="border-[var(--gold)]/50 text-[var(--gold-hover)] hover:bg-[var(--gold)]/10 text-sm h-8 font-semibold">
                                Premium
                            </Button>
                        </Link>

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
                                    <Button className="bg-foreground text-background hover:bg-foreground/90 h-8 text-sm">
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
                                href={item.href}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <CourseIcon name={item.icon} className="h-5 w-5 text-primary" />
                                <div className="font-medium text-foreground">{item.title}</div>
                            </Link>
                        ))}

                        <div className="pt-4 border-t border-border space-y-3 px-2">
                            <Link href="/#pricing" className="block" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start text-foreground">
                                    Pricing
                                </Button>
                            </Link>
                            <Link href="/#faq" className="block" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start text-foreground">
                                    FAQ
                                </Button>
                            </Link>
                            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full justify-start border-primary text-primary">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Get Premium
                                </Button>
                            </Link>
                            <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
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
