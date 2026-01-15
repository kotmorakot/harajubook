"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";

export default function AdminDashboard() {
    const articles = useQuery(api.articles.listAll);
    const deleteArticle = useMutation(api.articles.deleteArticle);

    const handleDelete = async (id: Id<"articles">) => {
        if (confirm("Are you sure you want to delete this article?")) {
            await deleteArticle({ id });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Link
                    href="/admin/dashboard/create"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Create New Article
                </Link>
            </div>

            <div className="border rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y border-t">
                        {articles === undefined ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-muted-foreground">Loading...</td>
                            </tr>
                        ) : articles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-muted-foreground">No articles found.</td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article._id} className="hover:bg-muted/50">
                                    <td className="p-4 font-medium">{article.title}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${article.isPublished ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                                            {article.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-muted-foreground">
                                        {format(article.publishedAt, "MMM d, yyyy")}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link href={`/admin/dashboard/edit/${article._id}`} className="text-blue-600 hover:underline">Edit</Link>
                                        <button onClick={() => handleDelete(article._id)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
