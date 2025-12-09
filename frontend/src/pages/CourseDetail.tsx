import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, PlusCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ModuleCard from '../components/ModuleCard';
import AddModuleModal from '../components/AddModuleModal';
import AddLessonModal from '../components/AddLessonModal';
import axios from '../api/axios';
import { isAdmin } from '../utils/auth';

interface Lesson {
  id: string;
  title: string;
  contentType: string;
  contentURL?: string;
  textContent?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  modules: Module[];
  isEnrolled?: boolean;
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await axios.post(`/courses/${id}/enroll`);
      setCourse((prev) => (prev ? { ...prev, isEnrolled: true } : null));
    } catch (error) {
      console.error('Failed to enroll:', error);
    } finally {
      setEnrolling(false);
    }
  };

  const handleAddModule = async (moduleData: { title: string; description: string }) => {
    try {
      await axios.post(`/admin/courses/${id}/modules`, moduleData);
      setShowModuleModal(false);
      fetchCourse();
    } catch (error) {
      console.error('Failed to add module:', error);
    }
  };

  const handleAddLesson = async (lessonData: {
    title: string;
    contentType: string;
    contentURL?: string;
    textContent?: string;
  }) => {
    try {
      await axios.post(`/admin/modules/${selectedModuleId}/lessons`, lessonData);
      setShowLessonModal(false);
      setSelectedModuleId('');
      fetchCourse();
    } catch (error) {
      console.error('Failed to add lesson:', error);
    }
  };

  const openAddLessonModal = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setShowLessonModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-10">
        <Navbar />
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pb-10">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-50">
              Course not found
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              The course you are looking for does not exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      <Navbar />

      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-8 rounded-3xl border border-cyan-500/30 bg-bg-card p-6 shadow-glow">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="flex gap-4">
              <div className="mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/80 ring-2 ring-cyan-400/50">
                <BookOpen className="h-7 w-7 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
                  Course
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-50">
                  {course.title}
                </h1>
                <p className="mt-1 text-xs font-mono text-slate-400">
                  {course.code}
                </p>
                <p className="mt-3 text-sm text-slate-200">
                  {course.description}
                </p>
              </div>
            </div>

            {!isAdmin() && (
              <div className="flex items-center">
                {course.isEnrolled ? (
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200">
                    <CheckCircle className="h-4 w-4" />
                    <span>Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:from-cyan-400 hover:to-violet-400 disabled:opacity-60"
                  >
                    {enrolling ? 'Enrolling…' : 'Enroll Now'}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Modules */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-50">
              Course Modules
            </h2>
            {isAdmin() && (
              <button
                onClick={() => setShowModuleModal(true)}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-400/60 transition hover:bg-cyan-500/25"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Module</span>
              </button>
            )}
          </div>

          {course.modules && course.modules.length > 0 ? (
            <div className="space-y-4">
              {course.modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  {...module}
                  onAddLesson={() => openAddLessonModal(module.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/70 p-10 text-center">
              <BookOpen className="mx-auto mb-4 h-10 w-10 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-100">
                No modules yet
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {isAdmin()
                  ? 'Get started by adding your first module.'
                  : 'This course is still being developed.'}
              </p>
            </div>
          )}
        </section>
      </main>

      {showModuleModal && (
        <AddModuleModal
          onClose={() => setShowModuleModal(false)}
          onSubmit={handleAddModule}
        />
      )}

      {showLessonModal && (
        <AddLessonModal
          onClose={() => {
            setShowLessonModal(false);
            setSelectedModuleId('');
          }}
          onSubmit={handleAddLesson}
        />
      )}
    </div>
  );
};

export default CourseDetail;
