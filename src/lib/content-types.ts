/**
 * Content type definitions for Notion CMS integration
 * These types match Notion's block structure and can be easily mapped
 * when integrating with Notion API later.
 */

export type ContentBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "image"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "quote"
  | "code"
  | "callout" // For tips, annotations
  | "toggle" // For accordions
  | "divider";

export interface TextContent {
  type: "text";
  text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    color?: string;
  };
}

export interface RichText {
  type: "text" | "mention" | "equation";
  text?: {
    content: string;
    link?: {
      url: string;
    };
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content?: RichText[];
  children?: ContentBlock[];
}

export interface ParagraphBlock extends ContentBlock {
  type: "paragraph";
  content: RichText[];
}

export interface HeadingBlock extends ContentBlock {
  type: "heading_1" | "heading_2" | "heading_3";
  content: RichText[];
}

export interface ImageBlock extends ContentBlock {
  type: "image";
  image: {
    type: "external" | "file";
    external?: {
      url: string;
    };
    file?: {
      url: string;
      expiry_time?: string;
    };
    caption?: RichText[];
  };
}

export interface CalloutBlock extends ContentBlock {
  type: "callout";
  callout: {
    icon?: {
      emoji?: string;
      type?: string;
    };
    color?: string;
    content: RichText[];
  };
}

export interface TipBlock extends CalloutBlock {
  tipType?: "interview" | "general" | "warning" | "info";
  title?: string;
}

export interface ComparisonCardBlock extends ContentBlock {
  type: "callout";
  comparisonType: "bad" | "good" | "best";
  title?: string;
  content: RichText[];
}

export interface AnnotationBlock extends ContentBlock {
  type: "callout";
  annotationType: "note" | "important" | "example";
  content: RichText[];
}

/**
 * Full content structure that can be rendered
 * This structure can be populated from:
 * 1. Hardcoded markdown (current)
 * 2. Notion API (future)
 * 3. Other CMS (future)
 */
export interface ChapterContent {
  id: string;
  title: string;
  blocks: ContentBlock[];
  metadata?: {
    readTime?: number;
    lastUpdated?: string;
    author?: string;
  };
}

/**
 * Helper function to convert markdown-like structure to ContentBlock[]
 * This makes it easy to transition from hardcoded content to Notion
 */
export function createContentBlock(
  type: ContentBlockType,
  content: string | RichText[],
  options?: Record<string, any>
): ContentBlock {
  const baseBlock: ContentBlock = {
    id: `block-${Date.now()}-${Math.random()}`,
    type,
  };

  if (typeof content === "string") {
    return {
      ...baseBlock,
      content: [
        {
          type: "text",
          text: { content },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: content,
        },
      ],
      ...options,
    };
  }

  return {
    ...baseBlock,
    content,
    ...options,
  };
}
