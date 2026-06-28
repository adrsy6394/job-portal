import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import jobService from '../services/jobService';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyStatus, setApplyStatus] = useState({ loading: false, success: false, message: '' });
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      try {
        setLoading(true);
        const jobRes = await jobService.getJobById(id);
        setJob(jobRes.data);

        // If user is seeker, check if they already applied to this job
        if (user && user.role === 'seeker') {
          const appliedRes = await jobService.getAppliedJobs();
          const appliedList = appliedRes.data || [];
          const applied = appliedList.some(app => app.job?._id === id);
          setHasApplied(applied);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch job details.');
        setLoading(false);
      }
    };

    fetchJobAndApplications();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'seeker') {
      setApplyStatus({ loading: false, success: false, message: 'Only job seekers can apply for jobs.' });
      return;
    }

    setApplyStatus({ loading: true, success: false, message: '' });
    try {
      await jobService.applyToJob(id);
      setApplyStatus({ loading: false, success: true, message: 'Successfully applied!' });
      setHasApplied(true);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to apply.';
      setApplyStatus({ loading: false, success: false, message: errMsg });
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-primary font-semibold">Loading job details...</div>;
  }

  if (error || !job) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-red-600 font-semibold">Error: {error || 'Job not found'}</div>;
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/jobs" className="text-primary hover:text-accent font-bold inline-block mb-6">&larr; Back to Job Search</Link>

      <div className="card-container bg-white p-8 md:p-12 shadow-sm space-y-8">
        {/* Job Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-primary/10">
          <div>
            <div className="flex gap-2 items-center mb-2">
              <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                {job.category}
              </span>
              <span className="text-xs text-textSecondary">{job.location}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary">{job.title}</h1>
            <p className="text-textSecondary mt-1">Posted by {job.recruiter?.name || 'Recruiter'}</p>
          </div>

          <div className="w-full md:w-auto">
            {hasApplied ? (
              <button disabled className="btn-secondary w-full md:w-auto opacity-60 cursor-not-allowed">
                Already Applied
              </button>
            ) : (
              <button 
                onClick={handleApply}
                disabled={applyStatus.loading}
                className="btn-primary w-full md:w-auto font-semibold uppercase tracking-wider text-sm"
              >
                {applyStatus.loading ? 'Applying...' : 'Apply for this Job'}
              </button>
            )}
          </div>
        </div>

        {/* Status Alerts */}
        {applyStatus.message && (
          <div className={`p-4 rounded-xl text-sm border text-center ${
            applyStatus.success ? 'bg-green-50 text-green-700 border-green-150' : 'bg-red-50 text-red-700 border-red-150'
          }`}>
            {applyStatus.message}
          </div>
        )}

        {/* Job Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">Job Description</h3>
          <p className="text-textSecondary leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        {/* Footer Details */}
        <div className="pt-6 border-t border-primary/10 text-xs text-textMuted flex justify-between items-center">
          <span>Job ID: {job._id}</span>
          <span>Posted on: {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
