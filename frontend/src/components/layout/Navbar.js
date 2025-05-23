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
import { useAuth } from '../../context/AuthContext';  // Add this import
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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
        backgroundColor: 'secondary.main',
        borderBottom: `3px solid ${theme.palette.primary.main}`
      }}>
        <Toolbar sx={{ 
          height: { xs: 60, sm: 70, md: 100 }, // Reduced height on mobile
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { xs: '0 8px', sm: '0 16px', md: '0 24px' },
          position: 'relative'
        }}>
          {/* Logo Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexShrink: 0,
            maxWidth: { xs: '120px', sm: '150px', md: 'auto' } // Control logo size
          }}>
            <Box 
              component="img"
              src="/AllAboutLearning/images/all-about-archives-logo-2.png"
              alt="Logo"
              sx={{ 
                height: { xs: 40, sm: 50, md: 80 },
                width: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            />
          </Box>
    
          {/* Center Title - Hide on very small screens */}
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
              fontSize: { xs: '0.8rem', sm: '1.1rem', md: '1.5rem' },
              display: { xs: 'none', sm: 'block' }, // Hide on mobile
              whiteSpace: 'nowrap',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
            onClick={() => navigate('/')}
          >
            Learning at All About
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
                    backgroundColor: theme.palette.secondary.main,
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
                    background: 'white',
                    pt: 10
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
                  onClick={() => handleNavigation('/')}
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
                  Home
                </MenuItem>
    
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
                  Resources
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
                    Training & SOP's
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
            <Box sx={{ 
              marginLeft: 'auto',
              marginRight: '1rem', // Add this to create space from the right
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 1, md: 1 },
              justifyContent: 'flex-end',
              position: 'relative', // Add this
              zIndex: 1, // Add this to ensure buttons stay above other elements
              maxWidth: { xs: '100%', sm: '80%', md: 'auto' }
            }}>
              <IconButton
                sx={{ 
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  marginRight: { sm: 1, md: 1 },
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    }
                  },
                  transition: 'all 0.2s ease'
                }}
                onClick={() => navigate('/')}
              >
                <HomeIcon sx={{ 
                  fontSize: { sm: '1.1rem', md: '1.4rem' },
                  transition: 'all 0.2s ease'
                }} />
              </IconButton>
              {user?.is_admin && (
                <IconButton
                  sx={{ 
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                    marginRight: { sm: 1, md: 1 },
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      }
                    },
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => navigate('/admin')}
                  title="Admin Dashboard"
                >
                  <AdminPanelSettingsIcon sx={{ 
                    fontSize: { sm: '1.1rem', md: '1.4rem' },
                    transition: 'all 0.2s ease'
                  }} />
                </IconButton>
              )}
              <Button 
                sx={{ 
                  color: 'white',
                  fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem', lg: '1rem' },
                  fontFamily: 'Roboto, sans-serif',
                  border: `1px solid ${theme.palette.primary.main}`,
                  padding: { sm: '4px 8px', md: '6px 8px' },
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                  
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    borderColor: 'white'
                  }
                }}
                onClick={() => navigate('/documents')}
              >
                Resources
              </Button>
          
              {user && (
                <Button 
                  sx={{ 
                    color: 'white',
                    fontSize: { sm: '0.8rem', md: '1rem' },
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    padding: { sm: '4px 8px', md: '6px 8px' },
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      borderColor: 'white'
                    }
                  }}
                  onClick={() => navigate('/training')}
                >
                  Training & SOP's
                </Button>
              )}
          
              {user ? (
                <Button 
                  sx={{ 
                    color: 'white',
                    fontSize: { sm: '0.8rem', md: '1rem' },
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    padding: { sm: '4px 8px', md: '6px 8px' },
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
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
                    fontSize: { sm: '0.8rem', md: '1rem' },
                    fontFamily: 'Roboto, sans-serif',
                    border: `1px solid ${theme.palette.primary.main}`,
                    padding: { sm: '4px 8px', md: '6px 16px' },
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
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