import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BookMarked, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import axios from '../api/axios';
import { getUser, isAdmin } from '../utils/auth';

interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
}

const Dashboard = () => {
  const user = getUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/admin/courses/${id}`);
        setCourses((prev) => prev.filter((course) => course.id !== id));
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <Navbar />

      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-3xl border border-cyan-500/30 bg-bg-card p-6 shadow-glow">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
                Embedded Systems Design Club
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-50">
                Welcome back, {user?.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                {isAdmin()
                  ? 'Monitor modules, push new content, and keep your learners in sync with the latest embedded design concepts.'
                  : 'Pick up where you left off and continue exploring embedded systems, one module at a time.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/40 bg-slate-900/70 shadow-inner-glow md:flex">
                <Cpu className="h-10 w-10 text-cyan-300" />
              </div>
              {isAdmin() ? (
                <Link
                  to="/admin/create-course"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:from-cyan-400 hover:to-violet-400"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Create Course</span>
                </Link>
              ) : (
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  <BookMarked className="h-4 w-4" />
                  <span>Browse Courses</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-50">
              {isAdmin() ? 'All Courses' : 'My Enrolled Courses'}
            </h2>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            </div>
          ) : courses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  onDelete={isAdmin() ? () => handleDelete(course.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700/70 bg-slate-950/60 p-10 text-center">
              <BookMarked className="mx-auto mb-4 h-10 w-10 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-100">
                {isAdmin() ? 'No courses yet' : 'No enrolled courses'}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {isAdmin()
                  ? 'Kickstart your LMS by creating the first embedded systems course.'
                  : 'Browse the available courses and start learning today.'}
              </p>
              <div className="mt-5">
                {isAdmin() ? (
                  <Link
                    to="/admin/create-course"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Create Course</span>
                  </Link>
                ) : (
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-200"
                  >
                    <BookMarked className="h-4 w-4" />
                    <span>Browse Courses</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
