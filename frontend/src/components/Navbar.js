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
        backgroundColor: '#8B4513',
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
                    backgroundColor: '#8B4513',
                    border: '1px solid #DEB887'
                  }
                }}
              >
                <MenuItem 
                  onClick={() => handleNavigation('/documents')}
                  sx={{ 
                    color: '#FAF0E6',
                    fontFamily: '"Old Standard TT", serif',
                    '&:hover': { backgroundColor: '#654321' }
                  }}
                >
                  Archives
                </MenuItem>
                {user ? (
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      color: '#FAF0E6',
                      fontFamily: '"Old Standard TT", serif',
                      '&:hover': { backgroundColor: '#654321' }
                    }}
                  >
                    Logout
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem 
                      onClick={() => handleNavigation('/login')}
                      sx={{ 
                        color: '#FAF0E6',
                        fontFamily: '"Old Standard TT", serif',
                        '&:hover': { backgroundColor: '#654321' }
                      }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleNavigation('/create-account')}
                      sx={{ 
                        color: '#FAF0E6',
                        fontFamily: '"Old Standard TT", serif',
                        '&:hover': { backgroundColor: '#654321' }
                      }}
                    >
                      Create Account
                    </MenuItem>
                  </>
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
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
  }

export default Navbar;