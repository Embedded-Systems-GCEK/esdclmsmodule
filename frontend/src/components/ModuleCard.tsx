import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  PlusCircle,
  Edit,
  Trash2,
  PlayCircle,
} from 'lucide-react';
import { isAdmin } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

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
  id,
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
    <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-bg-card shadow-glow transition hover:border-cyan-400/70">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-900/80"
        onClick={() => setIsExpanded((p) => !p)}
      >
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-50">{title}</h3>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
          <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-300/70">
            {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
          </p>
        </div>
        <span className="rounded-full border border-cyan-500/40 bg-slate-900/60 p-1 text-cyan-300">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-700/70 bg-slate-950/70">
          {lessons.length > 0 ? (
            <div className="divide-y divide-slate-800/80">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                  className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-900/90"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 ring-1 ring-cyan-400/40">
                      {lesson.contentType === 'video' ? (
                        <PlayCircle className="h-4 w-4 text-cyan-300" />
                      ) : (
                        <FileText className="h-4 w-4 text-cyan-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-[11px] capitalize text-slate-400">
                        {lesson.contentType}
                      </p>
                    </div>
                  </div>

                  {isAdmin() && (
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditLesson?.(lesson.id);
                        }}
                        className="rounded-full p-1.5 text-cyan-300 transition hover:bg-cyan-500/10 hover:text-cyan-100"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteLesson?.(lesson.id);
                        }}
                        className="rounded-full p-1.5 text-red-300 transition hover:bg-red-500/10 hover:text-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-5 text-center text-sm text-slate-400">
              No lessons in this module yet.
            </div>
          )}

          {isAdmin() && (
            <div className="border-t border-slate-800/80 px-5 py-4">
              <button
                onClick={onAddLesson}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500/80 to-violet-500/80 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:from-cyan-400 hover:to-violet-400"
              >
                <PlusCircle className="h-4 w-4" />
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
