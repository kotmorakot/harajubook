"use client";

import { ArticleForm } from "@/components/ArticleForm";

export default function CreateArticlePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Create New Article</h1>
            <ArticleForm mode="create" />
        </div>
    );
}
