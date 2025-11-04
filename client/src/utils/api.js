import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const interviewAPI = {
  create: (data) => api.post('/interviews', data),
  getUserInterviews: (userEmail) => api.get(`/interviews/user/${userEmail}`),
  getDetails: (mockId) => api.get(`/interviews/details/${mockId}`),
};

// Feedback API calls
export const feedbackAPI = {
  save: (data) => api.post('/feedback', data),
  get: (mockId) => api.get(`/feedback/${mockId}`),
};

export default api;