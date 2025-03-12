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
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log('Attempting to create account with:', formData); // Debug log
        const response = await axios.post(
          'https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/register',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        );
        
        console.log('Account creation response:', response); // Debug log
        
        if (response.data) {
          console.log('Account created successfully');
          navigate('/login');
        }
      } catch (error) {
        console.error('Account creation failed:', error);
        setErrors({ 
          submit: error.response?.data?.detail || 'Failed to create account. Please try again.' 
        });
      }
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(75, 172, 82, 0.05)',
      '& fieldset': {
        borderColor: 'primary.main',
      },
      '&:hover fieldset': {
        borderColor: 'primary.light',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      }
    },
    '& .MuiInputLabel-root': {
      color: '#4BAC52',
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .Mui-focused .MuiInputLabel-root': {
      color: '#4BAC52',
    },
    '& .MuiFormHelperText-root': {
      color: 'error.main', // Keep error text red
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
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
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center"
            sx={{ 
              mb: 3,
              color: 'white',
              fontWeight: 600,
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 2
            }}
          >
            Create Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={textFieldStyle}
              />
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={textFieldStyle}
              />
            </Box>

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
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                ...textFieldStyle,
                mb: 2
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#4BAC52' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                ...textFieldStyle,
                mb: 2
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#4BAC52' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                ...textFieldStyle,
                mb: 3
              }}
            />

            {errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.submit}
              </Alert>
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
                backgroundColor: '#4BAC52',
                '&:hover': {
                  backgroundColor: '#3d8b42',
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              Create Account
            </Button>

            <Button
              fullWidth
              onClick={() => navigate('/login')}
              sx={{
                color: '#4BAC52',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#3d8b42',
                }
              }}
            >
              Already have an account? Sign in
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default CreateAccount;