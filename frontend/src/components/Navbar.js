import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
  
    return (
      <AppBar position="static" sx={{ 
        backgroundColor: '#8B4513',
        borderBottom: '3px double #DEB887'
      }}>
        <Toolbar sx={{ 
          height: 100,
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative'  // Added for absolute positioning of center text
        }}> 
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4
          }}>
            <Box 
              component="img"
              src="/AllAboutLearning/images/vintage-archive-logo.png"
              alt="Logo"
              sx={{ 
                height: 80,
                width: 'auto',
                display: 'block',
                cursor: 'pointer',
                mixBlendMode: 'normal'
              }}
              onClick={() => navigate('/')}
            />
          </Box>

          {/* Centered title */}
          <Typography 
            variant="h5"
            component="div" 
            sx={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              color: '#FAF0E6',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: '2px solid #DEB887',
              paddingBottom: '4px',
              '&:hover': {
                color: '#DEB887'
              }
            }}
            onClick={() => navigate('/')}
          >
            The All About Archives
          </Typography>

          <Box sx={{ marginLeft: 'auto' }}>
            <Button 
              sx={{ 
                color: '#FAF0E6',
                fontSize: '1rem',
                fontFamily: '"Old Standard TT", serif',
                border: '1px solid #DEB887',
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: '#654321',
                  borderColor: '#FAF0E6'
                }
              }}
              onClick={() => navigate('/documents')}
            >
              Archives
            </Button>
            <Button 
              sx={{ 
                color: '#FAF0E6',
                fontSize: '1rem',
                fontFamily: '"Old Standard TT", serif',
                border: '1px solid #DEB887',
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: '#654321',
                  borderColor: '#FAF0E6'
                }
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              sx={{ 
                color: '#FAF0E6',
                fontSize: '0.9rem',
                fontFamily: '"Old Standard TT", serif',
                border: '1px solid #DEB887',
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: '#654321',
                  borderColor: '#FAF0E6'
                }
              }}
              onClick={() => navigate('/create-account')}
            >
              Create Account
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

export default Navbar;