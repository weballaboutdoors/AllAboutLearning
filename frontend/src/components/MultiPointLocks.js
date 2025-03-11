import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './StaggeredFadeIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 


function MultiPointLocks() {
  const theme = useTheme();
  const navigate = useNavigate();

  const lockGuides = [
    {
      id: 'Hoppe HLS7 MPL',
      title: 'Hoppe HLS7',
      description: 'Comprehensive guide for the Hoppe HLS7 multi-point lock system',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    },
    {
      id: 'Amesbury Truth MPL',
      title: 'Amesbury Truth',
      description: 'Comprehensive guide for the Amesbury Truth multi-point lock system',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    },
    {
      id: 'Andersen MPL',
      title: 'Andersen ',
      description: 'Comprehensive guide for the Andersen multi-point lock system',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    },
    {
      id: 'Fuhr MPL',
      title: 'Fuhr',
      description: 'Comprehensive guide for the Fuhr multi-point lock system',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    },
    /*
    {
      id: 'Essve MPL',
      title: 'Essve',
      description: 'How to properly adjust multi-point locks for optimal security and operation',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    },
    {
      id: 'replacement',
      title: 'Parts Replacement',
      description: 'Guides for identifying and replacing various multi-point lock components',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    }
    */
  ];

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
          Multi-Point Locks
        </Typography>
      </StaggeredFadeIn>

      <StaggeredFadeIn delay={0.2}>
        <Grid container spacing={3}>
          {lockGuides.map((guide) => (
            <Grid item xs={12} md={6} key={guide.id}>
              <Card 
                onClick={() => navigate(`/archives/multipoint-locks/${guide.id}`)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: 'background.paper',
                  border: `1px solid ${theme.palette.primary.main}`,
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    borderColor: theme.palette.primary.dark,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="470"
                  image={guide.image}
                  alt={guide.title}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                />
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white',
                      fontFamily: 'Roboto, sans-serif',
                      mb: 1
                    }}
                  >
                    {guide.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: 'white'
                    }}
                  >
                    {guide.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StaggeredFadeIn>
    </Container>
  );
}

export default MultiPointLocks;