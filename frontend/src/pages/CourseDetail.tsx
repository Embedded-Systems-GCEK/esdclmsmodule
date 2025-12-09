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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <BookOpen className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h1>
                <p className="text-gray-500 mb-4">{course.code}</p>
                <p className="text-gray-700">{course.description}</p>
              </div>
            </div>

            {!isAdmin() && (
              <div>
                {course.isEnrolled ? (
                  <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium">
                    <CheckCircle className="w-5 h-5" />
                    <span>Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Course Modules
          </h2>
          {isAdmin() && (
            <button
              onClick={() => setShowModuleModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <PlusCircle className="w-5 h-5" />
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
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No modules yet
            </h3>
            <p className="text-gray-600 mb-4">
              {isAdmin()
                ? 'Get started by adding your first module.'
                : 'This course is still being developed.'}
            </p>
          </div>
        )}
      </div>

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
