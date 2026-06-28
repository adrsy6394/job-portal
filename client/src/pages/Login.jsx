import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationError, setValidationError] = useState('');

  const { login, user, error, setError } = useContext(AuthContext);
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

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
    if (setError) setError(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!email || !password) {
      setValidationError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <motion.div 
      className="max-w-md mx-auto mt-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-container bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">Welcome Back</h2>
        <p className="text-textSecondary text-center mb-8">Login to manage your profile, postings, or applications</p>

        {/* Display Errors */}
        {(validationError || error) && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center border border-red-100">
            {validationError || error}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left">
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-4 py-3 text-sm font-semibold tracking-wide uppercase">
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-textSecondary mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
