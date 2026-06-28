import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import recruiterService from '../services/recruiterService';
import ApplicantList from '../components/ApplicantList';

const RecruiterDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('profile'); // profile or postings
  const [formData, setFormData] = useState({
    companyName: '',
    companyDetails: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const profileRes = await recruiterService.getCompanyProfile();
      setProfile(profileRes.data);
      setFormData({
        companyName: profileRes.data.companyName || '',
        companyDetails: profileRes.data.companyDetails || '',
      });

      const jobsRes = await recruiterService.getRecruiterJobs();
      setJobs(jobsRes.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!formData.companyName) {
      setStatusMsg({ type: 'error', text: 'Company name is required.' });
      return;
    }

    try {
      const res = await recruiterService.updateCompanyProfile(formData);
      setProfile(res.data);
      setStatusMsg({ type: 'success', text: 'Company profile updated successfully!' });
      setIsEditing(false);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to save changes.' });
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-primary font-semibold">Loading company dashboard...</div>;
  }

  if (error || !profile) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-red-600 font-semibold">Error: {error || 'Profile not found'}</div>;
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">Recruiter Workspace</h1>
        <p className="text-textSecondary">Manage company details, listings, and view incoming applications</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-primary/10 gap-4 mb-8">
        <button
          onClick={() => { setActiveTab('profile'); setSelectedJob(null); }}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'profile' ? 'border-accent text-primary' : 'border-transparent text-textMuted hover:text-primary'
          }`}
        >
          Company Profile
        </button>
        <button
          onClick={() => setActiveTab('postings')}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'postings' ? 'border-accent text-primary' : 'border-transparent text-textMuted hover:text-primary'
          }`}
        >
          Job Postings ({jobs.length})
        </button>
      </div>

      {statusMsg.text && (
        <div className={`p-4 rounded-xl text-sm border text-center mb-6 ${
          statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-150' : 'bg-red-50 text-red-700 border-red-150'
        }`}>
          {statusMsg.text}
        </div>
      )}

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="card-container bg-white p-8 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-primary/10 mb-6">
            <h2 className="text-xl font-bold text-primary">Company Info</h2>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setStatusMsg({ type: '', text: '' });
              }}
              className="btn-secondary py-1.5 px-4 text-xs font-semibold uppercase"
            >
              {isEditing ? 'Cancel' : 'Edit Info'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={onSubmit} className="space-y-6 text-left">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">Company Description</label>
                <textarea
                  name="companyDetails"
                  value={formData.companyDetails}
                  onChange={onChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-sm resize-none"
                  placeholder="Describe company operations, culture, benefits..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-sm font-semibold tracking-wide uppercase">
                Save Company Settings
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-1">Company Name</h3>
                <p className="text-2xl font-bold text-primary">{profile.companyName}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-1">About Company</h3>
                <p className="text-textSecondary leading-relaxed whitespace-pre-line">
                  {profile.companyDetails || <span className="italic text-textMuted">No details added yet. Click edit to configure company information.</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Postings & Applicants */}
      {activeTab === 'postings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Job Postings List */}
          <div className={`${selectedJob ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
            <h2 className="text-xl font-bold text-primary mb-4 text-left">My Active Job Listings</h2>
            {jobs.length === 0 ? (
              <div className="card-container bg-white text-center py-12">
                <p className="text-textSecondary italic mb-4">You haven't posted any job listings yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className={`card-container bg-white p-5 cursor-pointer hover:shadow-md transition-all border text-left flex justify-between items-center ${
                      selectedJob?._id === job._id ? 'border-accent ring-2 ring-accent/20' : 'border-gray-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded-md mb-2 inline-block">
                        {job.category}
                      </span>
                      <h3 className="font-bold text-primary text-base leading-tight">{job.title}</h3>
                      <p className="text-xs text-textSecondary mt-1">📍 {job.location}</p>
                    </div>
                    <span className="text-xs font-bold text-primary">View Applicants &rarr;</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Applicant List Panel */}
          {selectedJob && (
            <div className="lg:col-span-7 card-container bg-white p-6 shadow-sm border border-gray-150">
              <ApplicantList jobId={selectedJob._id} jobTitle={selectedJob.title} />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default RecruiterDashboard;
