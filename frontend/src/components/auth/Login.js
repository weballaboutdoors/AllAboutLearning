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
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';



function Login() {
  const theme = useTheme();
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
    
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? process.env.REACT_APP_PROD_API_URL 
      : process.env.REACT_APP_API_URL;
  
    try {
      console.log('Attempting login...');
      const response = await axios.post(
        `${apiUrl}/api/login`,
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false
        }
      );
      
      console.log('Login response:', response.data); // Debug log
      
      if (response.data && response.data.access_token) {
        const token = `Bearer ${response.data.access_token}`;
        localStorage.setItem('token', token);
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('Is admin:', response.data.user.is_admin); // Add this debug log
        
        if (response.data.user.is_admin) {
          console.log('Navigating to admin dashboard...'); // Add this debug log
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error details:', error.response?.data);
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
            backgroundColor: '#f1f8e9',  // Changed to white
            border: `1px solid ${theme.palette.primary.main}`,  // Added green border
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center"
            sx={{ 
              mb: 3,
              color: theme.palette.primary.main,  // Changed to green
              fontWeight: 600,
              fontFamily: 'Roboto, sans-serif',
              borderBottom: `2px solid ${theme.palette.primary.main}`,  // Added border bottom
              pb: 2
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
            sx={{ 
              mb: 2,
              '& .MuiInputLabel-root': {
                color: theme.palette.primary.main,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.light,
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#000000',  // Added black text color
              },
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
                    sx={{ color: theme.palette.primary.main }}  // Added green color to icon
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiInputLabel-root': {
                color: theme.palette.primary.main,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.light,
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#000000',  // Added black text color
              },
            }}
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
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              Sign In
            </Button>
  
            <Button
              fullWidth
              onClick={() => navigate('/create-account')}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'rgba(75, 172, 82, 0.1)',  // Added light green hover
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