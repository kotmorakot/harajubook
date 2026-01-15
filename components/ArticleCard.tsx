import Link from "next/link";
import { format } from "date-fns";

interface ArticleCardProps {
    title: string;
    slug: string;
    publishedAt: number;
    tags?: string[];
}

export function ArticleCard({ title, slug, publishedAt, tags }: ArticleCardProps) {
    return (
        <article className="group relative flex flex-col space-y-2 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={new Date(publishedAt).toISOString()}>
                    {format(publishedAt, "MMMM dd, yyyy")}
                </time>
                {tags && tags.length > 0 && (
                    <>
                        <span>&middot;</span>
                        <div className="flex gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="lowercase">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-muted-foreground">
                <Link href={`/blog/${slug}`} className="absolute inset-0">
                    <span className="sr-only">View Article</span>
                </Link>
                {title}
            </h2>
            <p className="text-muted-foreground line-clamp-2">
                {/* Potentially add excerpt here if we have it later */}
                Click to read more...
            </p>
        </article>
    );
}
