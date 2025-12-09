import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import axios from '../api/axios';

interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses');
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <Navbar />

      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-slate-700/80 bg-bg-card p-6 shadow-inner-glow">
          <h1 className="text-2xl font-bold text-slate-50">Browse Courses</h1>
          <p className="mt-1 text-sm text-slate-300">
            Search through all embedded systems courses available in the club LMS.
          </p>

          <div className="mt-5 relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, code, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 pl-11 pr-4 py-2.5 text-sm text-slate-100 outline-none ring-primary-500/40 focus:border-cyan-400/60 focus:ring-2"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          </div>
        ) : filteredCourses.length > 0 ? (
          <div>
            <p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
              Showing {filteredCourses.length} course
              {filteredCourses.length !== 1 ? 's' : ''}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/60 p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-100">
              No courses found
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              {searchTerm
                ? 'Try adjusting your search terms.'
                : 'No courses are available at the moment.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
