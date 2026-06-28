import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth header config
const getAuthConfig = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  return {};
};

// Get all jobs (with optional filters)
const getJobs = async (filters) => {
  const response = await axios.get(`${API_URL}/jobs`, { params: filters });
  return response.data;
};

// Get single job details
const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/jobs/${id}`);
  return response.data;
};

// Apply for a job
const applyToJob = async (id) => {
  const response = await axios.post(`${API_URL}/jobs/${id}/apply`, {}, getAuthConfig());
  return response.data;
};

// Get applied jobs for Seeker
const getAppliedJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs/seeker/applied`, getAuthConfig());
  return response.data;
};

const jobService = {
  getJobs,
  getJobById,
  applyToJob,
  getAppliedJobs,
};

export default jobService;
