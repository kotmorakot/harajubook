"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { slugify } from "@/lib/slugify";

interface ArticleFormProps {
    initialData?: Doc<"articles">;
    mode: "create" | "edit";
}

export function ArticleForm({ initialData, mode }: ArticleFormProps) {
    const router = useRouter();
    const createMutation = useMutation(api.articles.create);
    const updateMutation = useMutation(api.articles.update);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        content: initialData?.content || "",
        format: initialData?.format || "markdown",
        tags: initialData?.tags?.join(", ") || "",
        isPublished: initialData?.isPublished ?? false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from title if slug is empty or user is typing title (optional UX preference)
            // For now, let's just let them click a button or do it manually, 
            // BUT actually better to auto-fill slug if it's empty when title changes?
            // Let's strictly add a "Generate" button to avoid annoying overwrites.
            return newData;
        });
    };

    const handleSlugify = () => {
        setFormData(prev => ({ ...prev, slug: slugify(prev.title) }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const tags = formData.tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== "");

            if (mode === "create") {
                await createMutation({
                    title: formData.title,
                    slug: formData.slug,
                    content: formData.content,
                    format: formData.format as "markdown" | "html",
                    tags,
                    isPublished: formData.isPublished,
                });
            } else {
                if (!initialData?._id) return;
                await updateMutation({
                    id: initialData._id,
                    title: formData.title,
                    slug: formData.slug,
                    content: formData.content,
                    format: formData.format as "markdown" | "html",
                    tags,
                    isPublished: formData.isPublished,
                });
            }

            router.push("/admin/dashboard");
            router.refresh(); // Refresh server components if any
        } catch (error) {
            console.error("Failed to save article:", error);
            alert("Failed to save article. View console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium leading-none" htmlFor="slug">Slug</label>
                        <button
                            type="button"
                            onClick={handleSlugify}
                            className="text-xs text-primary hover:underline"
                        >
                            Generate from Title
                        </button>
                    </div>
                    <input
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        placeholder="my-article-slug"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-xs text-muted-foreground">URL-friendly name (e.g. my-first-post). Avoid spaces and special characters.</p>
                </div>

                {/* Format */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="format">Format</label>
                    <select
                        id="format"
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="markdown">Markdown</option>
                        <option value="html">HTML</option>
                    </select>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={15}
                        required
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                    />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="tags">Tags (comma separated)</label>
                    <input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="tech, nextjs, convex"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Published Status */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isPublished"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleCheckboxChange}
                        className="aspect-square h-4 w-4 rounded border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <label
                        htmlFor="isPublished"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Publish immediately?
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    {isLoading ? "Saving..." : "Save Article"}
                </button>
            </div>
        </form>
    );
}
