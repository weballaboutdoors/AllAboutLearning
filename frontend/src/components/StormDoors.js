import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './StaggeredFadeIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 


function StormDoors() {
  const theme = useTheme();
  const navigate = useNavigate();

  const stormGuides = [
    {
      id: 'Columbia Storm Window',
      title: 'Columbia Storm Window',
      description: 'Comprehensive guide for the Columbia Storm Window',
      image: '/AllAboutLearning/images/storm-window.png'
    },
    {
      id: 'Columbia Storm Door',
      title: 'Columbia Storm Door',
      description: 'Comprehensive guide for the Columbia Storm Door',
      image: '/AllAboutLearning/images/storm-door.png'
    },
    {
      id: 'Andersen Storm Door',
      title: 'Andersen Storm Door',
      description: 'Comprehensive guide for the Andersen Storm Door',
      image: '/AllAboutLearning/images/andersen-storm-door.png'
    },
    /*
    {
      id: 'Andersen Storm Window',
      title: 'Andersen Storm Window',
      description: 'Comprehensive guide for the Andersen Storm Window',
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
          Storm Doors & Windows
        </Typography>
      </StaggeredFadeIn>

      <StaggeredFadeIn delay={0.2}>
        <Grid container spacing={3}>
          {stormGuides.map((guide, index) => (
            <Grid item xs={12} sm={6} md={4} key={guide.id}>
              <StaggeredFadeIn delay={index * 0.1}>
                <Card 
                  onClick={() => navigate(`/archives/storm-doors-and-windows/${guide.id}`)}
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
                    image={guide.image}
                    alt={guide.title}
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
                      {guide.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color="white"
                    >
                      {guide.description}
                    </Typography>
                  </CardContent>
                </Card>
              </StaggeredFadeIn>
            </Grid>
          ))}
        </Grid>
      </StaggeredFadeIn>
    </Container>
  );
}

export default StormDoors;