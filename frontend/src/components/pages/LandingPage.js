import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          gap: isMobile ? 2 : 4,
          px: isMobile ? 2 : 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 3 : 6,
            backgroundColor: 'transparent',
            border: `3px double ${theme.palette.primary.main}`,
            maxWidth: isMobile ? '100%' : 800,
            margin: isMobile ? 2 : 'auto',
            width: isMobile ? '90%' : 'auto'
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              color: 'black',
              fontFamily: 'Roboto, sans-serif',
              mb: isMobile ? 2 : 3,
              letterSpacing: '0.1em',
              fontSize: isMobile ? '2rem' : '3.75rem',
              wordWrap: 'break-word'
            }}
          >
            Welcome to The All About Archives
          </Typography>
          
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              color: 'black',
              fontFamily: 'Roboto, sans-serif',
              mb: isMobile ? 2 : 4,
              fontStyle: 'italic',
              fontSize: isMobile ? '1.1rem' : '1.5rem'
            }}
          >
            Employee Access Portal
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'black',
              fontFamily: 'Roboto, sans-serif',
              mb: isMobile ? 3 : 4,
              maxWidth: isMobile ? '100%' : 600,
              mx: 'auto',
              fontSize: isMobile ? '0.9rem' : '1rem',
              px: isMobile ? 2 : 0
            }}
          >
            This is a secure access point for authorized personnel only. 
            Please log in to access the archive system.
          </Typography>

          <Button
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            onClick={() => navigate('/login')}
            sx={{
              color: 'black',
              borderColor: 'black',
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? '1rem' : '1.1rem',
              padding: isMobile ? '8px 24px' : '12px 40px',
              width: isMobile ? '100%' : 'auto',
              marginTop: isMobile ? 2 : 0,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,  // Green background
                color: 'white',
                borderColor: theme.palette.primary.main,  // Green border
              },
              '&:active': {
                transform: 'scale(0.98)'
              },
              transition: 'all 0.2s ease'
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