<<<<<<< HEAD
// ♻️ Wrap any route that requires authentication
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from '../ui/Spinner';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  return user ? children : <Navigate to="/login" replace />;
=======
// ♻️ Wrap any route that requires authentication
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from '../ui/Spinner';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  return user ? children : <Navigate to="/login" replace />;
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
};