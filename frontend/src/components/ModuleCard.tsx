import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { isAdmin } from '../utils/auth';
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  contentType: string;
  contentURL?: string;
  textContent?: string;
}

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  onAddLesson?: () => void;
  onEditLesson?: (lessonId: string) => void;
  onDeleteLesson?: (lessonId: string) => void;
}

const ModuleCard = ({
  title,
  description,
  lessons,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
}: ModuleCardProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-xs text-gray-500 mt-2">
            {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          {lessons.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                  className="p-4 flex items-center justify-between hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">{lesson.title}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {lesson.contentType}
                      </p>
                    </div>
                  </div>

                  {isAdmin() && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onEditLesson?.(lesson.id); }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteLesson?.(lesson.id); }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No lessons in this module yet.
            </div>
          )}

          {isAdmin() && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={onAddLesson}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Lesson</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
