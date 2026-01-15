"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ViewCounter({ slug }: { slug: string }) {
    const increment = useMutation(api.articles.incrementViewCount);

    useEffect(() => {
        increment({ slug });
    }, [increment, slug]);

    return null;
}
