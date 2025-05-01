import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lightMintGreen = 'rgba(204, 255, 204, 0.9)';  // Very light, soft mint green

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: isMobile ? 2 : 4,
            px: isMobile ? 2 : 4,
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.03,
              
              backgroundRepeat: 'repeat',
              pointerEvents: 'none'
            }}
          />

          <Paper
            elevation={3}
            sx={{
              p: isMobile ? 3 : 6,
              backgroundColor: 'black',
              border: `3px double ${lightMintGreen}`,
              maxWidth: isMobile ? '100%' : 800,
              margin: isMobile ? 2 : 'auto',
              width: isMobile ? '90%' : 'auto',
              position: 'relative',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box
              sx={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: lightMintGreen,
                boxShadow: '0 4px 12px rgba(245, 245, 245, 0.2)'
              }}
            >
              <img
                src="/AllAboutLearning/all-about-archives-logo.png"
                alt="All About Learning Logo"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'contain'
                }}
              />
            </Box>

            <Typography
              variant={isMobile ? "h3" : "h2"}
              sx={{
                color: lightMintGreen,
                fontFamily: 'Roboto, sans-serif',
                mb: isMobile ? 2 : 3,
                letterSpacing: '0.1em',
                fontSize: isMobile ? '2rem' : '3.75rem',
                wordWrap: 'break-word',
                fontWeight: 500,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Learning at All About
            </Typography>
            
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                color: lightMintGreen,
                fontFamily: 'Roboto, sans-serif',
                mb: isMobile ? 2 : 4,
                fontStyle: 'italic',
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                opacity: 0.9
              }}
            >
              Employee Access Portal
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: lightMintGreen,
                fontFamily: 'Roboto, sans-serif',
                mb: isMobile ? 3 : 4,
                maxWidth: isMobile ? '100%' : 600,
                mx: 'auto',
                fontSize: isMobile ? '0.9rem' : '1rem',
                px: isMobile ? 2 : 0,
                lineHeight: 1.8
              }}
            >
              This is a secure access point for authorized personnel only. 
              Please log in to access resources and training materials.
            </Typography>

            <Button
              variant="outlined"
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate('/login')}
              startIcon={<LockIcon sx={{ color: lightMintGreen }} />}
              sx={{
                color: lightMintGreen,
                borderColor: lightMintGreen,
                fontFamily: 'Roboto, sans-serif',
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '8px 24px' : '12px 40px',
                width: isMobile ? '100%' : 'auto',
                marginTop: isMobile ? 2 : 0,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: lightMintGreen,
                  color: 'black',
                  borderColor: lightMintGreen,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(245, 245, 245, 0.2)'
                },
                '&:active': {
                  transform: 'scale(0.98)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Employee Login
            </Button>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 4,
                color: lightMintGreen,
                fontSize: '0.8rem'
              }}
            >
              © {new Date().getFullYear()} All About Doors & Windows
            </Typography>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
}

export default LandingPage;