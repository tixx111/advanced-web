export default function AboutPage() {
  return (
    <article className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">About the project</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">A catalog for learning modern web development</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        This course catalog is a semester project for the Advanced Web Technologies course. It demonstrates file-based routing, Server Components, Client Components, and typed data in Next.js.
      </p>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        The catalog will grow throughout the semester as new backend and frontend features are introduced.
      </p>
    </article>
  );
}
