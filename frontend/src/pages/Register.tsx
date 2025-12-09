import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import axios from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'admin' | 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/auth/register', formData);
      navigate('/login');
    } catch (err: unknown) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-500/40 via-transparent to-cyan-500/40 blur-2xl" />

        <div className="relative rounded-3xl border border-slate-700/80 bg-slate-950/80 p-8 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-glow">
              <Cpu className="h-6 w-6 text-slate-950" />
            </div>
            <h1 className="text-2xl font-bold text-slate-50">ESDC LMS</h1>
            <p className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-violet-300">
              Join the learning grid
            </p>
          </div>

          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Create account
          </h2>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
                placeholder="student@esdc.edu"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-300">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-300">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as 'admin' | 'student',
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none ring-accent-500/40 focus:border-violet-400/60 focus:ring-2"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:from-violet-400 hover:to-cyan-400 disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
