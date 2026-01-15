import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Public: List active articles
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("articles")
            .withIndex("by_published", (q) =>
                q.eq("isPublished", true)
            )
            .order("desc") // timestamp is typically stored such that newer is higher, but we want reverse chrono order
            .take(20);
    },
});

// Public: Get article by slug
export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const article = await ctx.db
            .query("articles")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
        return article;
    },
});

// Admin: Create article
export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        format: v.union(v.literal("markdown"), v.literal("html")),
        tags: v.optional(v.array(v.string())),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        // In a real app we'd check auth here, but for now we rely on the
        // fact that only the Admin UI (protected by password) calls this,
        // or we can add a simple shared secret check if needed.
        // For this MVP, we will trust the client to have passed the 'Admin Guard' in the UI.
        // Ideally, we'd pass a session logic or a secret token here.

        return await ctx.db.insert("articles", {
            ...args,
            publishedAt: Date.now(),
        });
    },
});

// Admin: Update article
export const update = mutation({
    args: {
        id: v.id("articles"),
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        format: v.union(v.literal("markdown"), v.literal("html")),
        tags: v.optional(v.array(v.string())),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { id, ...rest } = args;
        await ctx.db.patch(id, rest);
    },
});

// Admin: Delete article
export const deleteArticle = mutation({
    args: { id: v.id("articles") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Public: Increment view count
export const incrementViewCount = mutation({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const article = await ctx.db
            .query("articles")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        if (article) {
            await ctx.db.patch(article._id, {
                views: (article.views || 0) + 1,
            });
        }
    },
});

// Admin: List all articles (including unpublished)
export const listAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("articles").order("desc").collect();
    }
})
