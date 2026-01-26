"use client";

import { createContext, useContext, ReactNode } from "react";
import { AccordionItem } from "./Accordion";

interface AccordionContextType {
    addItem: (props: any) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export function useAccordionContext() {
    return useContext(AccordionContext);
}

export function AccordionContextProvider({ 
    children, 
    onItemAdd 
}: { 
    children: ReactNode; 
    onItemAdd: (item: ReactNode) => void;
}) {
    const addItem = (props: any) => {
        onItemAdd(<AccordionItem {...props} />);
    };

    return (
        <AccordionContext.Provider value={{ addItem }}>
            {children}
        </AccordionContext.Provider>
    );
}
