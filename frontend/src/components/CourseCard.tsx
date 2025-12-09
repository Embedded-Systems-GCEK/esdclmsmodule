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
    <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-bg-card p-5 shadow-glow transition hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]">
      {/* subtle gradient border flare */}
      <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 ring-1 ring-cyan-400/40">
            <BookOpen className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">
              {title}
            </h3>
            <p className="text-xs font-mono tracking-wide text-cyan-300/80">
              {code}
            </p>
          </div>
        </div>

        {isAdmin() && (
          <div className="flex space-x-1">
            <button
              onClick={onEdit}
              className="rounded-full p-1.5 text-cyan-300 transition hover:bg-cyan-500/10 hover:text-cyan-100"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="rounded-full p-1.5 text-red-300 transition hover:bg-red-500/10 hover:text-red-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-slate-300/90">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <Link
          to={`/courses/${id}`}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-glow transition hover:from-cyan-400 hover:to-violet-400"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
