import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from '@mui/material';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password2' && e.target.value !== formData.password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setPasswordError('Passwords do not match');
      return;
    }
    const result = await dispatch(register(formData));
    if (!result.error) {
      navigate('/');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error.detail || 'Registration failed'}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="new-password"
              value={formData.password2}
              onChange={handleChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !!passwordError}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                {'Already have an account? Sign in'}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register; 