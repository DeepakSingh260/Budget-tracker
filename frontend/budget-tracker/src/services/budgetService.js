import api from './api';
import API_CONFIG from '../config/api';

// Categories
export const getCategories = () => api.get(API_CONFIG.ENDPOINTS.CATEGORIES);
export const createCategory = (categoryData) => api.post(API_CONFIG.ENDPOINTS.CATEGORIES, categoryData);
export const updateCategory = (id, categoryData) => api.put(`${API_CONFIG.ENDPOINTS.CATEGORIES}${id}/`, categoryData);
export const deleteCategory = (id) => api.delete(`${API_CONFIG.ENDPOINTS.CATEGORIES}${id}/`);

// Transactions
export const getTransactions = () => api.get(API_CONFIG.ENDPOINTS.TRANSACTIONS);
export const createTransaction = (transactionData) => api.post(API_CONFIG.ENDPOINTS.TRANSACTIONS, transactionData);
export const updateTransaction = (id, transactionData) => api.put(`${API_CONFIG.ENDPOINTS.TRANSACTIONS}${id}/`, transactionData);
export const deleteTransaction = (id) => api.delete(`${API_CONFIG.ENDPOINTS.TRANSACTIONS}${id}/`);

// Budgets
export const getBudgets = () => api.get(API_CONFIG.ENDPOINTS.BUDGETS);
export const createBudget = (budgetData) => api.post(API_CONFIG.ENDPOINTS.BUDGETS, budgetData);
export const updateBudget = (id, budgetData) => api.put(`${API_CONFIG.ENDPOINTS.BUDGETS}${id}/`, budgetData);
export const deleteBudget = (id) => api.delete(`${API_CONFIG.ENDPOINTS.BUDGETS}${id}/`);

const budgetService = {
  // Categories
  async getCategories() {
    const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES);
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post(API_CONFIG.ENDPOINTS.CATEGORIES, categoryData);
    return response.data;
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.CATEGORIES}${id}/`, categoryData);
    return response.data;
  },

  async deleteCategory(id) {
    await api.delete(`${API_CONFIG.ENDPOINTS.CATEGORIES}${id}/`);
  },

  // Transactions
  async getTransactions() {
    const response = await api.get(API_CONFIG.ENDPOINTS.TRANSACTIONS);
    return response.data;
  },

  async createTransaction(transactionData) {
    const response = await api.post(API_CONFIG.ENDPOINTS.TRANSACTIONS, transactionData);
    return response.data;
  },

  async updateTransaction(id, transactionData) {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.TRANSACTIONS}${id}/`, transactionData);
    return response.data;
  },

  async deleteTransaction(id) {
    await api.delete(`${API_CONFIG.ENDPOINTS.TRANSACTIONS}${id}/`);
  },

  // Budgets
  async getBudgets() {
    const response = await api.get(API_CONFIG.ENDPOINTS.BUDGETS);
    return response.data;
  },

  async createBudget(budgetData) {
    const response = await api.post(API_CONFIG.ENDPOINTS.BUDGETS, budgetData);
    return response.data;
  },

  async updateBudget(id, budgetData) {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.BUDGETS}${id}/`, budgetData);
    return response.data;
  },

  async deleteBudget(id) {
    await api.delete(`${API_CONFIG.ENDPOINTS.BUDGETS}${id}/`);
  },
};

export default budgetService; 