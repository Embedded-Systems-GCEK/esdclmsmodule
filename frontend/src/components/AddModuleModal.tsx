import { useState } from 'react';
import { X } from 'lucide-react';

interface AddModuleModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

const AddModuleModal = ({ onClose, onSubmit }: AddModuleModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-cyan-500/40 bg-bg-card shadow-[0_0_60px_rgba(34,211,238,0.5)]">
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
              New Module
            </p>
            <h2 className="text-lg font-semibold text-slate-50">
              Add module to course
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-700 bg-slate-900/80 p-1.5 text-slate-400 transition hover:border-slate-500 hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">
              Module Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-primary-500/40 focus:border-cyan-400/60 focus:ring-2"
              placeholder="Embedded C Fundamentals"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">
              Module Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-primary-500/40 focus:border-cyan-400/60 focus:ring-2"
              placeholder="Describe what students will build or understand in this module..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:from-cyan-400 hover:to-violet-400"
            >
              Add Module
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800/80"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModuleModal;
