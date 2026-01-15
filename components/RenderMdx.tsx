import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import React from "react";

// Custom components for MDX
const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="font-medium text-primary underline underline-offset-4" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />
    ),
};

export function RenderMdx({ content }: { content: string }) {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
        </div>
    );
}
