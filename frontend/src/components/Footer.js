import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';  // Add this import

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',  // Black background
        color: 'white',
        py: 2,
        mt: 'auto',
        borderTop: `3px solid ${theme.palette.primary.main}`  // Green border
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.primary.main,  // Green text
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.05em'
            }}
          >
            © {new Date().getFullYear()} All About Doors & Windows
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              href="/" 
              sx={{ 
                color: 'white',
                textDecoration: 'none', 
                '&:hover': { color: theme.palette.primary.main },  // Green on hover
                fontSize: '0.875rem',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              Home
            </Link>
            <Link 
              href="/documents" 
              sx={{ 
                color: 'white',
                textDecoration: 'none', 
                '&:hover': { color: theme.palette.primary.main },  // Green on hover
                fontSize: '0.875rem',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              Archives
            </Link>
            <Link 
              href="/login" 
              sx={{ 
                color: 'white',
                textDecoration: 'none', 
                '&:hover': { color: theme.palette.primary.main },  // Green on hover
                fontSize: '0.875rem',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              Login
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
  }

export default Footer;