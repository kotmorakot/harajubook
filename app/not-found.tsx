import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-4xl font-extrabold lg:text-5xl">404</h2>
            <p className="text-xl text-muted-foreground">The article you are looking for does not exist.</p>
            <Link href="/" className="text-primary underline underline-offset-4 hover:text-primary/80">
                Return Home
            </Link>
        </div>
    );
}
