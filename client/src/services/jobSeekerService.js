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

// Get Job Seeker Profile
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/job-seeker/profile`, getAuthConfig());
  return response.data;
};

// Update Job Seeker Profile
const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/job-seeker/profile`, profileData, getAuthConfig());
  return response.data;
};

// Upload Resume
const uploadResume = async (formData) => {
  const config = getAuthConfig();
  const multipartConfig = {
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(`${API_URL}/job-seeker/upload-resume`, formData, multipartConfig);
  return response.data;
};

const jobSeekerService = {
  getProfile,
  updateProfile,
  uploadResume,
};

export default jobSeekerService;
