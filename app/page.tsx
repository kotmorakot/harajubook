"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArticleCard } from "@/components/ArticleCard";

export default function Home() {
  const articles = useQuery(api.articles.list);

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Writing
        </h1>
        <p className="text-xl text-muted-foreground">
          Thoughts, ideas, and stories from the harajubook.
        </p>
      </div>

      <div className="divide-y border-t border-border">
        {articles === undefined ? (
          // Loading State
          <div className="py-10 text-muted-foreground">Loading articles...</div>
        ) : articles.length === 0 ? (
          // Empty State
          <div className="py-10 text-muted-foreground">No articles published yet.</div>
        ) : (
          articles.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              slug={article.slug}
              publishedAt={article.publishedAt}
              tags={article.tags}
            />
          ))
        )}
      </div>
    </div>
  );
}
