import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';




function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const response = await axios.post(
        'https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/login',
        {
          email: formData.email,
          password: formData.password
        }
      );
      
      if (response.data && response.data.access_token) {
        // Store the token with Bearer prefix
        const token = `Bearer ${response.data.access_token}`;
        console.log('Storing token:', token); // Debug log
        localStorage.setItem('token', token);
        
        // Update the auth context with user data
        setUser(response.data.user);  // Add this line!
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        if (response.data.user.is_admin) {
          navigate('/admin');
        } else {
          navigate('/documents');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Invalid email or password' });
    }
  };

  return (
    <Container maxWidth="sm">
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
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center"
            sx={{ 
              mb: 3,
              color: 'primary.main',
              fontWeight: 600
            }}
          >
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.submit}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              Sign In
            </Button>

            <Button
              fullWidth
              onClick={() => navigate('/create-account')}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'primary.main',
                }
              }}
            >
              Don't have an account? Create one
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;