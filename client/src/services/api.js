// client/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getQuizzes = () => API.get('/quiz');
export const getUserResults = (userId) => API.get(`/quiz/results/${userId}`);
export const getAllResults = () => API.get('/quiz/all-results');
export const addQuiz = (data) => API.post('/quiz', data);
export const updateQuiz = (id, data) => API.put(`/quiz/${id}`, data);
export const deleteQuiz = (id) => API.delete(`/quiz/${id}`);


