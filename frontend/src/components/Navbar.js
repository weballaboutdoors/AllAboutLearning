import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Add this import
import CloseIcon from '@mui/icons-material/Close';
function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();  // Add this
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      logout();
      navigate('/');
      handleClose();
    };

    const handleNavigation = (path) => {
      navigate(path);
      handleClose();
    };
  
    return (
      <AppBar position="static" sx={{ 
        backgroundColor: 'secondary.main',  // Black background
        borderBottom: `3px solid ${theme.palette.primary.main}`  // Green border
      }}>
        <Toolbar sx={{ 
          height: { xs: 70, md: 100 },
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative'
        }}> 
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4
          }}>
            <Box 
              component="img"
              src="/AllAboutLearning/images/all-about-archives.png"
              alt="Logo"
              sx={{ 
                height: { xs: 50, md: 80 },
                width: 'auto',
                display: 'block',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            />
          </Box>
    
          <Typography 
            variant="h5"
            component="div" 
            sx={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              color: 'white',
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: '4px',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
            onClick={() => navigate('/')}
          >
            The All About Archives
          </Typography>
    
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ 
                  color: 'white',
                  '&:hover': { color: theme.palette.primary.main }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: 'white',
                    width: '100vw',
                    height: '100vh',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    position: 'fixed',
                    top: '0 !important',
                    left: '0 !important',
                    m: 0,
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white'
                  },
                  '& .MuiList-root': {
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    pt: 4,
                    position: 'relative'
                  }
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: theme.palette.primary.main,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '50%',
                    padding: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(75, 172, 82, 0.1)',
                      transform: 'rotate(90deg)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CloseIcon sx={{ fontSize: 32 }} />
                </IconButton>
    
                <MenuItem 
                  onClick={() => handleNavigation('/documents')}
                  sx={{ 
                    color: 'secondary.main',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '1.5rem',
                    width: '80%',
                    justifyContent: 'center',
                    borderRadius: 2,
                    py: 2,
                    mt: 6,
                    '&:hover': { 
                      backgroundColor: 'rgba(75, 172, 82, 0.1)',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s ease'
                    }
                  }}
                >
                  Archives
                </MenuItem>
    
                {user && (
                  <MenuItem 
                    onClick={() => handleNavigation('/training')}
                    sx={{ 
                      color: 'secondary.main',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '1.5rem',
                      width: '80%',
                      justifyContent: 'center',
                      borderRadius: 2,
                      py: 2,
                      '&:hover': { 
                        backgroundColor: 'rgba(75, 172, 82, 0.1)',
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    Training & SOPs
                  </MenuItem>
                )}
    
                {user ? (
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      color: 'secondary.main',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '1.5rem',
                      width: '80%',
                      justifyContent: 'center',
                      borderRadius: 2,
                      py: 2,
                      '&:hover': { 
                        backgroundColor: 'rgba(75, 172, 82, 0.1)',
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    Logout
                  </MenuItem>
                ) : (
                  <MenuItem 
                    onClick={() => handleNavigation('/login')}
                    sx={{ 
                      color: 'secondary.main',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '1.5rem',
                      width: '80%',
                      justifyContent: 'center',
                      borderRadius: 2,
                      py: 2,
                      '&:hover': { 
                        backgroundColor: 'rgba(75, 172, 82, 0.1)',
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    Login
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ marginLeft: 'auto' }}>
              <Button 
                sx={{ 
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'Roboto, sans-serif',
                  border: `1px solid ${theme.palette.primary.main}`,
                  margin: '0 8px',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    borderColor: 'white'
                  }
                }}
                onClick={() => navigate('/documents')}
              >
                Archives
              </Button>
    
              {user && (
                <Button 
                  sx={{ 
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    margin: '0 8px',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      borderColor: 'white'
                    }
                  }}
                  onClick={() => navigate('/training')}
                >
                  Training & SOPs
                </Button>
              )}
    
              {user?.is_admin && (
                <Button 
                  sx={{ 
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    margin: '0 8px',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      borderColor: 'white'
                    }
                  }}
                  onClick={() => navigate('/admin')}
                >
                  Admin Dashboard
                </Button>
              )}
    
              {user ? (
                <Button 
                  sx={{ 
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    margin: '0 8px',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      borderColor: 'white'
                    }
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  sx={{ 
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    margin: '0 8px',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      borderColor: 'white'
                    }
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
  }

export default Navbar;