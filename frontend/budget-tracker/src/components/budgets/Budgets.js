import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getCategories,
  getTransactions,
} from '../../store/slices/budgetSlice';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

function Budgets() {
  const dispatch = useDispatch();
  const { budgets, categories, transactions, loading, error } = useSelector(
    (state) => state.budget
  );
  const [open, setOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    currency: 'INR'
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBudgets());
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    // console.log('Budgets:', budgets);
    // console.log('Categories:', categories);
    // console.log('Transactions:', transactions);
  }, [budgets, categories, transactions]);

  const handleOpen = (budget = null) => {
    if (budget) {
      setEditingBudget(budget);
      setFormData({
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
        currency: 'INR'
      });
    } else {
      setEditingBudget(null);
      setFormData({
        category: '',
        amount: '',
        period: 'monthly',
        currency: 'INR'
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBudget(null);
    setFormData({
      category: '',
      amount: '',
      period: 'monthly',
      currency: 'INR'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      amount: parseFloat(formData.amount),
      month: new Date().toISOString().split('T')[0],
      period: formData.period || 'monthly'
    };
    if (editingBudget) {
      await dispatch(updateBudget({ id: editingBudget.id, ...submitData }));
    } else {
      await dispatch(createBudget(submitData));
    }
    handleClose();
    dispatch(getBudgets());
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await dispatch(deleteBudget(id));
    }
  };

  const calculateProgress = (budget) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyExpenses = transactions
      .filter(
        (t) =>
          t.category === budget.category &&
          t.transaction_type === 'expense' &&
          new Date(t.date) >= startOfMonth &&
          new Date(t.date) <= endOfMonth
      )
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const budgetAmount = parseFloat(budget.amount);
    const progress = (monthlyExpenses / budgetAmount) * 100;
    return {
      spent: monthlyExpenses,
      progress: Math.min(progress, 100),
      remaining: Math.max(budgetAmount - monthlyExpenses, 0),
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Budgets</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Budget
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && budgets.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No budgets found. Create your first budget by clicking the "Add Budget" button.
        </Alert>
      )}

      <Grid container spacing={3}>
        {budgets.map((budget) => {
          const { spent, progress, remaining } = calculateProgress(budget);
          const category = categories.find((c) => c.id === budget.category);
          const period = budget.period || 'monthly';
          const budgetAmount = parseFloat(budget.amount);

          return (
            <Grid item xs={12} md={6} lg={4} key={budget.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{category?.name || 'Uncategorized'}</Typography>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(budget)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(budget.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {period.charAt(0).toUpperCase() + period.slice(1)} Budget
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    ₹{budgetAmount.toFixed(2)}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Spent: ₹{spent.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Remaining: ₹{remaining.toFixed(2)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      color={progress > 100 ? 'error' : 'primary'}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingBudget ? 'Edit Budget' : 'Add Budget'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No categories available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: '8px' }}>₹</span>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Period</InputLabel>
                  <Select
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    label="Period"
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.category || !formData.amount}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Budgets; 