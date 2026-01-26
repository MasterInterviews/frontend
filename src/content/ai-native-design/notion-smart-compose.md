# Case Study: Notion Smart Compose

Enhancing the writing experience with AI-native interactions.

:::tip{title="Key Takeaway"}
Latency is the killer feature. For autocomplete to feel natural, p99 latency must be under 100ms. This drives every architectural decision.
:::

## Core Features

- **Context-aware completion**: Uses the text before and after the cursor.
- **Style matching**: Adopts the user's tone.
- **Block-aware**: Understands it's inside a heading, list, or code block.

:::accordion
:::item{value="item-1" title="How does context extraction work?"}
Notion chunks the document into blocks. When a user requests completion, the system sends the previous N blocks and next M blocks to the model, rather than the raw text buffer. This preserves semantic meaning.
:::
:::item{value="item-2" title="Why not just use ChatGPT UI?"}
A chat interface breaks the flow state. Smart Compose is ghost completion — it suggests text inline, allowing users to accept with Tab or ignore by continuing to type.
:::
:::

## Architectural Patterns Used

<SolutionCard type="bad" content="Sending the entire document (tens of thousands of tokens) to the model for every keystroke." />

<SolutionCard type="good" content="Using a sliding window of nearby blocks to limit context size while preserving relevance." />

<SolutionCard type="best" content="Combining sliding window context with a small, fast draft model for initial suggestions, then verifying with a larger model only when needed." />

<PatternCard title="Speculative Decoding" description="Running a smaller draft model to generate tokens, verified by a larger model." href="/learn/ai-native-design/speculative-decoding" tags="Latency, Cost" summary="This technique reduces latency by 2-3x for the same model quality. Ideal for real-time typing assistance." />
