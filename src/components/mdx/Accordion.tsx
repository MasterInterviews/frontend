"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

// Create a wrapper component that can be rendered outside Accordion context
// and will be collected by AccordionWrapper
const AccordionItemPlaceholder = ({ title, value, content, children, ...props }: any) => {
    // This is a placeholder that will be replaced by AccordionWrapper
    // Return null to avoid rendering errors, the wrapper will handle it
    return null;
};

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & { title?: string; content?: string; isAccordionItem?: boolean }
>(({ className, title, value, content, children, isAccordionItem, ...props }, ref) => {
    // Filter out isAccordionItem prop to prevent it from reaching the DOM
    // If used as a wrapper (standard usage), render standard primitive
    if (children) {
        return (
            <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border", className)} value={value || title || "item-1"} {...props}>
                <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-3 text-sm hover:text-foreground [&[data-state=open]>svg]:rotate-180">
                        {title}
                        <ChevronDown className="h-4 w-4 shrink-0" />
                    </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden text-sm data-[data-state=closed]:animate-accordion-up data-[data-state=open]:animate-accordion-down">
                    <div className="pb-3 pt-1">{children}</div>
                </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
        )
    }

    // Direct usage from Regex parser (self-closing props)
    return (
        <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border", className)} value={value || title || "item-1"} {...props}>
            <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-3 text-sm hover:text-foreground [&[data-state=open]>svg]:rotate-180">
                    {title}
                    <ChevronDown className="h-4 w-4 shrink-0" />
                </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden text-sm data-[data-state=closed]:animate-accordion-up data-[data-state=open]:animate-accordion-down">
                <div className="pb-3 pt-1 text-foreground">{content}</div>
            </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
    );
});
AccordionItem.displayName = "AccordionItem";

// Legacy export if needed, or re-export of Trigger/Content if using sub-components
const AccordionTrigger = AccordionPrimitive.Trigger
const AccordionContent = AccordionPrimitive.Content

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
