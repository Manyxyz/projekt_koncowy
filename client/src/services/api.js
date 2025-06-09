import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getQuizzes = () => API.get('/quiz');
export const getUserResults = (userId) => API.get(`/quiz/results/${userId}`);
export const getAllResults = () => API.get('/quiz/all-results');
export const addQuiz = (data) => API.post('/quiz', data);
export const updateQuiz = (id, data) => API.put(`/quiz/${id}`, data);
export const deleteQuiz = (id) => API.delete(`/quiz/${id}`);
export const changeUsername = (userId, newUsername) => API.put('/auth/username', { userId, newUsername });
export const changePassword = (userId, oldPassword, newPassword) => API.put('/auth/password', { userId, oldPassword, newPassword });
export const deleteAccount = (userId) => API.delete('/auth/delete', { data: { userId } });


