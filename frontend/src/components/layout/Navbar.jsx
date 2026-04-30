<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <Link to="/dashboard" className="text-xl font-bold text-indigo-600 tracking-tight">
        ⚡ TaskFlow
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <span className="hidden sm:block">{user.name}</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </nav>
  );
=======
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <Link to="/dashboard" className="text-xl font-bold text-indigo-600 tracking-tight">
        ⚡ TaskFlow
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <span className="hidden sm:block">{user.name}</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </nav>
  );
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
};