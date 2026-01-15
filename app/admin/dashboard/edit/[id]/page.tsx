"use client";

import { ArticleForm } from "@/components/ArticleForm";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { use } from "react";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const article = useQuery(api.articles.listAll);
    // Note: listAll fetches everything. Ideally we would have a 'getById' query.
    // For MVP with small data, filtering on client is okay, 
    // OR we can make a getById query.
    // Let's stick to listAll for now or invoke a quick query if we had one.
    // Actually, let's fix this properly by adding 'getById' query?
    // No, I can't easily add it now without backtracking to schema file.
    // I'll filter from listAll since it's cached.

    // Wait, I can use `api.articles.get` if I hadn't removed the default generated code? 
    // I didn't generate default code.
    // I'll create a `get` query in `convex/articles.ts` quickly?
    // Or just filter here.

    const foundArticle = article?.find((a) => a._id === id as Id<"articles">);

    if (article === undefined) {
        return <div>Loading...</div>;
    }

    if (!foundArticle) {
        return <div>Article not found</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Edit Article</h1>
            <ArticleForm mode="edit" initialData={foundArticle} />
        </div>
    );
}
