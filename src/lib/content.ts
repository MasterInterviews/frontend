export const chapterContents: Record<string, string> = {
   // ML System Design - Introduction
   "ml-system-design/introduction": `
# Introduction to ML System Design

Machine Learning System Design is the wild west of interviews: the field is new and growing rapidly, yet consistency amongst companies and interviewers is low. This makes it frustratingly difficult to be ready for your interview and leads to a lot of anxiety amongst candidates.

## What is ML System Design?

ML System Design interviews evaluate your ability to design end-to-end machine learning systems that solve real-world problems. Unlike coding interviews where there's often one correct answer, system design is about demonstrating your thought process and trade-off analysis.

## Why Do Companies Conduct ML System Design Interviews?

Companies need engineers who can:

- **Think holistically** about ML problems, from data collection to model serving
- **Make practical trade-offs** between accuracy, latency, and cost
- **Design scalable systems** that work in production, not just notebooks
- **Communicate effectively** about complex technical decisions

## What Do Interviewers Look For?

Interviewers evaluate candidates on several dimensions:

### 1. Problem Understanding
- Can you clarify ambiguous requirements?
- Do you ask the right questions upfront?

### 2. System Thinking
- How do you break down a complex problem?
- Can you identify the key components?

### 3. ML Knowledge
- Do you understand different model architectures?
- Can you choose appropriate algorithms?

### 4. Production Awareness
- How do you handle data at scale?
- What about monitoring and iteration?

## The ML System Design Framework

We recommend following this structured approach:

1. **Clarify Requirements** (5 min)
   - Functional requirements
   - Non-functional requirements (latency, scale)
   - Success metrics

2. **High-Level Design** (10 min)
   - Data pipeline
   - Feature engineering
   - Model architecture

3. **Deep Dive** (20 min)
   - Training pipeline
   - Serving infrastructure
   - Monitoring & iteration

4. **Trade-offs & Extensions** (5 min)
   - Alternative approaches
   - Future improvements

## Next Steps

In the following chapters, we'll dive deep into specific ML system design problems. Each chapter follows a consistent structure:

- Problem definition
- Requirements gathering
- Solution design
- Implementation considerations
- Common pitfalls

Ready to master ML System Design? Let's begin! 🚀
`,

   // GenAI System Design - Introduction
   "genai-system-design/introduction": `
# Introduction to GenAI Systems

Generative AI has transformed how we build intelligent applications. From ChatGPT to GitHub Copilot, these systems demonstrate the power of large language models (LLMs) in solving complex problems.

## The GenAI Revolution

In 2022, ChatGPT captured the world's imagination and kicked off the GenAI revolution. Since then, we've seen:

- **LLMs become mainstream** - GPT-4, Claude, Gemini, Llama
- **New application paradigms** - RAG, agents, tool use
- **Enterprise adoption** - Every company wants AI features

## Why Learn GenAI System Design?

As an ML engineer or software engineer, understanding GenAI systems is now essential:

1. **High demand** - Companies are racing to add AI features
2. **Unique challenges** - LLMs require different design patterns
3. **Rapid evolution** - New techniques emerge weekly

## Key Concepts

### Large Language Models (LLMs)
Pre-trained models that understand and generate text. They form the foundation of most GenAI systems.

### Retrieval-Augmented Generation (RAG)
Combine LLMs with external knowledge bases for more accurate, up-to-date responses.

### Prompt Engineering
The art and science of crafting inputs that get the best outputs from LLMs.

### AI Agents
Systems that can plan, reason, and take actions using LLMs as the "brain."

## What You'll Learn

This course covers:

| Topic | Description |
|-------|-------------|
| RAG Systems | Build document Q&A systems |
| Chatbots | Production chat applications |
| Code Assistants | AI-powered development tools |
| Agents | Autonomous AI systems |
| Infrastructure | Serving LLMs at scale |

## Prerequisites

You should be familiar with:
- Basic ML concepts
- Python programming
- REST APIs and web services

No prior LLM experience required - we'll cover everything from the ground up!

Let's build the future of AI together! ✨
`,

   // Distributed Systems - Introduction
   "distributed-systems/introduction": `
# Introduction to Distributed Systems

A distributed system is a collection of independent computers that appears to users as a single coherent system. In today's world, almost every large-scale application is distributed.

## Why Distributed Systems?

Modern applications need to:

- **Scale horizontally** - Handle millions of users
- **Stay available** - 99.99% uptime expectations
- **Perform globally** - Low latency worldwide
- **Process big data** - Petabytes of information

No single machine can meet these demands. We need distributed systems.

## Core Concepts

### 1. Scalability
The ability to handle growing amounts of work by adding resources.

- **Vertical scaling**: Bigger machines
- **Horizontal scaling**: More machines

### 2. Reliability
The system continues to work correctly even when things fail.

- **Fault tolerance**: Handle component failures
- **Redundancy**: Multiple copies of data

### 3. Consistency
All nodes see the same data at the same time.

- **Strong consistency**: Always current
- **Eventual consistency**: Eventually current

## The CAP Theorem

You can only have 2 of 3:

\`\`\`
    Consistency
       /\\
      /  \\
     /    \\
    /      \\
   /________\\
Availability  Partition
              Tolerance
\`\`\`

In practice, **Partition Tolerance is mandatory** (networks fail), so you choose between:
- **CP systems**: Consistent but may be unavailable (banks)
- **AP systems**: Available but may be stale (social media)

## Key Challenges

| Challenge | Description |
|-----------|-------------|
| Network partitions | Nodes can't communicate |
| Clock synchronization | No global time |
| Byzantine failures | Nodes can lie |
| Data replication | Keeping copies in sync |

## What You'll Learn

This course covers classic distributed systems problems:

1. **Design patterns** - Sharding, replication, consensus
2. **Interview questions** - URL shortener, rate limiter, cache
3. **Real systems** - How Google, Netflix, and others solve these problems

## The Interview Perspective

System design interviews test your ability to:

- Break down complex problems
- Make and justify trade-offs
- Communicate technical concepts
- Design for real-world constraints

Let's build systems that scale! 🌐
`,

   // LLD - OOP & Fundamentals
   "low-level-design/uml-diagrams": `
# UML Diagrams

Unified Modeling Language (UML) is the standard way to visualize system design.

## Key Diagrams
1. **Class Diagrams**: Static structure of classes and relationships.
2. **Sequence Diagrams**: Dynamic interaction between objects over time.
3. **Use Case Diagrams**: Functional requirements and actor interactions.
`,

   "low-level-design/clean-code-dry": `
# Clean Code Principles

Writing code that is easy to understand, maintain, and extend.

## Core Concepts
- **DRY (Don't Repeat Yourself)**: Reduce repetition.
- **KISS (Keep It Simple, Stupid)**: Avoid unnecessary complexity.
- **YAGNI (You Aren't Gonna Need It)**: Don't build for hypothetical futures.
`,

   // LLD - Concurrency
   "low-level-design/concurrency-basics": `
# Concurrency & Multithreading

Understanding how to handle multiple tasks simultaneously is crucial for high-performance systems.

## Topics
- **Process vs Thread**
- **Synchronization**: Locks, Semaphores, Monitors.
- **Deadlocks**: Prevention and Avoidance.
`,

   "low-level-design/producer-consumer": `
# Producer-Consumer Pattern

A classic concurrency pattern used to decouple data production from consumption.

## Implementation
We will implement a thread-safe Blocking Queue using:
- Mutex / Locks
- Condition Variables
`,

   // LLD - Machine Coding
   "low-level-design/design-vending-machine": `
# Design a Vending Machine

A classic State Pattern problem.

## Requirements
- Support multiple products with different prices.
- Accept coins and notes (Cash, Card).
- Dispense product and return change.
- Handle "Out of Stock" and "Insufficient Funds".
`,

   "low-level-design/design-elevator-system": `
# Design an Elevator System

Design a smart elevator control system for a high-rise building.

## Challenges
- Scheduling algorithm (FCFS, SSTF, SCAN/LOOK).
- Handling emergency states.
- Optimizing for wait time vs power consumption.
`,

   "low-level-design/design-atm": `
# Design an ATM

Design the software for an Automated Teller Machine.

## Key Aspects
- **Authentication**: Card + PIN.
- **Transaction**: Withdrawing cash, balance inquiry.
- **Hardware Interaction**: Cash dispenser, card reader.
- **State Management**: Idle, Authenticating, Transacting.
`,

   "low-level-design/design-snake-ladder": `
# Design Snake & Ladder

Design a flexible, extensible board game engine.

## Focus Areas
- **Extensibility**: Layout of board, rules of movement.
- **Entities**: Player, Board, Dice, Cell (Snake, Ladder, Normal).
- **Game Loop**: Turn management.
`,

   "low-level-design/design-cricinfo": `
# Design Cricinfo

Design a cricket score management and broadcasting system.

## Requirements
- Live score updates.
- Ball-by-ball commentary.
- Player and Team statistics.
- Handling frequent reads (millions of users) vs writes (1 ball every minute).
`,

   "low-level-design/design-library-management": `
# Design Library Management System

Manage books, members, and lending operations.

## Features
- Search books (Title, Author, Genre).
- Borrow and Return books.
- Calculate fines.
- Reserve books.
`,

   "low-level-design/design-lru-cache": `
# Design LRU Cache

Implement a Least Recently Used (LRU) Cache.

## Constraints
- \`get(key)\` in O(1).
- \`put(key, value)\` in O(1).

## Solution
- Combination of **HashMap** (for O(1) access) and **Doubly Linked List** (for O(1) ordering).
`,

   "low-level-design/design-logger": `
# Design a Logging Framework

Design a library similar to Log4j or Python's logging module.

## Features
- Log Levels (INFO, DEBUG, ERROR).
- Appenders (Console, File, Database).
- Layout/Formatting.
`,
   // System Design - Fintech
   "system-design-interviews/design-payment-system": `
# Design a Payment System

Design a robust, consistent global payment processing system (like Stripe/PayPal).

## Key Requirements
- **Reliability**: 99.999% availability.
- **Consistency**: Zero data loss, exact-once processing.
- **Idempotency**: Handling duplicate requests.
- **Reconciliation**: Double-entry bookkeeping.
`,

   "system-design-interviews/design-digital-wallet": `
# Design a Digital Wallet

Design a wallet system for storing money and making transfers (like Paytm/Venmo).

## Concepts
- **ACID Transactions**: Ensuring balance integrity.
- **Two-Phase Commit**: Distributed transactions.
- **Ledger System**: Immutable audit logs.
`,

   "system-design-interviews/design-stock-exchange": `
# Design a Stock Exchange

Design a low-latency trading platform like NASDAQ or Robinhood.

## Challenges
- **Matching Engine**: Order book matching algorithms.
- **Low Latency**: Microsecond execution.
- **High Throughput**: Supporting millions of trades/sec.
`,

   // System Design - Real-time Analytics
   "system-design-interviews/design-ad-click-aggregation": `
# Design Ad Click Aggregation

Design a system to track and aggregate ad clicks/impressions in real-time.

## Technologies
- **Stream Processing**: Kafka/Flink/Spark Streaming.
- **Windowing**: Tumbling vs Sliding windows.
- **Approximation**: HLL (HyperLogLog) for unique counts.
`,

   "system-design-interviews/design-realtime-leaderboard": `
# Design Real-time Gaming Leaderboard

Design a leaderboard for a multiplayer game (like Fortnite/PUBG).

## Solution Pattern
- **Redis Sorted Sets**: Using ZSET for O(log N) updates and retrieval.
- **Sharding**: Partitioning by score ranges or user ID.
`,

   "system-design-interviews/design-metrics-monitoring": `
# Design Metrics & Monitoring System

Design a system like Datadog/Prometheus to collect and visualize infrastructure metrics.

## Components
- **Time Series Database (TSDB)**: InfluxDB/Prometheus.
- **Push vs Pull**: Collection models.
- **Downsampling**: Handling historical data retention.
`,

   // Frontend System Design
   "frontend-system-design/rendering-patterns": `
# Rendering Patterns

Understanding when to use Client-Side, Server-Side, or Static rendering.

## Comparison
- **CSR (Client-Side Rendering)**: Interactive, SPA feel, slow initial load.
- **SSR (Server-Side Rendering)**: Good SEO, fast FCP, higher server load.
- **ISR (Incremental Static Regeneration)**: Best of both worlds?
- **Streaming SSR**: React 18 / Next.js features.
`,

   "frontend-system-design/state-management": `
# State Management

Managing data across complex component trees.

## Types of State
- **Server State**: React Query / SWR.
- **Global State**: Redux / Zustand / Context.
- **Form State**: React Hook Form.
- **URL State**: Query parameters as source of truth.
`,

   "frontend-system-design/performance-optimization": `
# Web Performance Optimization

Making apps fast and smooth.

## Metrics (User Centric)
- **LCP (Largest Contentful Paint)**
- **CLS (Cumulative Layout Shift)**
- **INP (Interaction to Next Paint)**

## Techniques
- Code Splitting (Lazy loading)
- Image Optimization
- Memoization
`,

   "frontend-system-design/networking-caching": `
# Networking & Caching

Optimizing data delivery.

## Layers
- **Browser Cache**: HTTP Cache-Control.
- **CDN**: Edge caching.
- **Service Workers**: Offline capabilities.
- **Protocol**: HTTP/2 vs HTTP/3.
`,

   "frontend-system-design/design-news-feed-frontend": `
# Design News Feed (Frontend)

Design the UI/UX implementation of a feed like Facebook/Twitter.

## Key Challenges
- **Virtualization**: Rendering long lists efficiently (Windowing).
- **Infinite Scroll**: Data fetching patterns.
- **Optimistic Updates**: Creating a snappy 'Like' experience.
- **Rich Media**: Handling videos and images.
`,

   "frontend-system-design/design-photo-gallery": `
# Design Photo Gallery

Design a high-performance image gallery like Pinterest/Google Photos.

## Topics
- **Layout**: Masonry Grid.
- **Image Optimization**: WebP/AVIF, adaptive quality.
- **Lazy Loading**: Intersection Observer.
- **Caching**: Aggressive caching strategies.
`,

   "frontend-system-design/design-google-docs": `
# Design Google Docs (Frontend)

Design a collaborative rich-text editor in the browser.

## Core Complexity
- **ContentEditable**: Handling the DOM.
- **Operational Transformation (OT) / CRDTs**: Client-side conflict resolution.
- **Selection & Cursor**: Rendering remote cursors.
- **Offline Mode**: Local storage sync.
`,

   "frontend-system-design/design-chat-messenger": `
# Design Messenger (Frontend)

Design the frontend for a real-time chat app.

## Features
- **Real-time**: WebSockets / SSE.
- **Message States**: Sending, Sent, Delivered, Read.
- **Ordering**: Handling out-of-order messages.
- **Media Uploads**: Optimistic UI.
`,

   "frontend-system-design/design-ecommerce-checkout": `
# Design Checkout Flow

Design a conversion-optimized checkout experience.

## Aspects
- **Multi-step forms**: State persistence.
- **Validation**: Instant feedback.
- **Payment Integration**: Stripe Elements / PayPal SDK.
- **Error Handling**: Graceful failure recovery.
`,

   "frontend-system-design/design-autocomplete": `
# Design Autocomplete (Frontend)

Design a robust typeahead/search component.

## Challenges
- **Debouncing**: Preventing excessive API calls.
- **Caching**: Storing recently used results.
- **Accessibility**: Keyboard navigation (ARIA).
- **Highlighting**: Matching substrings.
`,
   // Staff+ Engineering
   "staff-plus-design/organizational-impact": `
# Driving Organizational Impact

Staff engineers aren't just technical experts; they are force multipliers for the entire organization.

## Key Skills
- **RFCs & Design Docs**: Writing for consensus.
- **Strategic Alignment**: Ensuring tech debt matches business goals.
- **Sponsorship**: Growing the team through technical leadership.
`,

   "staff-plus-design/tackling-complexity": `
# Tackling Systemic Complexity

As systems grow, complexity becomes the primary bottleneck.

## Strategies
- **Decoupling**: Identifying appropriate boundaries.
- **Refactoring at Scale**: Multi-quarter migrations.
- **Simplification**: Choosing the boring technology when it matters.
`,

   "staff-plus-design/advanced-tradeoffs": `
# Advanced Technical Trade-offs

At the Staff level, there are no 'best' solutions, only trade-offs.

## Analysis Frameworks
- **Economic Impact**: TCO (Total Cost of Ownership).
- **Maintenance Burden**: The long-term cost of 'clever' code.
- **Build vs Buy**: When to use cloud primitives vs custom solutions.
`,

   "staff-plus-design/designing-for-reliability": `
# Designing for Reliability

Reliability is a feature, not an afterthought.

## Concepts
- **On-call Culture**: Setting up sustainable rotations.
- **Post-mortems**: Blameless culture and root cause analysis.
- **Error Budgets & SLOs**: Quantifying 'good enough'.
`,
   // Design Principles - Individual Chapters
   "low-level-design/dry-principle": `
# DRY (Don't Repeat Yourself)

"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."

## Key Concepts
- **Duplication is Evil**: Multiple sources of truth lead to inconsistencies.
- **Abstraction**: Encapsulate logic to avoid copy-pasting code.
- **Rule of Three**: Don't abstract too early; wait until you see the pattern three times.
`,
   "low-level-design/kiss-principle": `
# KISS (Keep It Simple, Stupid)

Systems work best if they are kept simple rather than made complicated.

## Key Concepts
- **Simplicity**: Easy to understand, debug, and maintain.
- **Avoid Over-engineering**: Don't add features "just in case".
- **Readability**: Code is read much more often than it is written.
`,
   "low-level-design/yagni-principle": `
# YAGNI & Law of Demeter

## YAGNI (You Aren't Gonna Need It)
- Don't implement functionality until it is necessary.
- Prevents bloat and wasted effort.

## Law of Demeter (Principle of Least Knowledge)
- A component should know only about its direct dependencies.
- "Don't talk to strangers": avoid chaining method calls (e.g., \`object.a.b.c()\`).
`,
   "low-level-design/solid-srp": `
# Single Responsibility Principle (SRP)

"A class should have only one reason to change."

## Explanation
- Each class should focus on a single task or functionality.
- **Benefits**: Easier testing, lower coupling, better organization.
- **Example**: A \`User\` class should handle user data, not database operations or email notifications.
`,
   "low-level-design/solid-ocp": `
# Open/Closed Principle (OCP)

"Software entities should be open for extension, but closed for modification."

## Explanation
- You should be able to add new functionality without changing existing code.
- **How**: Use interfaces, abstract classes, and polymorphism.
- **Benefit**: Reduces the risk of introducing bugs when adding features.
`,
   "low-level-design/solid-lsp": `
# Liskov Substitution Principle (LSP)

"Subtypes must be substitutable for their base types."

## Explanation
- If class B inherits from class A, you should be able to use B wherever A is used without breaking the program.
- **Violation**: When a subclass throws an exception for a method defined in the parent class.
`,
   "low-level-design/solid-isp": `
# Interface Segregation Principle (ISP)

"Clients should not be forced to depend upon interfaces that they do not use."

## Explanation
- Break large monolith interfaces into smaller, specific ones.
- **Benefit**: Implementing classes only need to define methods they actually use.
`,
   "low-level-design/solid-dip": `
# Dependency Inversion Principle (DIP)

"Depend upon abstractions, not concretions."

## Explanation
- High-level modules should not depend on low-level modules. Both should depend on abstractions.
- **In Practice**: Use Dependency Injection to pass dependencies (interfaces) rather than instantiating classes directly.
`,

   // Design Patterns - Creational
   "low-level-design/singleton-pattern": `
# Singleton Pattern

Ensures a class has only one instance and provides a global point of access to it.

## Use Cases
- Database connections
- Logger instances
- Configuration managers
`,
   "low-level-design/factory-method-pattern": `
# Factory Method Pattern

Defines an interface for creating an object, but lets subclasses decide which class to instantiate.

## Use Cases
- When a class doesn't know what sub-classes will be required to create.
- To delegate instantiation logic to subclasses.
`,
   "low-level-design/abstract-factory-pattern": `
# Abstract Factory Pattern

Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

## Use Cases
- UI libraries (Windows vs Mac widgets).
- Cross-platform file system operations.
`,
   "low-level-design/builder-pattern": `
# Builder Pattern

Separates the construction of a complex object from its representation.

## Use Cases
- Creating complex objects with many optional parameters.
- Immutable objects being constructed step-by-step.
`,
   "low-level-design/prototype-pattern": `
# Prototype Pattern

Creates new objects by copying an existing object (prototype).

## Use Cases
- When object creation is expensive (e.g., database calls).
- Cloning standard configurations.
`,

   // Design Patterns - Structural
   "low-level-design/adapter-pattern": `
# Adapter Pattern

Allows objects with incompatible interfaces to work together.

## Use Cases
- Integrating legacy code with new systems.
- 3rd party library integration.
`,
   "low-level-design/facade-pattern": `
# Facade Pattern

Provides a simplified interface to a library, a framework, or any other complex set of classes.

## Use Cases
- simplifying a complex API.
- Decoupling logic from external libraries.
`,
   "low-level-design/decorator-pattern": `
# Decorator Pattern

Attaches new responsibilities to an object dynamically.

## Use Cases
- Adding logging, caching, or encryption to streams.
- Extending functionality without inheritance explosion.
`,
   "low-level-design/composite-pattern": `
# Composite Pattern

Composes objects into tree structures to represent part-whole hierarchies.

## Use Cases
- File systems (Directories and Files).
- UI component trees.
`,
   "low-level-design/proxy-pattern": `
# Proxy Pattern

Provides a surrogate or placeholder for another object to control access to it.

## Use Cases
- Lazy loading (Virtual Proxy).
- Access control (Protection Proxy).
- Remote service calls (Remote Proxy).
`,
   "low-level-design/bridge-pattern": `
# Bridge Pattern

Decouples an abstraction from its implementation so that the two can vary independently.

## Use Cases
- Cross-platform graphics APIs.
- Device drivers.
`,
   "low-level-design/flyweight-pattern": `
# Flyweight Pattern

Use sharing to support large numbers of fine-grained objects efficiently.

## Use Cases
- Text editors (character glyphs).
- Particle systems in games.
`,

   // Design Patterns - Behavioral
   "low-level-design/strategy-pattern": `
# Strategy Pattern

Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

## Use Cases
- Payment methods (Credit Card, PayPal).
- Sorting algorithms.
`,
   "low-level-design/observer-pattern": `
# Observer Pattern

Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

## Use Cases
- Event handling systems.
- MVC architecture (View updates when Model changes).
`,
   "low-level-design/command-pattern": `
# Command Pattern

Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

## Use Cases
- GUI buttons and menu items.
- Transactional systems (Undo/Redo).
`,
   "low-level-design/state-pattern": `
# State Pattern

Allows an object to alter its behavior when its internal state changes.

## Use Cases
- Vending Machines.
- Order processing workflows.
- TCP Connection states.
`,
   "low-level-design/iterator-pattern": `
# Iterator Pattern

Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

## Use Cases
- Traversing collections (Lists, Trees, Graphs).
`,
   "low-level-design/template-method-pattern": `
# Template Method Pattern

Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.

## Use Cases
- Data parsing frameworks.
- Testing frameworks (setup, test, teardown).
`,
   "low-level-design/chain-of-responsibility-pattern": `
# Chain of Responsibility Pattern

Avoids coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.

## Use Cases
- Middleware in web frameworks (Express, Redux).
- Logging filters.
`,
   "low-level-design/mediator-pattern": `
# Mediator Pattern

Defines an object that encapsulates how a set of objects interact.

## Use Cases
- Chat room central server.
- Air traffic control.
- Form validation logic coordinating multiple fields.
`,
   "low-level-design/visitor-pattern": `
# Visitor Pattern

Represents an operation to be performed on the elements of an object structure.

## Use Cases
- Document object model (DOM) traversal.
- Compilers (AST traversal).
`,
   "low-level-design/memento-pattern": `
# Memento Pattern

Captures and externalizes an object's internal state so that the object can be restored to this state later.

## Use Cases
- Editor snapshots.
- Game save states.
`,
   // LLM Internals (Moved to AI Native Design)
   "ai-native-design/history-of-llms": `
# History: Transformers, Attention, GPT, Claude

A journey through the evolution of Large Language Models.

## The Pre-Transformer Era
- RNNs and LSTMs
- The bottleneck of sequential processing

## The Transformer Revolution (2017)
- "Attention Is All You Need"
- Self-attention mechanism
- Parallelization

## The Rise of GPT
- OpenAI's GPT-1, GPT-2, and GPT-3
- Scaling laws

## Modern Era
- ChatGPT, Claude, Llama
- Instruction tuning and RLHF
`,

   "ai-native-design/llm-types": `
# LLMs and its Types

Understanding the different flavors of models.

## Base Models vs Instruct Models
- **Base Models**: Next token predictors (e.g., davinci).
- **Instruct Models**: Fine-tuned to follow instructions.

## Open Weights vs Closed Source
- **Open**: Llama 3, Mistral, Gemma.
- **Closed**: GPT-4, Claude 3.5 Sonnet, Gemini.

## Specialized Models
- Coding models (Codellama)
- Math models
`,

   "ai-native-design/llm-providers": `
# Different LLM Providers

Overview of the major players in the AI space.

## OpenAI
- GPT-4o, GPT-4 Turbo, GPT-3.5
- The industry standard API.

## Anthropic
- Claude 3.5 Sonnet, Opus, Haiku
- Focus on safety and large context windows.

## Google (DeepMind)
- Gemini Pro, Flash, Ultra
- Native multimodal capabilities.

## Meta (Open Source)
- Llama 3 series
- Industry leading open weights.

## Others
- Mistral AI, Cohere, Perplexity.
`,

   "ai-native-design/llm-frameworks": `
# Different LLM Abstraction Frameworks

Tools to build LLM applications.

## LangChain
- The pioneer in chains and agents.
- Extensive integrations.

## LlamaIndex
- Focus on data ingestion and RAG.
- Optimized for indexing and retrieval.

## DSPy
- Programming models instead of prompting.
- Optimizing prompts automatically.

## Vercel AI SDK
- Streaming first for web apps.
- React/Next.js integration.
`,

   "ai-native-design/tokenization": `
# Tokenization

How LLMs see text.

## What is a Token?
- Not exactly a word, not exactly a character.
- Byte Pair Encoding (BPE).

## Impact on Performance
- Context window limits.
- Cost calculation.

## Visualizing Tokens
- Using tiktoken.
`,

   "ai-native-design/attention-mechanism": `
# Attention Mechanism

The heart of the Transformer.

## Self-Attention
- "Looking at other words" to understand context.
- Query, Key, Value matrices.

## Multi-Head Attention
- Capturing different types of relationships simultaneously.

## Scaled Dot-Product Attention
- The mathematical formula.
`,

   "ai-native-design/prompt-caching": `
# Prompt Caching

Optimizing cost and latency for long contexts.

## How it Works
- Caching the Key-Value states of the prefix.
- Reuse computation for static parts of the prompt (e.g., system instructions, few-shot examples).

## Benefits
- Reduced Time to First Token (TTFT).
- Lower costs (often 90% discount on cached tokens).
`,

   "ai-native-design/kv-caching": `
# KV Caching

Accelerating generation.

## The Problem
- Recomputing attention for past tokens at every step is expensive.

## The Solution
- Cache Key and Value matrices for generated tokens.
- Only compute QKV for the *new* token.

## Memory Implications
- KV cache grows with context length.
- Techniques like PagedAttention (vLLM).
`,

   // AI Native Design - New Sections
   "ai-native-design/intro-ai-native-design": `
# Introduction to AI Native Design

Designing software where AI is a first-class citizen.

## What is AI Native?
- Moving beyond "AI wrapper".
- rethinking UX for probabilistic systems.
- Designing for non-determinism.
`,

   "ai-native-design/transformers-and-llms": `
# Transformers and LLMs

Core concepts for AI Engineers.

## The Transformer Architecture
- Encoder-Decoder vs Decoder-only.
- Why modern LLMs are mostly Decoder-only.

## Inference Parameters
- Temperature, Top-P, Top-K.
- Frequency and Presence penalties.
`,

   "ai-native-design/llm-router": `
# LLM Router

Routing between calls for optimization.

## Why Route?
- **Cost**: Use smaller models (Haiku/Flash) for simple tasks.
- **Quality**: Use larger models (Opus/GPT-4) for reasoning.
- **Latency**: Route to the fastest provider.

## Implementation
- Semantic routing (using embeddings).
- Rule-based routing.
`,

   "ai-native-design/vector-db": `
# Vector Databases

The long-term memory for AI.

## Embeddings
- Converting text to high-dimensional vectors.
- Distance metrics (Cosine Similarity, Euclidean).

## Vector Stores
- Pinecone, Weaviate, Milvus, Chroma.
- pgvector (PostgreSQL).

## Indexing
- HNSW (Hierarchical Navigable Small World).
`,

   "ai-native-design/genai-semantic-search": `
# Semantic Search

Beyond keywords.

## Keyword vs Semantic
- Keyword: Exact match (BM25).
- Semantic: Meaning match (Embeddings).

## Hybrid Search
- Combining sparse (keyword) and dense (vector) retrieval.
- Reciprocal Rank Fusion (RRF).
`,

   "ai-native-design/scalable-rag": `
# RAG (Retrieval Augmented Generation)

Grounding LLMs in your data.

## The RAG Pipeline
1. **Ingest**: Chunking and embedding.
2. **Retrieve**: Finding relevant context.
3. **Generate**: Synthesizing answer with context.

## Advanced RAG
- Query rewriting.
- Re-ranking (Cross-encoders).
- Late interaction (ColBERT).
`,

   "ai-native-design/ai-agent-architecture": `
# Agent Design Patterns

Architectures for autonomous systems.

## ReAct Pattern
- Reason + Act.
- The loop: Thought -> Action -> Observation -> Thought.

## Tool Use
- Function calling APIs.
- Defining schemas for tools.

## Multi-Agent Systems
- Orchestrator-Workers.
- Sequential Handoffs.
`,

   "ai-native-design/agent-memory-short-term": `
# Agent Memories - Short Term

Handling the immediate context.

## Managing Context Window
- Sliding windows.
- Summarization.
- Token limits.
`,

   "ai-native-design/agent-memory-long-term": `
# Agent Memories - Long Term

Persisting state across sessions.

## Techniques
- **Vector Store**: Semantic recall of past conversations.
- **Summary Store**: Storing summarized episodes.
- **Entity Store**: Extracting and storing facts about user/world.
`,

   "ai-native-design/context-engineering": `
# Context Engineering

Optimizing what goes into the prompt.

## Principles
- **Relevance**: Only include what matters (RAG).
- **Structure**: JSON, XML tags for clarity.
- **Instructions**: System prompts vs User prompts.
- **Few-Shot**: Providing examples.
`,
   // System Design Fundamentals - New Curriculum
   "system-design-fundamentals/what-is-system-design": `
# What is System Design?

Refers to the process of defining the architecture, interfaces, and data for a system that satisfies specific requirements.
`,

   "system-design-fundamentals/top-10-sde2-concepts": `
# Top 10 SDE-2 SD Concepts

1. Scalability
2. Load Balancing
3. Caching
4. Database Indexing
5. Replication
6. Partitioning
7. CAP Theorem
8. HTTP/REST
9. Asynchronous Processing (Message Queues)
10. Basic Security (HTTPS, Encryption)
`,

   "system-design-fundamentals/top-10-senior-concepts": `
# Top 10 Senior Engineer SD Concepts

1. Consistency Models (Strong vs Eventual)
2. Distributed Transactions (2PC, Sagas)
3. Consensus Algorithms (Paxos, Raft)
4. Advanced database internals (LSM Trees, B+ Trees)
5. Streaming Systems (Kafka, Flink)
6. Observability at Scale
7. Rate Limiting strategies
8. API Gateway patterns
9. Failure scenarios and Circuit Breakers
10. Idempotency design
`,

   "system-design-fundamentals/top-10-staff-concepts": `
# Top 10 Staff Engineer SD Concepts

1. Operational Excellence (SLAs, SLOs, SLIs)
2. Org-wide Architecture Patterns (Microservices vs Monolith trade-offs)
3. Capacity Planning and Cost Estimation
4. Multi-Region Architectures
5. Data Governance and Compliance
6. Build vs Buy decisions
7. Legacy Migration Strategies
8. System Dynamics and Feedback Loops
9. Distributed Tracing and Debugging
10. Engineering Culture's impact on Architecture (Conway's Law)
`,

   "system-design-fundamentals/system-design-interview-process": `
# Process for Giving System Design Interviews

1. **Clarify Requirements (5-7 mins)**: Functional, Non-functional, Scale.
2. **Back-of-Envelope Estimation (3-5 mins)**: Storage, Traffic, Bandwidth.
3. **High-Level Design (10-15 mins)**: Diagram core components and flows.
4. **Deep Dive (15-20 mins)**: Component internals, specific challenges.
5. **Wrap Up (3-5 mins)**: Bottlenecks, failure modes, improvements.
`,

   "system-design-fundamentals/scalability": `
# Scalability

Ability of a system to handle increased load.

- **Vertical Scaling (Scale Up)**: Adding power to a single machine.
- **Horizontal Scaling (Scale Out)**: Adding more machines.
`,

   "system-design-fundamentals/availability": `
# Availability

Percentage of time a system is operational.

- 99.9% (Three 9s) = 8.77 hours downtime/year
- 99.999% (Five 9s) = 5.26 minutes downtime/year
`,

   "system-design-fundamentals/reliability": `
# Reliability

Probability that a system performs correctly during a specific period.
`,

   "system-design-fundamentals/consistency-models": `
# Consistency Models

- **Strong Consistency**: All reads receive the most recent write.
- **Eventual Consistency**: Reads will eventually reflect the latest write.
- **Causal Consistency**: Causally related operations are seen in order.
`,

   "system-design-fundamentals/cap-theorem": `
# CAP Theorem

In a distributed system, you can only pick two:
- **Consistency**
- **Availability**
- **Partition Tolerance** (Must have)

So it's usually CP vs AP.
`,

   "system-design-fundamentals/failures-faults-errors": `
# Failures vs Faults vs Errors

- **Error**: Incorrect internal state.
- **Fault**: Component malfunction.
- **Failure**: System inability to perform function.
`,

   "system-design-fundamentals/consistent-hashing": `
# Consistent Hashing

A technique to distribute data across nodes in a way that minimizes reorganization when nodes are added or removed.
`,

   "system-design-fundamentals/latency-vs-throughput": `
# Latency vs Throughput

- **Latency**: Time taken to process a single request.
- **Throughput**: Number of requests processed per unit time.
`,

   "system-design-fundamentals/single-point-of-failure": `
# SPOF (Single Point of Failure)

A part of a system that, if it fails, will stop the entire system from working.
`,

   "system-design-fundamentals/osi-model": `
# OSI Model

1. Physical
2. Data Link
3. Network (IP)
4. Transport (TCP/UDP)
5. Session
6. Presentation
7. Application (HTTP, DNS)
`,

   "system-design-fundamentals/ip-address": `
# IP Address

IPv4 vs IPv6. CIDR notation.
`,

   "system-design-fundamentals/dns": `
# DNS

Domain Name System. Translates domain names to IP addresses.
`,

   "system-design-fundamentals/proxies": `
# Proxy

- **Forward Proxy**: Acts on behalf of clients (e.g., VPN).
- **Reverse Proxy**: Acts on behalf of servers (e.g., Load Balancer).
`,

   "system-design-fundamentals/http-https": `
# HTTP/HTTPS

HyperText Transfer Protocol. Methods (GET, POST), Status Codes. SSL/TLS Handshake.
`,

   "system-design-fundamentals/tcp-vs-udp": `
# TCP vs UDP

- **TCP**: Reliable, ordered, connection-oriented.
- **UDP**: Unreliable, unordered, connectionless, fast.
`,

   "system-design-fundamentals/sockets-websockets": `
# Sockets and WebSockets

- **Socket**: Endpoint for communication.
- **WebSocket**: Full-duplex communication channel over TCP.
`,

   "system-design-fundamentals/load-balancers": `
# Load Balancers

Distributes network traffic across multiple servers.
`,

   "system-design-fundamentals/load-balancing-algorithms": `
# LB Algorithms

- Round Robin
- Least Connections
- IP Hash
- Weighted Round Robin
`,

   "system-design-fundamentals/checksums": `
# Checksums

Error-detecting code used to verify data integrity.
`,

   "system-design-fundamentals/api-architecture-styles": `
# API Architecture Styles

SOAP vs REST vs GraphQL vs gRPC.
`,

   "system-design-fundamentals/api-types": `
# API Types

Public, Private, Partner, Composite.
`,

   "system-design-fundamentals/rest-api": `
# REST

Representational State Transfer.
- Resources.
- Stateless.
- Cacheable.
- Idempotency.
`,

   "system-design-fundamentals/graphql": `
# GraphQL

Query language for APIs. Ask for exactly what you need.
`,

   "system-design-fundamentals/grpc": `
# gRPC

High-performance RPC framework by Google. Uses Protobufs.
`,

   "system-design-fundamentals/webrtc": `
# WebRTC

Real-Time Communication. Peer-to-peer audio/video.
`,

   "system-design-fundamentals/server-sent-events": `
# SSE (Server-Sent Events)

One-way communication from server to client.
`,

   "system-design-fundamentals/api-gateways": `
# API Gateways

Entry point for backend APIs. Handles routing, auth, rate limiting.
`,

   "system-design-fundamentals/rate-limiting": `
# Rate Limiting & Algorithms

Preventing abuse.
- Token Bucket
- Leaky Bucket
- Fixed Window
- Sliding Window
`,

   "system-design-fundamentals/database-types": `
# Database Types

- Relational (SQL)
- Document (Mongo)
- Key-Value (Redis, Dynamo)
- Column-family (Cassandra)
- Graph (Neo4j)
`,

   "system-design-fundamentals/acid-properties": `
# ACID

- **Atomicity**
- **Consistency**
- **Isolation**
- **Durability**
`,

   "system-design-fundamentals/postgres-deep-dive": `
# SQL - PostgresQL Deep Dive

## Introduction
Advanced Object-Relational database.

## Properties and Guarantees
- ACID Compliant.
- MVCC.

## Data Modelling
- Tables, Foreign Keys, Normalization.

## Indexes
- B-Tree, Hash, GiST, GIN.

## Gotchas
- Connection limits.
- Vacuuming.
`,

   "system-design-fundamentals/mongodb": `
# NoSQL - Mongo

Document store using BSON. Flexible schema.
`,

   "system-design-fundamentals/dynamodb-deep-dive": `
# KV - DynamoDB Deep Dive

## Introduction
AWS managed NoSQL Key-Value database.

## Properties
- High availability, scalability.
- Eventual consistency options.

## Data Modelling
- Single Table Design.
- Partition Key + Sort Key.

## Indexes
- LSI (Local Secondary Index).
- GSI (Global Secondary Index).

## Gotchas
- Hot partitions.
- Item size limits.
`,

   "system-design-fundamentals/cassandra-deep-dive": `
# NoSQL Column - Cassandra Deep Dive

Distributed Wide Column Store.

## Properties
- Masterless architecture.
- Tunable consistency.
- High write throughput.
`,

   "system-design-fundamentals/neo4j-graph-db": `
# Neo4j - Graph Databases

Storing data as nodes and relationships. Uses Cypher query language.
`,

   "system-design-fundamentals/redis-in-memory": `
# Redis - In-Memory Databases

Data structures server. Used for caching, queues, pub/sub.
`,

   "system-design-fundamentals/s3-storage": `
# S3 - Flat File Storage

Object storage. Buckets and Objects.
`,

   "system-design-fundamentals/bloom-filters": `
# Bloom Filters

Probabilistic data structure. "Possibly in set" or "Definitely not in set".
`,

   "system-design-fundamentals/quad-tree": `
# Quad Tree

Tree data structure for spatial indexing (2D space).
`,

   "system-design-fundamentals/sstables": `
# SSTables

Sorted String Tables. Immutable on-disk storage format.
`,

   "system-design-fundamentals/lsm-trees": `
# LSM Trees

Log-Structured Merge-Trees. Optimized for write-heavy workloads.
`,

   "system-design-fundamentals/b-plus-trees": `
# B+ Trees

Balanced tree structure. Optimized for read-heavy workloads (typical in SQL DBs).
`,

   "system-design-fundamentals/data-modelling-intro": `
# Data Modelling

Process of creating a data model for an information system.
- Conceptual, Logical, Physical models.
`,

   "system-design-fundamentals/partitioning": `
# Partitioning

Splitting a database into smaller, manageable parts.
`,

   "system-design-fundamentals/sharding": `
# Sharding

Horizontal partitioning across multiple servers.
- Range Based
- Hash Based
- Directory Based
`,

   "system-design-fundamentals/caching": `
# Caching

Storing copies of data in temporary storage for faster access.
- Write-through
- Write-back
- Write-around
`,
};

// AI Native Design - New Case Studies
Object.assign(chapterContents, {
   "ai-native-design/ai-search-architecture": `
# Case Study: AI Search

Architecture of a modern AI-powered search engine.
- Hybrid search (Keyword + Semantic).
- Reranking models.
- Handling latency at scale.
`,

   "ai-native-design/notion-smart-compose": `
# Case Study: Notion Smart Compose

Enhancing the writing experience.
- Context-aware completion.
- Latency requirements (<100ms).
- Integration with existing editor block models.
`,

   "ai-native-design/whispr-flow-voice": `
# Case Study: Whispr Flow (Voice to Text)

Real-time voice transcription pipeline.
- Streaming audio processing.
- Whisper model optimizations (distillation, quantization).
- Diarization and punctuation.
`,

   "ai-native-design/billion-scale-semantic-search": `
# Case Study: Billion Scale Semantic Search

Scaling vector search to billions of items.
- Approximate Nearest Neighbor (ANN) algorithms.
- Partitioning strategies (FAISS, ScaNN).
- Distributed processing.
`,

   "ai-native-design/deepgram-voice-ai": `
# Case Study: Deepgram Voice AI at Scale

Building a voice API company.
- Custom model architectures for ASR.
- GPU infrastructure management.
- Multi-language support.
`,

   "ai-native-design/scalable-guardrails": `
# Case Study: Scalable Guardrails Service

Ensuring safety and compliance.
- Input/Output filtering.
- PII detection.
- Fast classification models (BERT, smaller Transformers).
`,

   "ai-native-design/audiobook-cover-gen": `
# Case Study: Audiobook Cover Art Gen

Automating creativity.
- Stable Diffusion pipelines.
- Prompt engineering from book metadata.
- Quality assurance models.
`,

   "ai-native-design/linkedin-banner-gen": `
# Case Study: LinkedIn Banner Gen

Personalized visual content.
- Template-based generation + Generative fill.
- User preference embedding.
- Batch processing vs On-demand.
`,

   "ai-native-design/text-to-video-scale": `
# Case Study: Text to Video at Scale

The frontier of generative AI.
- Diffusion models for video.
- Temporal consistency.
- Massive compute requirements.
`,
});

// MLOps & LLMOps - New Curriculum
Object.assign(chapterContents, {
   "mlops-production/intro-to-mlops": `
# Introduction to MLOps & LLMOps

Bridging the gap between research and production.
- **MLOps**: DevOps for Machine Learning.
- **LLMOps**: Unique challenges of Large Language Models (Probabilistic, Expensive).
`,

   "mlops-production/cicd-ml-models": `
# CI-CD for ML Models

Automating the delivery pipeline.
- Model re-training triggers.
- Unit tests for data and models.
- Canary deployments.
`,

   "mlops-production/distributed-ml-training": `
# Distributed ML Training Platform

Training large models efficiently.
- Data Parallelism vs Model Parallelism.
- Parameter Servers.
- Frameworks (Ray Train, PyTorch DDP).
`,

   "mlops-production/scalable-feature-store": `
# Scalable ML Feature Store

Single source of truth for features.
- Offline store (training) vs Online store (inference).
- Point-in-time correctness.
- Tools: Feast, Tecton.
`,

   "mlops-production/scalable-inference-service": `
# Scalable ML Inference Service

Serving predictions at high throughput.
- Batch prediction vs Online prediction.
- Auto-scaling policies.
- Model serialization (ONNX, TorchScript).
`,

   "mlops-production/scalable-ml-observability": `
# Scalable ML Observability

Monitoring model health.
- Drift detection (Data drift, Concept drift).
- Performance metrics (Accuracy, F1, Latency).
- Outlier detection.
`,

   "mlops-production/llm-deployment-scale": `
# Deployment of LLM Models at Scale

Challenges of hosting giants.
- Model quantization (4-bit, 8-bit).
- Model pruning.
- Hardware requirements (A100s, H100s).
`,

   "mlops-production/llm-inference-service": `
# LLM Inference Service

serving generative models.
- KV Caching optimizations.
- Continuous batching.
- Speculative decoding.
- vLLM, TGI.
`,

   "mlops-production/llm-guardrails-service": `
# LLM Guardrails Service

Safety layer for GenAI.
- Jailbreak detection.
- Hallucination detection.
- Content moderation.
`,

   "mlops-production/llm-observability-platform": `
# LLM Observability Platform

Tracing the thought process.
- Token usage tracking.
- Latency breakdown (TTFT, TBT).
- Trace visualization (LangSmith, LangFuse).
`,

   "mlops-production/llm-evals-platform": `
# LLM Evals Platform

Judging the output.
- LLM-as-a-Judge.
- Benchmarks (MMLU, HumanEval).
- Custom evaluation datasets.
`,
});

export function getChapterContent(courseSlug: string, chapterSlug: string): string {
   const key = `${courseSlug}/${chapterSlug}`;
   return chapterContents[key] || `
# Coming Soon

This chapter is currently being written. Check back soon for the full content!

In the meantime, explore our other available chapters to continue your learning journey.
`;
}
