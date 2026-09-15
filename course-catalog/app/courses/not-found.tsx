import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-950">Course not found</h1>
      <p className="mt-4 text-slate-600">The course you are looking for does not exist.</p>
      <Link href="/courses" className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
        Back to courses
      </Link>
    </div>
  );
}
