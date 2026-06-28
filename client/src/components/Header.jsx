import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="py-6 px-8 flex justify-between items-center bg-transparent max-w-7xl mx-auto w-full">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-primary tracking-wider uppercase">
        JobPortal
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-primary font-medium hover:text-accent transition-colors">
          Home
        </Link>
        <Link to="/jobs" className="text-primary font-medium hover:text-accent transition-colors">
          Search Jobs
        </Link>

        {user ? (
          <>
            {/* Seeker Navigation */}
            {user.role === 'seeker' && (
              <>
                <Link to="/applied-jobs" className="text-primary font-medium hover:text-accent transition-colors">
                  Applied Jobs
                </Link>
                <Link to="/profile" className="text-primary font-medium hover:text-accent transition-colors">
                  My Profile
                </Link>
                <Link to="/profile" className="btn-primary py-2 px-5 text-sm">
                  Upload CV
                </Link>
              </>
            )}

            {/* Recruiter Navigation */}
            {user.role === 'recruiter' && (
              <>
                <Link to="/post-job" className="text-primary font-medium hover:text-accent transition-colors">
                  Post Job
                </Link>
                <Link to="/company-profile" className="text-primary font-medium hover:text-accent transition-colors">
                  Company Profile
                </Link>
              </>
            )}

            {/* Admin Navigation */}
            {user.role === 'admin' && (
              <Link to="/admin" className="text-primary font-medium hover:text-accent transition-colors">
                Admin Panel
              </Link>
            )}

            <div className="h-6 w-[1px] bg-gray-300"></div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-textSecondary hidden md:inline">
                Hi, {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-primary hover:text-accent transition-colors uppercase tracking-wider"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-primary font-medium hover:text-accent transition-colors">
              Login
            </Link>
            <Link to="/register" className="btn-primary py-2 px-5 text-sm">
              Upload CV / Join
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
