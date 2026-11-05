 import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Books API
export const booksAPI = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post('/books/add', bookData),
  update: (id, bookData) => api.post(`/books/update/${id}`, bookData),
  delete: (id) => api.delete(`/books/${id}`),
};

// Members API
export const membersAPI = {
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  create: (memberData) => api.post('/members/add', memberData),
  update: (id, memberData) => api.post(`/members/update/${id}`, memberData),
  delete: (id) => api.delete(`/members/${id}`),
};

// Transactions API
export const transactionsAPI = {
  getAll: () => api.get('/transactions'),
  getByMember: (memberId) => api.get(`/transactions/member/${memberId}`),
  issueBook: (transactionData) => api.post('/transactions/issue', transactionData),
  returnBook: (id) => api.post(`/transactions/return/${id}`),
};

export default api;