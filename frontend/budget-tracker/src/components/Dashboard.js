import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  getTransactions,
  getBudgets,
} from '../store/slices/budgetSlice';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

function Dashboard() {
  const dispatch = useDispatch();
  const { categories, transactions, budgets, loading } = useSelector(
    (state) => state.budget
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTransactions());
    dispatch(getBudgets());
  }, [dispatch]);

  const totalBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.transaction_type === 'income' ? parseFloat(transaction.amount) : -parseFloat(transaction.amount));
  }, 0);

  const recentTransactions = transactions.slice(0, 5);

  const categoryTotals = categories.map(category => {
    const total = transactions
      .filter(t => t.category === category.id)
      .reduce((acc, t) => acc + (t.transaction_type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount)), 0);
    return { ...category, total };
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Balance</Typography>
              </Box>
              <Typography variant="h4" color={totalBalance >= 0 ? 'success.main' : 'error.main'}>
                ₹{totalBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Budgets</Typography>
              </Box>
              <Typography variant="h4">{budgets.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CategoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Categories</Typography>
              </Box>
              <Typography variant="h4">{categories.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <List>
              {recentTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <ListItem>
                    <ListItemText
                      primary={transaction.description}
                      secondary={new Date(transaction.date).toLocaleDateString()}
                    />
                    <Typography
                      color={transaction.transaction_type === 'income' ? 'success.main' : 'error.main'}
                    >
                      ₹{parseFloat(transaction.amount).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Category Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Category Summary
            </Typography>
            <List>
              {categoryTotals.map((category) => (
                <React.Fragment key={category.id}>
                  <ListItem>
                    <ListItemText
                      primary={category.name}
                      secondary={`${category.transactions?.length || 0} transactions`}
                    />
                    <Typography
                      color={category.total >= 0 ? 'success.main' : 'error.main'}
                    >
                      ₹{parseFloat(category.total).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 