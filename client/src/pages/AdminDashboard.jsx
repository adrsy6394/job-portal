import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('users'); // users, jobs, applications
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMsg, setActionMsg] = useState({ type: '', text: '' });

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const usersRes = await adminService.getUsers();
      setUsers(usersRes.data || []);

      const jobsRes = await adminService.getJobs();
      setJobs(jobsRes.data || []);

      const applicationsRes = await adminService.getApplications();
      setApplications(applicationsRes.data || []);

      setLoading(false);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        logout();
        navigate('/login');
        return;
      }
      setError(err.response?.data?.message || err.message || 'Failed to fetch admin data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        navigate('/');
      } else {
        fetchAdminData();
      }
    }
  }, [user, authLoading, navigate]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This will also remove their associated profile, jobs, and applications.')) {
      return;
    }
    setActionMsg({ type: '', text: '' });
    try {
      await adminService.deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      // Refresh entire dashboard to reflect cascading deletions
      const jobsRes = await adminService.getJobs();
      setJobs(jobsRes.data || []);
      const applicationsRes = await adminService.getApplications();
      setApplications(applicationsRes.data || []);
      
      setActionMsg({ type: 'success', text: 'User deleted successfully.' });
    } catch (err) {
      setActionMsg({ type: 'error', text: err.message || 'Failed to delete user.' });
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This will remove all associated job seeker applications.')) {
      return;
    }
    setActionMsg({ type: '', text: '' });
    try {
      await adminService.deleteJob(id);
      setJobs(jobs.filter(j => j._id !== id));
      // Refresh applications to reflect cascading deletions
      const applicationsRes = await adminService.getApplications();
      setApplications(applicationsRes.data || []);

      setActionMsg({ type: 'success', text: 'Job deleted successfully.' });
    } catch (err) {
      setActionMsg({ type: 'error', text: err.message || 'Failed to delete job.' });
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }
    setActionMsg({ type: '', text: '' });
    try {
      await adminService.deleteApplication(id);
      setApplications(applications.filter(a => a._id !== id));
      setActionMsg({ type: 'success', text: 'Application deleted successfully.' });
    } catch (err) {
      setActionMsg({ type: 'error', text: err.message || 'Failed to delete application.' });
    }
  };

  if (authLoading || loading) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-primary font-semibold">Loading Admin Dashboard...</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-8 py-20 text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">Admin Control Center</h1>
        <p className="text-textSecondary">Oversee users, jobs, and application mappings across the system</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-primary/10 gap-4 mb-8">
        <button
          onClick={() => { setActiveTab('users'); setActionMsg({ type: '', text: '' }); }}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'users' ? 'border-accent text-primary' : 'border-transparent text-textMuted hover:text-primary'
          }`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => { setActiveTab('jobs'); setActionMsg({ type: '', text: '' }); }}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'jobs' ? 'border-accent text-primary' : 'border-transparent text-textMuted hover:text-primary'
          }`}
        >
          Jobs ({jobs.length})
        </button>
        <button
          onClick={() => { setActiveTab('applications'); setActionMsg({ type: '', text: '' }); }}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'applications' ? 'border-accent text-primary' : 'border-transparent text-textMuted hover:text-primary'
          }`}
        >
          Applications ({applications.length})
        </button>
      </div>

      {actionMsg.text && (
        <div className={`p-4 rounded-xl text-sm border text-center mb-6 ${
          actionMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-150' : 'bg-red-50 text-red-700 border-red-150'
        }`}>
          {actionMsg.text}
        </div>
      )}

      {/* Tab Content: Users */}
      {activeTab === 'users' && (
        <div className="card-container bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-primary/15 text-primary font-bold">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 uppercase">Role</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-semibold text-primary">{u.name}</td>
                  <td className="py-3.5 px-4 text-textSecondary">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-md ${
                      u.role === 'recruiter' ? 'bg-accent/20 text-primary' : 'bg-primary/10 text-primary'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-xs font-bold text-red-600 hover:underline uppercase"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Jobs */}
      {activeTab === 'jobs' && (
        <div className="card-container bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-primary/15 text-primary font-bold">
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-semibold text-primary">{j.title}</td>
                  <td className="py-3.5 px-4 text-textSecondary">{j.recruiter?.name || 'Unknown'}</td>
                  <td className="py-3.5 px-4">{j.category}</td>
                  <td className="py-3.5 px-4 text-textSecondary">{j.location}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteJob(j._id)}
                      className="text-xs font-bold text-red-600 hover:underline uppercase"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Applications */}
      {activeTab === 'applications' && (
        <div className="card-container bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-primary/15 text-primary font-bold">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Candidate Email</th>
                <th className="py-3 px-4">Applied For</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-semibold text-primary">{a.seeker?.name || 'Unknown'}</td>
                  <td className="py-3.5 px-4 text-textSecondary">{a.seeker?.email || 'N/A'}</td>
                  <td className="py-3.5 px-4 text-primary font-medium">{a.job?.title || 'Unknown Job'}</td>
                  <td className="py-3.5 px-4 text-textSecondary">{a.job?.location || 'N/A'}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteApplication(a._id)}
                      className="text-xs font-bold text-red-600 hover:underline uppercase"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
