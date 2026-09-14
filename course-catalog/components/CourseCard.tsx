import Link from "next/link";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({ id, title, description, credits, likes }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-700">{title}</h2>
        <span className="whitespace-nowrap rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">{credits} credits</span>
      </div>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
      <p className="mt-5 text-sm text-slate-500">❤ {likes}</p>
    </Link>
  );
}
