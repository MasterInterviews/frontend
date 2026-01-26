# Content Guide for Notion Integration

This guide shows how to structure content that will be easy to migrate to Notion CMS later.

## Markdown Directives

### Tips (Interview Tips, General Tips, Warnings, Info)

Tips use a full-height left border with an icon aligned to the border:

```markdown
:::tip type="interview"
One of the most common mistakes is jumping straight into the problem without taking time to clarify the scope and constraints. Always ask targeted questions to truly understand the problem before moving forward.
:::

:::tip type="general"
Use caching strategically to reduce database load and improve response times.
:::

:::tip type="warning"
Avoid premature optimization. Measure first, then optimize based on actual bottlenecks.
:::

:::tip type="info"
This is an informational note with additional context.
:::
```

**Visual Design:**
- **Interview/General Tips**: Light green background (#e7f0fa), dark green left border, lightbulb icon
- **Info**: Light blue background, blue left border, info "i" icon
- **Warning**: Light amber background, amber left border, alert icon
- Full-height left border (4px) for emphasis
- Icon positioned on the left, aligned with border
- Rounded corners on the right side only

### Annotations (Notes, Important, Examples, Info)

Annotations provide supplementary information with distinct visual styling:

```markdown
:::annotation type="note"
This is a general note about the concept with additional context.
:::

:::annotation type="important"
This is critical information that should not be overlooked during implementation.
:::

:::annotation type="example"
Here's a practical example demonstrating how this concept works in practice.
:::

:::annotation type="info"
Additional informational context that complements the main content.
:::
```

**Visual Design:**
- **Note**: Light slate background, slate left border, file icon
- **Important**: Light amber background, amber left border, alert icon
- **Example/Info**: Light blue background, blue left border, book/info icon
- Full-height left border (4px)
- Icon aligned with border on the left

### Comparison Cards (Bad, Good, Best Practices)

These are collapsible accordion-style cards with colored left borders:

```markdown
:::solutioncard type="bad" title="Bad Solution: Database Polling"
This approach introduces latency and doesn't meet immediate notification requirements.
:::

:::solutioncard type="good" title="Good Solution: Transactions"
Using database transactions ensures consistency and immediate updates.
:::

:::solutioncard type="best" title="Great Solution: Redis for Atomic Operations"
Using Redis provides atomic operations with better performance and scalability.
:::
```

**Visual Design:**
- **Bad**: Light salmon/pink background with red left border, warning icon
- **Good**: Light green background with green left border, checkmark icon
- **Best/Great**: Light green background with green left border, sparkles icon
- All cards are collapsible accordions
- Full-height left border (4px) for visual emphasis

### Images with Captions

```markdown
![System Architecture Diagram](https://example.com/architecture.png)

Or with explicit caption:

![System Architecture](https://example.com/architecture.png "High-level system architecture showing microservices")
```

### Standard Markdown

All standard markdown is supported:
- Headings (H1-H6)
- Paragraphs
- Lists (ordered and unordered)
- Code blocks
- Blockquotes
- Links

## Content Structure for Notion

When migrating to Notion, the content types map as follows:

- **Paragraphs** → Notion Paragraph blocks
- **Headings** → Notion Heading blocks (heading_1, heading_2, heading_3)
- **Images** → Notion Image blocks with captions
- **Tips** → Notion Callout blocks with specific icons
- **Annotations** → Notion Callout blocks with different styling
- **Comparison Cards** → Notion Callout blocks with custom properties
- **Code blocks** → Notion Code blocks

## Example Full Chapter

```markdown
# System Design Fundamentals

## Introduction

System design is a critical skill for senior engineers. This chapter covers the fundamentals.

:::tip type="interview" title="Interview Tip"
In system design interviews, always start by clarifying requirements. Ask about:
- Scale (users, requests per second)
- Consistency requirements
- Availability requirements
- Geographic distribution
:::

## Architecture Patterns

### Monolithic Architecture

A monolithic architecture is a single, unified application.

:::solutioncard type="bad" title="Monolithic Anti-Pattern"
Putting all functionality in a single codebase without proper modularization leads to:
- Difficult deployments
- Scaling challenges
- Technology lock-in
:::

:::solutioncard type="good" title="Modular Monolith"
A well-structured monolithic application with clear module boundaries can work well for:
- Small to medium teams
- Rapid iteration
- Simpler deployment
:::

:::solutioncard type="best" title="Microservices Architecture"
For large-scale systems, microservices provide:
- Independent scaling
- Technology diversity
- Team autonomy
:::

![Microservices Architecture](https://example.com/microservices.png "Microservices architecture diagram")

:::annotation type="important"
When designing microservices, ensure proper service boundaries and avoid distributed transactions when possible.
:::

## Conclusion

Understanding these patterns helps in making informed architectural decisions.
```

## Migration Path to Notion

1. **Current**: Content stored as markdown files in `src/content/`
2. **Future**: Content fetched from Notion API using the types defined in `src/lib/content-types.ts`
3. **Mapping**: The `ContentBlock` interface matches Notion's block structure

The component structure is already set up to handle both markdown and Notion content seamlessly.
