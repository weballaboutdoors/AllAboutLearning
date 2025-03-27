import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './common/StaggeredFadeIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DoorBottoms() {
  const theme = useTheme();
  const navigate = useNavigate();

  const doorBottomGuide = {
    id: 'door-bottoms-guide',
    title: 'Door Bottoms & Sweeps',
    description: 'Comprehensive guide covering all types of door bottoms, sweeps, and their applications',
    image: '/AllAboutLearning/images/door-bottoms.png'
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        <Button 
          onClick={() => navigate('/archives')}
          sx={{ 
            color: theme.palette.primary.main,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.primary.dark
            }
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back to Archives
        </Button>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            color: 'secondary.main',
            fontFamily: 'Roboto, sans-serif',
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            pb: 2
          }}
        >
          Door Bottoms & Sweeps
        </Typography>
      </StaggeredFadeIn>

      <StaggeredFadeIn delay={0.2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              onClick={() => navigate(`/archives/door-bottoms/${doorBottomGuide.id}`)}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                backgroundColor: 'background.paper',
                border: `1px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                }
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={doorBottomGuide.image}
                alt={doorBottomGuide.title}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    opacity: .5
                  }
                }}
              />
              <CardContent>
                <Typography 
                  variant="h6" 
                  component="h2"
                  sx={{ 
                    mb: 1,
                    color: 'primary.main'
                  }}
                >
                  {doorBottomGuide.title}
                </Typography>
                <Typography 
                  variant="body2"
                  color="white"
                >
                  {doorBottomGuide.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </StaggeredFadeIn>
    </Container>
  );
}

export default DoorBottoms;