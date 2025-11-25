import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Recommender",
  description: "Personalized movie recommendations built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800">
          <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
            <h1 className="text-xl font-bold">🎬 CineMate</h1>
            <div className="flex gap-4 text-sm">
              <a href="/" className="hover:underline">Home</a>
              <a href="/movies" className="hover:underline">Movies</a>
              <a href="/recommendations" className="hover:underline">Recommendations</a>
            </div>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
