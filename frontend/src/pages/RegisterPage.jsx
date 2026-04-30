<<<<<<< HEAD
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { validators, runValidators } from '../utils/validators';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {
      name: runValidators(form.name, [validators.required, validators.minLength(2)]),
      email: runValidators(form.email, [validators.required, validators.email]),
      password: runValidators(form.password, [validators.required, validators.minLength(8)])
    };
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authService.register(form);
      const { token, user } = res.data.data;
      login(token, user);
      toast.success('Account created! Welcome aboard 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Start managing tasks today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full name" placeholder="Jane Doe" value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} error={errors.name} />
          <Input label="Email address" type="email" placeholder="you@example.com" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
          <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} error={errors.password} />
          <Button type="submit" className="w-full" loading={loading} size="lg">Create account</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
=======
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { validators, runValidators } from '../utils/validators';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {
      name: runValidators(form.name, [validators.required, validators.minLength(2)]),
      email: runValidators(form.email, [validators.required, validators.email]),
      password: runValidators(form.password, [validators.required, validators.minLength(8)])
    };
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authService.register(form);
      const { token, user } = res.data.data;
      login(token, user);
      toast.success('Account created! Welcome aboard 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Start managing tasks today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full name" placeholder="Jane Doe" value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} error={errors.name} />
          <Input label="Email address" type="email" placeholder="you@example.com" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
          <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} error={errors.password} />
          <Button type="submit" className="w-full" loading={loading} size="lg">Create account</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
};