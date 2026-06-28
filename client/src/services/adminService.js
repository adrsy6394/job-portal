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

// Users management
const getUsers = async () => {
  const response = await axios.get(`${API_URL}/admin/users`, getAuthConfig());
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/users/${id}`, getAuthConfig());
  return response.data;
};

// Jobs management
const getJobs = async () => {
  const response = await axios.get(`${API_URL}/admin/jobs`, getAuthConfig());
  return response.data;
};

const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/jobs/${id}`, getAuthConfig());
  return response.data;
};

// Applications management
const getApplications = async () => {
  const response = await axios.get(`${API_URL}/admin/applications`, getAuthConfig());
  return response.data;
};

const deleteApplication = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/applications/${id}`, getAuthConfig());
  return response.data;
};

const adminService = {
  getUsers,
  deleteUser,
  getJobs,
  deleteJob,
  getApplications,
  deleteApplication,
};

export default adminService;
