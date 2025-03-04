import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        <Toolbar sx={{ height: 100 }}> {/* Made toolbar taller */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center',  }}>
            {/* Placeholder for logo - you can replace this with your actual logo */}
            <Box 
              component="img"
              src="/All About.png" // You'll need to add your logo file
              alt="Logo"
              sx={{ 
                height: 100,
                width: 'auto',
                display: 'block',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            />
            <Typography 
              variant="h5" // Made text larger
              component="div" 
              sx={{ 
                cursor: 'pointer',
                color: '#48ad4d',
                fontWeight: 500 // Made text bolder
              }}
              onClick={() => navigate('/')}
            >
              All About Learning
            </Typography>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button 
              sx={{ color: '#48ad4d', fontSize: '1rem' }} // Made buttons larger
              onClick={() => navigate('/documents')}
            >
              Documents
            </Button>
            <Button 
              sx={{ color: '#48ad4d', fontSize: '1rem' }} // Made buttons larger
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

export default Navbar; 