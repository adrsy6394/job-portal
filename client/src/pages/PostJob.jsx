import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import recruiterService from '../services/recruiterService';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    location: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = ['Technical', 'Marketing', 'Product Dev', 'Human Resource', 'Legal', 'Sales', 'Logistics', 'Administration'];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { title, category, location, description } = formData;

    // Basic Validation
    if (!title || !category || !location || !description) {
      setError('Please fill in all fields to create a job listing.');
      setLoading(false);
      return;
    }

    try {
      await recruiterService.postJob(formData);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/jobs');
      }, 1500);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to create job listing.';
      setError(errMsg);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Create Job Posting</h1>
        <p className="text-textSecondary">Publish openings to source candidates from our network</p>
      </div>

      <div className="card-container bg-white p-8 md:p-10 shadow-sm">
        {/* Success Alert */}
        {success && (
          <div className="bg-green-50 text-green-700 border border-green-150 p-4 rounded-xl text-center mb-6 font-semibold">
            Job Posting created successfully! Redirecting...
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-150 p-4 rounded-xl text-center mb-6 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
                placeholder="e.g. Lead Designer, Software Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
                placeholder="e.g. Seattle, WA or Remote"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm cursor-pointer"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="8"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm resize-none"
              placeholder="Describe roles, responsibilities, salary, and requirements..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="btn-primary w-full py-3 text-sm font-semibold tracking-wide uppercase disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Job Posting'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default PostJob;
