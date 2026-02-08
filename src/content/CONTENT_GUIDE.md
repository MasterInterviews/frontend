# Content Creation Guide

All article content is stored in `src/content/[course-slug]/[chapter-slug].md`.

## 1. Directory Structure
```
src/content/
  ├── lld/                      # Course Slug
  │   ├── classes-and-objects.md # Chapter Slug
  │   └── ...
  └── other-course/
      └── ...
```

## 2. Frontmatter Metadata
Each Markdown file must start with YAML frontmatter to populate the `ArticleHeader` and other page metadata.

```yaml
---
title: "Dealing with Contention"
description: "Learn how to handle concurrent access in distributed systems."
difficulty: "hard"  # easy | medium | hard
tags:
  - label: "Distributed Systems"
    icon: "zap"
  - label: "Database"
    icon: "book"
companies:
  - name: "Meta"
    fallback: "M"
  - name: "Google"
    fallback: "G"
author: "Evan King"
publishedDate: "Jul 25, 2024"
---
```

### Supported Icons
- `lock`: <Lock />
- `book`: <Book />
- `zap`: <Zap />

## 3. Using Custom Components

### Callouts / Tips
Use the `:::tip` directive.

```markdown
:::tip{type="success"}
This is a success tip! It shows a green box.
:::

:::tip{type="danger"}
This is a warning! It shows a red box.
:::

:::tip{type="info" title="Did you know?"}
This is an informational note with a custom title.
:::
```

### Solution Comparisons
Use the `:::solutioncard` directive.

```markdown
:::solutioncard{type="bad" title="Bad Solution: Pessimistic Locking"}
This approach uses database locks...
:::

:::solutioncard{type="good" title="Good Solution: Optimistic Locking"}
This approach uses version numbers...
:::

:::solutioncard{type="best" title="Great Solution: Distributed Lock"}
This approach uses Redis...
:::
```

### Pattern Cards
Use the `:::patterncard` directive.

```markdown
:::patterncard{title="Title" description="Desc"}
Content
:::
```
