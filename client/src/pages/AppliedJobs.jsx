import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import jobService from '../services/jobService';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const res = await jobService.getAppliedJobs();
        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch applied jobs.');
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-primary font-semibold">Loading applied jobs...</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">Applied Jobs</h1>
        <p className="text-textSecondary">Monitor status and history of your job applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="card-container bg-white text-center py-16 space-y-4">
          <span className="text-4xl">🔍</span>
          <h3 className="text-xl font-bold text-primary">No applications found</h3>
          <p className="text-textSecondary max-w-sm mx-auto">You haven't applied to any job postings yet. Explore open positions to begin.</p>
          <Link to="/jobs" className="btn-primary py-2.5 px-6 inline-block font-semibold">
            Search Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <motion.div
              key={app._id}
              className="card-container bg-white hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              whileHover={{ scale: 1.01 }}
            >
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full mb-2 inline-block">
                  {app.job?.category || 'General'}
                </span>
                <h3 className="text-lg font-bold text-primary">{app.job?.title || 'Unknown Position'}</h3>
                <p className="text-sm text-textSecondary">{app.job?.recruiter?.name || 'Recruiter'}</p>
                <div className="flex gap-4 items-center text-xs text-textMuted mt-2">
                  <span>📍 {app.job?.location || 'Unknown Location'}</span>
                  <span>📅 Applied on: {new Date(app.appliedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  to={`/jobs/${app.job?._id}`}
                  className="btn-secondary text-xs py-2 px-4 text-center w-full sm:w-auto"
                >
                  View Job Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AppliedJobs;
