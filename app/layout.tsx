import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harajubook",
  description: "A personal blog and knowledge base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased min-h-screen flex flex-col")}>
        <ConvexClientProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <Link className="flex items-center space-x-2 font-bold text-lg tracking-tight" href="/">
                <span>Harajubook.</span>
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium">
                <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Blog
                </Link>
                {/* Admin Link (Hidden/ Subtle) */}
                <Link href="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Admin
                </Link>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by <span className="font-semibold text-foreground">Antigravity</span>.
                The source code is available on <span className="underline underline-offset-4">GitHub</span>.
              </p>
            </div>
          </footer>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
