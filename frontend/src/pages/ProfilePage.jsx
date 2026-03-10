import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Navbar } from '../components/layout/Navbar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { validators, runValidators } from '../utils/validators';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', avatar: user?.avatar || '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = runValidators(form.name, [validators.required, validators.minLength(2)]);
    if (nameErr) { setErrors({ name: nameErr }); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await authService.updateProfile(form);
      updateUser(res.data.data.user);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-2xl">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium capitalize">{user?.role}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))} error={errors.name} />
            <Input label="Email address" value={user?.email} disabled
              className="bg-gray-50 cursor-not-allowed" />
            <Input label="Avatar URL" placeholder="https://..." value={form.avatar}
              onChange={e => setForm(p => ({ ...p, avatar: e.target.value }))} />
            <Button type="submit" loading={loading} size="lg">Save Changes</Button>
          </form>
        </div>
      </main>
    </div>
  );
};