import { Link } from 'react-router-dom';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { isAdmin } from '../utils/auth';

interface CourseCardProps {
  id: string;
  title: string;
  code: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CourseCard = ({ id, title, code, description, onEdit, onDelete }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{code}</p>
          </div>
        </div>

        {isAdmin() && (
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

      <Link
        to={`/courses/${id}`}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        View Course
      </Link>
    </div>
  );
};

export default CourseCard;
