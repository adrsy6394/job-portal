import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import jobSeekerService from '../services/jobSeekerService';
import ProfileForm from '../components/ProfileForm';

const JobSeekerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await jobSeekerService.getProfile();
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load profile.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdated = async (type, data) => {
    let updatedProfile;
    if (type === 'text') {
      updatedProfile = await jobSeekerService.updateProfile(data);
    } else if (type === 'file') {
      updatedProfile = await jobSeekerService.uploadResume(data);
    }
    setProfile(updatedProfile.data);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center text-primary font-semibold">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  const resumeDownloadUrl = profile.resumeUrl 
    ? `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000'}${profile.resumeUrl}`
    : null;

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary">Job Seeker Dashboard</h1>
          <p className="text-textSecondary">Manage your profile credentials and resume uploads</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary py-2 px-6 text-sm font-semibold tracking-wide uppercase"
        >
          {isEditing ? 'View Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Details Summary */}
        <div className="md:col-span-8 space-y-6">
          {isEditing ? (
            <div className="card-container bg-white">
              <ProfileForm initialData={profile} onProfileUpdated={handleProfileUpdated} />
            </div>
          ) : (
            <div className="card-container bg-white space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-1">Full Name</h3>
                <p className="text-xl font-bold text-primary">{profile.name}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-1">Email Address</h3>
                <p className="text-textSecondary">{user?.email}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-1">Education</h3>
                <p className="text-textSecondary">
                  {profile.education || <span className="italic text-textMuted">Not specified yet</span>}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-2">Skills</h3>
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="italic text-textMuted">No skills added yet</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Resume Summary */}
        <div className="md:col-span-4 space-y-6">
          <div className="card-container bg-white text-center py-10">
            <span className="text-4xl mb-4 block">📄</span>
            <h4 className="text-lg font-bold text-primary mb-2">My Resume</h4>
            {profile.resumeUrl ? (
              <div className="space-y-4">
                <p className="text-xs text-green-700 bg-green-50 py-1.5 px-3 rounded-full border border-green-150 inline-block font-semibold">
                  Uploaded & Active
                </p>
                <a
                  href={resumeDownloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary w-full text-xs py-2 block text-center"
                >
                  Download / View Resume
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-red-600 bg-red-50 py-1.5 px-3 rounded-full border border-red-100 inline-block font-semibold">
                  No Resume Uploaded
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary w-full text-xs py-2"
                >
                  Upload Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobSeekerDashboard;
