"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface ScrollableMainProps {
    children: React.ReactNode;
    className?: string;
}

export function ScrollableMain({ children, className }: ScrollableMainProps) {
    const ref = useRef<HTMLElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        ref.current?.scrollTo({ top: 0 });
    }, [pathname]);

    return (
        <main ref={ref} className={className}>
            {children}
        </main>
    );
}
