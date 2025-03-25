import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './common/StaggeredFadeIn';

function TrainingDocs() {
  const navigate = useNavigate();
  const theme = useTheme();

  const departments = [
    {
      id: 'web',
      title: 'Web Department',
      description: 'Training materials and SOPs for web operations, content management, and digital processes.',
      image: '/AllAboutLearning/images/web-department-training.png',
      path: '/training/web'
    },
    {
      id: 'customer-service',
      title: 'Customer Service',
      description: 'Guidelines, procedures, and training for customer support and service excellence.',
      image: '/AllAboutLearning/images/customer-service-training.png',
      path: '/training/customer-service'
    },
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Shipping procedures, packaging guidelines, and logistics training materials.',
      image: '/AllAboutLearning/images/shipping-training.png',
      path: '/training/shipping'
    },
    /*
    {
      id: 'receiving',
      title: 'Receiving',
      description: 'Inventory management, receiving procedures, and warehouse operations training.',
      image: '/AllAboutLearning/images/receiving-training.png',
      path: '/training/receiving'
    }
    */
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            color: 'black',
            fontFamily: 'Roboto, sans-serif',
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            pb: 2
          }}
        >
          Training & Standard Operating Procedures
        </Typography>
      </StaggeredFadeIn>

      <Grid container spacing={3}>
        {departments.map((dept, index) => (
          <Grid item xs={12} sm={6} md={4} key={dept.id}>
            <StaggeredFadeIn delay={index * 0.1}>
              <Card 
                onClick={() => navigate(dept.path)}
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
                  image={dept.image}
                  alt={dept.title}
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
                    {dept.title}
                  </Typography>
                  <Typography 
                    variant="body2"
                    color="white"
                  >
                    {dept.description}
                  </Typography>
                </CardContent>
              </Card>
            </StaggeredFadeIn>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TrainingDocs;