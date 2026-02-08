"use client";

import { Lock, Book, Zap } from "lucide-react";
import { ArticleHeader } from "@/components/mdx/ArticleHeader";
import { Tip } from "@/components/mdx/Tip";
import { SolutionCard } from "@/components/mdx/SolutionCard";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Article Header Demo */}
                <ArticleHeader
                    category="Common Problems"
                    title="Ticketmaster"
                    tags={[
                        { icon: <Lock className="h-3.5 w-3.5" />, label: "Dealing with Contention" },
                        { icon: <Book className="h-3.5 w-3.5" />, label: "Scaling Reads" },
                        { icon: <Zap className="h-3.5 w-3.5" />, label: "Real-time Updates" }
                    ]}
                    author="Evan King"
                    publishedDate="Jul 25, 2024"
                    difficulty="medium"
                    companies={[
                        { name: "Meta", fallback: "M" },
                        { name: "Google", fallback: "G" },
                        { name: "Apple", fallback: "A" },
                        { name: "Netflix", fallback: "N" },
                        { name: "Amazon", fallback: "Am" },
                        { name: "Microsoft", fallback: "Ms" }
                    ]}
                />

                <div className="prose prose-invert max-w-none">
                    <h2>Section 1: Callout Boxes</h2>
                    <p>
                        Below are examples of the new colored callout boxes for success tips and danger warnings.
                    </p>

                    {/* Green Success Callout */}
                    <Tip type="success">
                        It's ok to have simple APIs from the start that you evolve as your design progresses. As always, just
                        communicate, "Here is a simple API to start, but as we get into the design, we'll likely need to evolve
                        this to handle more complex scenarios."
                    </Tip>

                    {/* Red Danger Callout */}
                    <Tip type="danger">
                        Adding features that are out of scope is a "nice to have". It shows product thinking and gives your
                        interviewer a chance to help you reprioritize based on what they want to see in the interview. That
                        said, it's very much a nice to have. If additional features are not coming to you quickly, don't waste
                        your time and move on.
                    </Tip>

                    <h2>Section 2: Solution Comparisons</h2>
                    <p>
                        Compare different approaches with color-coded solution cards. These are collapsible and clearly
                        indicate the quality level of each solution.
                    </p>

                    {/* Bad Solution */}
                    <SolutionCard type="bad" title="Bad Solution: Pessimistic Locking">
                        <p className="mb-3">
                            This approach uses database locks to prevent concurrent access to the same seats. While simple,
                            it has several major drawbacks:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Poor scalability under high load</li>
                            <li>Potential for deadlocks</li>
                            <li>Blocks other users unnecessarily</li>
                            <li>Single point of failure</li>
                        </ul>
                        <p className="mt-3">
                            In a high-traffic ticketing system like Ticketmaster, pessimistic locking would cause significant
                            performance bottlenecks and poor user experience.
                        </p>
                    </SolutionCard>

                    {/* Good Solution */}
                    <SolutionCard type="good" title="Good Solution: Status & Expiration Time with Cron">
                        <p className="mb-3">
                            This approach uses seat status flags combined with expiration timestamps and a cron job for cleanup:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Mark seats as "reserved" with a timestamp</li>
                            <li>Run periodic cron jobs to release expired reservations</li>
                            <li>Better scalability than pessimistic locking</li>
                            <li>No database locks required</li>
                        </ul>
                        <p className="mt-3">
                            However, cron jobs introduce latency - seats might remain unavailable for several minutes after
                            expiration, leading to suboptimal inventory utilization.
                        </p>
                    </SolutionCard>

                    {/* Great Solution - First */}
                    <SolutionCard type="best" title="Great Solution: Implicit Status with Status and Expiration Time">
                        <p className="mb-3">
                            This elegant approach eliminates the need for cron jobs by making status checks implicit:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Store reservation timestamp in the database</li>
                            <li>Check expiration on-the-fly during seat queries</li>
                            <li>Treat expired reservations as available automatically</li>
                            <li>Real-time availability updates</li>
                        </ul>
                        <p className="mt-3">
                            This provides immediate feedback and optimal inventory utilization without background jobs.
                            Perfect for most use cases with moderate to high traffic.
                        </p>
                    </SolutionCard>

                    {/* Great Solution - Second */}
                    <SolutionCard type="best" title="Great Solution: Distributed Lock with TTL" defaultOpen={false}>
                        <p className="mb-3">
                            For extremely high-scale systems, using a distributed cache like Redis with TTL-based locks:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Use Redis SET with EX option for atomic lock acquisition</li>
                            <li>Automatic expiration via TTL (Time To Live)</li>
                            <li>Sub-millisecond performance</li>
                            <li>Horizontal scalability with Redis Cluster</li>
                        </ul>
                        <p className="mt-3">
                            This approach handles millions of concurrent requests with minimal latency. Ideal for
                            stadium-filling events where tens of thousands of users are competing for seats simultaneously.
                        </p>
                    </SolutionCard>

                    <h2>Section 3: Traditional Callouts</h2>
                    <p>
                        The existing tip variants are still available for general use:
                    </p>

                    <Tip type="info" title="Note">
                        This is an informational callout using the default styling.
                    </Tip>

                    <Tip type="interview" title="Interview Tip">
                        Always discuss trade-offs between different approaches. Acknowledge both strengths and weaknesses
                        of your chosen solution.
                    </Tip>

                    <Tip type="general">
                        General tips help provide context and best practices throughout your content.
                    </Tip>
                </div>
            </div>
        </main>
    );
}
