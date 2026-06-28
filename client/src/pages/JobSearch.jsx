import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import jobService from '../services/jobService';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    category: 'All',
  });

  const categories = ['All', 'Technical', 'Marketing', 'Product Dev', 'Human Resource', 'Legal', 'Sales', 'Logistics', 'Administration'];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = { ...filters };
      if (queryParams.category === 'All') {
        delete queryParams.category;
      }
      const res = await jobService.getJobs(queryParams);
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleClearFilters = () => {
    setFilters({ title: '', location: '', category: 'All' });
    // Trigger fetch directly because state updates asynchronously
    jobService.getJobs({}).then(res => setJobs(res.data)).catch(err => console.error(err));
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Search Open Positions</h1>
        <p className="text-textSecondary">Discover your next career move</p>
      </div>

      {/* Search Filter Form */}
      <form onSubmit={handleSearchSubmit} className="card-container bg-white p-6 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
            placeholder="e.g. Developer, Designer"
          />
        </div>

        <div className="flex-1 w-full text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
            placeholder="e.g. Remote, Seattle"
          />
        </div>

        <div className="w-full md:w-48 text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm cursor-pointer"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <button type="submit" className="btn-primary flex-1 md:flex-none py-3 px-8 text-sm font-semibold tracking-wide uppercase">
            Search
          </button>
          <button 
            type="button" 
            onClick={handleClearFilters}
            className="btn-secondary flex-1 md:flex-none py-3 px-6 text-sm font-semibold tracking-wide uppercase"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-primary font-semibold py-12">Searching Jobs...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold py-12">Error: {error}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-textSecondary py-12 italic">No jobs found matching your criteria.</div>
      ) : (
        /* Jobs Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              className="bg-primary text-white p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold px-3 py-1 bg-accent/20 text-accent rounded-full border border-accent/30">
                    {job.category}
                  </span>
                  <span className="text-xs text-white/60">{job.location}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white leading-snug">{job.title}</h4>
                  <p className="text-sm text-white/80 mt-1">{job.recruiter?.name || 'Recruiter'}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-xs font-semibold text-white/60">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link 
                  to={`/jobs/${job._id}`}
                  className="px-4 py-2 bg-accent text-primary font-bold rounded-lg text-xs hover:bg-accent/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default JobSearch;
