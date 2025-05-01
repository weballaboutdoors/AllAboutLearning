import React from 'react';
import { Breadcrumbs, Link, Typography, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, useNavigate } from 'react-router-dom';

const BreadcrumbTrail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Define your route mappings - add more as needed
  const pathMap = {
    'documents': 'Resources',
    'resources': 'Resources',
    'multipoint-locks': 'Multi-Point Locks',
    'door-bottoms': 'Door Bottoms & Sweeps',
    'storm-doors-and-windows': 'Storm Doors & Windows',
    'hinges': 'Door Hinges',
    'videos': 'All About Videos',
    'login': 'Login',
    'profile': 'Profile',
    'admin': 'Admin',
    'guide': 'Guide',
    'training': 'Training',
    'web': 'Web Department Training Guide',
    'Hoppe HLS7 MPL': 'Hoppe HLS7',
    'Amesbury Truth MPL': 'Amesbury Truth',
    'Andersen MPL': 'Andersen',
    'door-bottoms-guide': 'Door Bottoms & Sweeps Guide',
    'new-parts-estimate': 'New Parts Estimate Training'
  };

  const createBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    return (
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ 
          mb: 1,
          '& .MuiBreadcrumbs-separator': {
            color: theme.palette.primary.main
          }
        }}
      >
        <Link
          color="inherit"
          onClick={() => navigate('/')}
          sx={{
            cursor: 'pointer',
            textDecoration: 'none',
            color: theme.palette.primary.main,
            '&:hover': { 
              color: theme.palette.primary.dark,
              textDecoration: 'underline'
            }
          }}
        >
          Home
        </Link>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          // Decode the URL segment
          const decodedValue = decodeURIComponent(value);
          
          return last ? (
            <Typography 
              key={to}
              sx={{ 
                color: 'text.primary',
                fontWeight: 500
              }}
            >
              {pathMap[decodedValue] || decodedValue}
            </Typography>
          ) : (
            <Link
              color="inherit"
              key={to}
              onClick={() => navigate(to)}
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: theme.palette.primary.main,
                '&:hover': { 
                  color: theme.palette.primary.dark,
                  textDecoration: 'underline'
                }
              }}
            >
              {pathMap[decodedValue] || decodedValue}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return createBreadcrumbs();
};

export default BreadcrumbTrail;
