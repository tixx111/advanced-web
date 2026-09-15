import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Course Catalog",
  description: "A course catalog for Advanced Web Technologies",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-indigo-700">
              Course Catalog
            </Link>
            <div className="flex gap-5 text-sm font-medium text-slate-600">
              <Link
                href="/"
                className="transition-colors hover:text-indigo-700"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="transition-colors hover:text-indigo-700"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-indigo-700"
              >
                About
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
          Advanced Web Technologies | Akhanov Alisher IT3-2304
        </footer>
      </body>
    </html>
  );
}
