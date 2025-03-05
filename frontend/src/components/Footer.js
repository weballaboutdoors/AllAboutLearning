import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

function Footer() {
    return (
      <Box
        sx={{
          backgroundColor: '#8B4513',  // Vintage brown
          color: '#FAF0E6',  // Antique white
          py: 2,
          mt: 'auto',
          borderTop: '3px double #DEB887'  // Decorative border
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
                color: '#DEB887',  // Burlywood
                fontFamily: '"Old Standard TT", serif',
                letterSpacing: '0.05em'
              }}
            >
              © {new Date().getFullYear()} All About Doors & Windows
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link 
                href="/" 
                sx={{ 
                  color: '#FAF0E6',
                  textDecoration: 'none', 
                  '&:hover': { color: '#DEB887' },
                  fontSize: '0.875rem',
                  fontFamily: '"Old Standard TT", serif',
                  letterSpacing: '0.05em'
                }}
              >
                Home
              </Link>
              <Link 
                href="/documents" 
                sx={{ 
                  color: '#FAF0E6',
                  textDecoration: 'none', 
                  '&:hover': { color: '#DEB887' },
                  fontSize: '0.875rem',
                  fontFamily: '"Old Standard TT", serif',
                  letterSpacing: '0.05em'
                }}
              >
                Archives
              </Link>
              <Link 
                href="/login" 
                sx={{ 
                  color: '#FAF0E6',
                  textDecoration: 'none', 
                  '&:hover': { color: '#DEB887' },
                  fontSize: '0.875rem',
                  fontFamily: '"Old Standard TT", serif',
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