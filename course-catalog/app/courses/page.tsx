import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Course catalog</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Find your next course</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">Choose a course to explore its details and add your local like.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} id={course.id} title={course.title} description={course.description} credits={course.credits} likes={course.likes} />
        ))}
      </div>
    </section>
  );
}
