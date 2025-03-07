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
        background: 'linear-gradient(35deg, #8B4513 20%, #A0522D 40%, #8B4513 100%)',
        borderBottom: '3px double #DEB887'
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
              src="/AllAboutLearning/images/vintage-archive-logo.png"
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
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              '&:hover': {
                color: '#DEB887'
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
                color: '#FAF0E6',
                '&:hover': { color: '#DEB887' }
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
                  backgroundColor: '#DEB887',
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
                  background: 'linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #DEB887 100%)'
                },
                '& .MuiList-root': {
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  pt: 4,
                  position: 'relative'  // Added for close button positioning
                }
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  color: '#8B4513',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  padding: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    transform: 'rotate(90deg)',
                    transition: 'all 0.3s ease'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <CloseIcon sx={{ fontSize: 32 }} />
              </IconButton>

              {/* Menu Items */}
              <MenuItem 
                onClick={() => handleNavigation('/documents')}
                sx={{ 
                  color: '#8B4513',
                  fontFamily: '"Old Standard TT", serif',
                  fontSize: '1.5rem',
                  width: '80%',
                  justifyContent: 'center',
                  borderRadius: 2,
                  py: 2,
                  mt: 6,  // Added margin top to account for close button
                  '&:hover': { 
                    backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s ease'
                  }
                }}
              >
                Archives
              </MenuItem>
              {user ? (
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    color: '#8B4513',
                    fontFamily: '"Old Standard TT", serif',
                    fontSize: '1.5rem',
                    width: '80%',
                    justifyContent: 'center',
                    borderRadius: 2,
                    py: 2,
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 69, 19, 0.1)',
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
                    color: '#8B4513',
                    fontFamily: '"Old Standard TT", serif',
                    fontSize: '1.5rem',
                    width: '80%',
                    justifyContent: 'center',
                    borderRadius: 2,
                    py: 2,
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 69, 19, 0.1)',
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
              {user?.is_admin && (  // Add this block
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
                  onClick={() => navigate('/admin')}
                >
                  Admin Dashboard
                </Button>
              )}
              {user ? (
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
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
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
                 
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
  }

export default Navbar;