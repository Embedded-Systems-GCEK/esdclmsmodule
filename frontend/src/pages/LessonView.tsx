import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

interface Lesson {
  id: string;
  title: string;
  contentType: string;
  contentURL?: string;
  textContent?: string;
}

const LessonView = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`/lessons/${id}`);
      setLesson(response.data);
    } catch (error) {
      console.error("Failed to load lesson", error);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20 text-gray-600">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

        {/* VIDEO */}
        {lesson.contentType === "video" && lesson.contentURL && (
          <iframe
            className="w-full h-96 rounded-xl shadow-lg"
            src={lesson.contentURL.replace("watch?v=", "embed/")}
            allowFullScreen
          ></iframe>
        )}

        {/* PDF */}
        {lesson.contentType === "pdf" && (
          <iframe
            src={lesson.contentURL}
            className="w-full h-[600px] border rounded-lg"
          ></iframe>
        )}

        {/* TEXT */}
        {lesson.contentType === "text" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 whitespace-pre-line">
              {lesson.textContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;
