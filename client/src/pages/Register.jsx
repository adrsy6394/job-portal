import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker', // seeker or recruiter
  });
  const [validationError, setValidationError] = useState('');
  
  const { register, user, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect
    if (user) {
      navigate('/');
    }
    return () => {
      if (setError) setError(null);
    };
  }, [user, navigate, setError]);

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
    if (setError) setError(null);
  };

  const handleRoleToggle = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setValidationError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      // Handled by AuthContext error state
    }
  };

  return (
    <motion.div 
      className="max-w-md mx-auto mt-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-container bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">Create Account</h2>
        <p className="text-textSecondary text-center mb-6">Join our professional recruitment network</p>

        {/* Role Selection Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-full mb-6">
          <button
            type="button"
            onClick={() => handleRoleToggle('seeker')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              role === 'seeker' ? 'bg-primary text-white shadow-sm' : 'text-textSecondary hover:text-primary'
            }`}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => handleRoleToggle('recruiter')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              role === 'recruiter' ? 'bg-primary text-white shadow-sm' : 'text-textSecondary hover:text-primary'
            }`}
          >
            Recruiter
          </button>
        </div>

        {/* Display Errors */}
        {(validationError || error) && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center border border-red-100">
            {validationError || error}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm transition-all"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm transition-all"
              placeholder="Min 6 characters"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm transition-all"
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-4 py-3 text-sm font-semibold tracking-wide uppercase">
            Register as {role === 'seeker' ? 'Job Seeker' : 'Recruiter'}
          </button>
        </form>

        <p className="text-center text-sm text-textSecondary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
