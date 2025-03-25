import React from 'react';
import { Box } from '@mui/material';

const StaggeredFadeIn = ({ children, delay = 0 }) => {
  return (
    <Box
      sx={{
        opacity: 0,
        animation: 'fadeIn 0.8s ease-in forwards',
        animationDelay: `${delay}s`,
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {children}
    </Box>
  );
};

export default StaggeredFadeIn;