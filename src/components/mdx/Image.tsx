"use client";

import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ContentImageProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
}

export function ContentImage({ 
    src, 
    alt, 
    caption, 
    width, 
    height, 
    className = "",
    priority = false 
}: ContentImageProps) {
    // Check if it's an external URL or local path
    const isExternal = src.startsWith("http://") || src.startsWith("https://");
    
    return (
        <figure className={cn("my-6", className)}>
            <div className="w-full overflow-hidden border border-border">
                {isExternal ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="w-full h-auto"
                        loading={priority ? "eager" : "lazy"}
                    />
                ) : (
                    <NextImage
                        src={src}
                        alt={alt}
                        width={width || 1200}
                        height={height || 675}
                        className="w-full h-auto"
                        priority={priority}
                    />
                )}
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
