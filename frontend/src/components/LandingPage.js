import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 4
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 6,
            backgroundColor: 'transparent',
            border: '3px double #8B4513',
            maxWidth: 800
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#8B4513',
              fontFamily: '"Playfair Display", serif',
              mb: 3,
              letterSpacing: '0.1em'
            }}
          >
            Welcome to The All About Archives
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: '#654321',
              fontFamily: '"Old Standard TT", serif',
              mb: 4,
              fontStyle: 'italic'
            }}
          >
            Employee Access Portal
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#5C4033',
              fontFamily: '"Courier Prime", monospace',
              mb: 4,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            This is a secure access point for authorized personnel only. 
            Please log in to access the archive system.
          </Typography>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              color: '#8B4513',
              borderColor: '#8B4513',
              fontFamily: '"Old Standard TT", serif',
              fontSize: '1.1rem',
              padding: '12px 40px',
              '&:hover': {
                backgroundColor: '#8B4513',
                color: '#FAF0E6',
                borderColor: '#8B4513'
              }
            }}
          >
            Employee Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default LandingPage;