"use client";

import { Accordion, AccordionItem } from "./Accordion";
import { AccordionItemWrapper, isAccordionItemWrapper } from "./AccordionItemWrapper";
import { ReactNode, Children, isValidElement } from "react";

interface AccordionWrapperProps {
    children: ReactNode;
    className?: string;
}

/**
 * Wrapper component that ensures AccordionItem children are properly wrapped
 * This handles the case where markdown parsing might not preserve context
 */
export function AccordionWrapper({ children, className = "" }: AccordionWrapperProps) {
    // Convert children to array
    const childrenArray = Array.isArray(children) ? children : [children];
    const flatChildren = Children.toArray(childrenArray);

    // Process children to find accordion items
    const items: ReactNode[] = [];

    flatChildren.forEach((child, index) => {
        if (!isValidElement(child)) return;

        // Check if it's an AccordionItemWrapper - get props from component
        if (isAccordionItemWrapper(child)) {
            let itemProps: any = {};

            // Try to get props from component function
            if (typeof child.type === 'function') {
                itemProps = (child.type as any).__itemProps || child.props || {};
            } else {
                itemProps = child.props || {};
            }

            const { isAccordionItem, ...cleanProps } = itemProps;
            // Only add if we have valid props
            if (cleanProps.title || cleanProps.value || cleanProps.content) {
                items.push(<AccordionItem key={cleanProps.value || cleanProps.title || `item-${index}`} {...cleanProps} />);
            }
            return;
        }

        // Check if it's already an AccordionItem
        const type = child.type;
        const props = child.props || ({} as any);
        const isItem = (
            type === AccordionItem ||
            (typeof type === 'function' && 'displayName' in type && type.displayName === 'AccordionItem') ||
            props.isAccordionItem === true ||
            (props.title && (props.value !== undefined || props.title))
        );

        if (isItem) {
            items.push(child);
        }
    });

    // Always wrap in Accordion context
    return (
        <Accordion type="single" collapsible className={`w-full my-4 ${className}`}>
            {items.length > 0 ? items : flatChildren}
        </Accordion>
    );
}
