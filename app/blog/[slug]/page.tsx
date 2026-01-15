import { ViewCounter } from "@/components/ViewCounter";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { RenderMdx } from "@/components/RenderMdx";
import { format } from "date-fns";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await convex.query(api.articles.getBySlug, { slug });

    if (!article || !article.isPublished) {
        return {
            title: "Not Found",
        };
    }

    return {
        title: article.title,
        description: article.content.slice(0, 150) + "...", // Simple description generation
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await convex.query(api.articles.getBySlug, { slug });

    if (!article || !article.isPublished) {
        return notFound();
    }

    return (
        <article className="container max-w-3xl py-10">
            <ViewCounter slug={slug} />
            <header className="mb-10 space-y-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={new Date(article.publishedAt).toISOString()}>
                        {format(article.publishedAt, "MMMM dd, yyyy")}
                    </time>
                    <span>&middot;</span>
                    <span>{article.views ?? 0} views</span>
                    {article.tags && article.tags.length > 0 && (
                        <>
                            <span>&middot;</span>
                            <div className="flex gap-2">
                                {article.tags.map((tag) => (
                                    <span key={tag} className="lowercase">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {article.title}
                </h1>
            </header>

            {article.format === "markdown" ? (
                <RenderMdx content={article.content} />
            ) : (
                <div
                    className="prose prose-zinc dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            )}
        </article>
    );
}
