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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Lesson</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Variables and Data Types"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={formData.contentType}
              onChange={(e) =>
                setFormData({ ...formData, contentType: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="text">Text Content</option>
              <option value="video">Video</option>
              <option value="pdf">PDF Document</option>
              <option value="link">External Link</option>
            </select>
          </div>

          {formData.contentType === 'text' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                required
                rows={6}
                value={formData.textContent}
                onChange={(e) =>
                  setFormData({ ...formData, textContent: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                placeholder="Enter the lesson content here..."
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content URL
              </label>
              <input
                type="url"
                required
                value={formData.contentURL}
                onChange={(e) =>
                  setFormData({ ...formData, contentURL: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="https://example.com/video.mp4"
              />
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Lesson
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
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
