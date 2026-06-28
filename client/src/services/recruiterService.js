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

// Get Company Profile
const getCompanyProfile = async () => {
  const response = await axios.get(`${API_URL}/recruiter/profile`, getAuthConfig());
  return response.data;
};

// Update Company Profile
const updateCompanyProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/recruiter/profile`, profileData, getAuthConfig());
  return response.data;
};

// Post a new job listing
const postJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/recruiter/jobs`, jobData, getAuthConfig());
  return response.data;
};

// Get jobs posted by this recruiter
const getRecruiterJobs = async () => {
  const response = await axios.get(`${API_URL}/recruiter/my-jobs`, getAuthConfig());
  return response.data;
};

// Get applicants for a specific job
const getJobApplicants = async (jobId) => {
  const response = await axios.get(`${API_URL}/recruiter/jobs/${jobId}/applicants`, getAuthConfig());
  return response.data;
};

const recruiterService = {
  getCompanyProfile,
  updateCompanyProfile,
  postJob,
  getRecruiterJobs,
  getJobApplicants,
};

export default recruiterService;
