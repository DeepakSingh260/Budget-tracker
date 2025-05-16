import api from './api';

const budgetService = {
  // Categories
  async getCategories() {
    const response = await api.get('/categories/');
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post('/categories/', categoryData);
    return response.data;
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`/categories/${id}/`, categoryData);
    return response.data;
  },

  async deleteCategory(id) {
    await api.delete(`/categories/${id}/`);
  },

  // Transactions
  async getTransactions() {
    const response = await api.get('/transactions/');
    return response.data;
  },

  async createTransaction(transactionData) {
    const response = await api.post('/transactions/', transactionData);
    return response.data;
  },

  async updateTransaction(id, transactionData) {
    const response = await api.put(`/transactions/${id}/`, transactionData);
    return response.data;
  },

  async deleteTransaction(id) {
    await api.delete(`/transactions/${id}/`);
  },

  // Budgets
  async getBudgets() {
    const response = await api.get('/budgets/');
    return response.data;
  },

  async createBudget(budgetData) {
    const response = await api.post('/budgets/', budgetData);
    return response.data;
  },

  async updateBudget(id, budgetData) {
    const response = await api.put(`/budgets/${id}/`, budgetData);
    return response.data;
  },

  async deleteBudget(id) {
    await api.delete(`/budgets/${id}/`);
  },
};

export default budgetService; 