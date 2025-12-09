import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Home, BookMarked, PlusCircle, Cpu } from 'lucide-react';
import { getUser, logout, isAdmin } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-cyan-500/20 bg-bg-soft/80 backdrop-blur-xl shadow-glow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 shadow-glow">
            <Cpu className="h-5 w-5 text-slate-950" />
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.18em] text-cyan-300">
              ESDC
            </span>
            <span className="text-xs font-medium text-slate-300">
              Embedded Systems LMS
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 text-sm">
          <Link
            to="/dashboard"
            className="flex items-center space-x-1 rounded-full border border-transparent px-3 py-1.5 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/courses"
            className="flex items-center space-x-1 rounded-full border border-transparent px-3 py-1.5 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            <BookMarked className="h-4 w-4" />
            <span>Courses</span>
          </Link>

          {isAdmin() && (
            <Link
              to="/admin/create-course"
              className="flex items-center space-x-1 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-1.5 text-cyan-200 shadow-glow transition hover:bg-cyan-400/20"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create</span>
            </Link>
          )}

          {/* User */}
          <div className="flex items-center space-x-3 border-l border-slate-700/70 pl-4">
            <div className="flex flex-col text-right">
              <p className="text-xs font-semibold text-slate-100">
                {user?.name}
              </p>
              <p className="text-[11px] capitalize text-slate-400">
                {user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-400/50 bg-red-500/10 text-red-300 shadow-inner-glow transition hover:bg-red-500/20 hover:text-red-200"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
