import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    articles: defineTable({
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        format: v.union(v.literal("markdown"), v.literal("html")),
        tags: v.optional(v.array(v.string())),
        isPublished: v.boolean(),
        publishedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_published", ["isPublished", "publishedAt"]),
});
