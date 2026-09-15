import Link from "next/link";

export default function Home() {
  return (
    <div className="py-12">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Advanced Web Technologies
      </p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
        Build your next web project with confidence.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Explore the course catalog and learn modern frontend, backend, database, and
        web security technologies.
      </p>
      <Link
        href="/courses"
        className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Browse courses
      </Link>
    </div>
  );
}
