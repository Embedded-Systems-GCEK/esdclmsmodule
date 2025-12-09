import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Home, BookMarked, PlusCircle } from 'lucide-react';
import { getUser, logout, isAdmin } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">ESDC LMS</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/courses"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <BookMarked className="w-5 h-5" />
              <span className="font-medium">Courses</span>
            </Link>

            {isAdmin() && (
              <Link
                to="/admin/create-course"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="font-medium">Create Course</span>
              </Link>
            )}

            <div className="flex items-center space-x-4 border-l pl-4">
              <div className="text-sm">
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
