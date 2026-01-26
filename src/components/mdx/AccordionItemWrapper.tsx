"use client";

/**
 * Wrapper component for accordion items that can be identified
 * and properly rendered inside Accordion context by AccordionWrapper
 */
export function AccordionItemWrapper(props: any) {
    // Props are stored in child.props and will be extracted by AccordionWrapper
    // Return null - AccordionWrapper will handle rendering
    return null;
}

AccordionItemWrapper.displayName = 'AccordionItemWrapper';

// Helper to check if a component is an AccordionItemWrapper
export function isAccordionItemWrapper(child: any): boolean {
    if (!child || typeof child !== 'object') return false;
    
    if (!isValidElement(child)) return false;
    
    // Check by displayName (for the component type)
    if (typeof child.type === 'function' && child.type.displayName === 'AccordionItemWrapper') {
        return true;
    }
    
    // Check if it's a component with stored item props
    if (typeof child.type === 'function' && (child.type as any).__itemProps) {
        return true;
    }
    
    // Check if it's a div marker element
    if (child.type === 'div' && child.props?.['data-accordion-item-wrapper']) {
        return true;
    }
    
    return false;
}

// Helper to check if element is valid React element
function isValidElement(element: any): boolean {
    return element != null && typeof element === 'object' && 'type' in element && 'props' in element;
}
