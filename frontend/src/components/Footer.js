import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

function Footer() {
    return (
      <Box
        sx={{
          backgroundColor: '#000000',
          color: '#ffffff',
          py: 2, // Reduced padding
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Typography variant="body2" sx={{ color: '#48ad4d' }}>
              © {new Date().getFullYear()} All About Learning
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="/" color="inherit" sx={{ 
                textDecoration: 'none', 
                '&:hover': { color: '#48ad4d' },
                fontSize: '0.875rem'
              }}>
                Home
              </Link>
              <Link href="/documents" color="inherit" sx={{ 
                textDecoration: 'none', 
                '&:hover': { color: '#48ad4d' },
                fontSize: '0.875rem'
              }}>
                Documents
              </Link>
              <Link href="/login" color="inherit" sx={{ 
                textDecoration: 'none', 
                '&:hover': { color: '#48ad4d' },
                fontSize: '0.875rem'
              }}>
                Login
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

export default Footer;