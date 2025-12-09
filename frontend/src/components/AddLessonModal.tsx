import { useState } from 'react';
import { X } from 'lucide-react';

interface AddLessonModalProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    contentType: string;
    contentURL?: string;
    textContent?: string;
  }) => void;
}

const AddLessonModal = ({ onClose, onSubmit }: AddLessonModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    contentType: 'text',
    contentURL: '',
    textContent: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: {
      title: string;
      contentType: string;
      contentURL?: string;
      textContent?: string;
    } = {
      title: formData.title,
      contentType: formData.contentType,
    };

    if (formData.contentType === 'text') {
      submitData.textContent = formData.textContent;
    } else {
      submitData.contentURL = formData.contentURL;
    }

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-violet-500/40 bg-bg-card shadow-[0_0_60px_rgba(168,85,247,0.5)]">
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-violet-300">
              New Lesson
            </p>
            <h2 className="text-lg font-semibold text-slate-50">
              Add lesson to module
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
              Lesson Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
              placeholder="Timers & Interrupts on ARM"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">
              Content Type
            </label>
            <select
              value={formData.contentType}
              onChange={(e) =>
                setFormData({ ...formData, contentType: e.target.value })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
            >
              <option value="text">Text Content</option>
              <option value="video">Video</option>
              <option value="pdf">PDF Document</option>
              <option value="link">External Link</option>
            </select>
          </div>

          {formData.contentType === 'text' ? (
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">
                Text Content
              </label>
              <textarea
                required
                rows={6}
                value={formData.textContent}
                onChange={(e) =>
                  setFormData({ ...formData, textContent: e.target.value })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
                placeholder="Write the explanation, code snippets, and notes here..."
              />
            </div>
          ) : (
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">
                Content URL
              </label>
              <input
                type="url"
                required
                value={formData.contentURL}
                onChange={(e) =>
                  setFormData({ ...formData, contentURL: e.target.value })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
                placeholder="https://example.com/video-or-pdf"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                You can paste a YouTube link, hosted video, or PDF URL.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:from-violet-400 hover:to-cyan-400"
            >
              Add Lesson
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

export default AddLessonModal;
