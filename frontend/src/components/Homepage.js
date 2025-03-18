import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAuth } from '../context/AuthContext';
import StaggeredFadeIn from './StaggeredFadeIn';

function Homepage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const sections = [
    {
      title: 'Archives',
      description: 'Access Door & Window Part Documents and Records',
      icon: <img 
      src="/AllAboutLearning/images/vecteezy-archive.png"
      alt="Archives" 
      style={{ 
        width: '500px',  // Increased size
        height: '300px', // Increased size
        objectFit: 'cover',
        borderRadius: '6px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)' // Slight zoom on hover
        }
      }} 
    />,
      path: '/documents',
      color: 'white',
      details: `The Archives section is your go-to resource for accessing all class materials and documentation from our weekly training sessions. 
      Here you'll find comprehensive information covered in our owner-led classes, including:
      
      - Multipoint Lock Installation & Troubleshooting
      - Door Closer Setup & Adjustments
      - Hinge Selection & Applications
      - Sliding Door Hardware Systems
      - Window Hardware Solutions
      - Door Hardware Best Practices
      - Weatherstripping Installation
      - Threshold Types & Installation
      - Automatic Door Operators
      
      Each section contains detailed notes, specifications, and technical documentation from our weekly training sessions, allowing you to review and reference the material at any time. Stay up-to-date with our latest training materials and enhance your product knowledge through these valuable resources.`
    },
    {
      title: 'Training & SOPs',
      description: 'View Training Materials & Operating Procedures',
      icon: <img 
      src="/AllAboutLearning/images/training-sop.png"
      alt="Archives" 
      style={{ 
        width: '500px',  // Increased size
        height: '300px', // Increased size
        objectFit: 'cover',
        borderRadius: '6px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)' // Slight zoom on hover
        }
      }} 
    />,
      path: '/training',
      color: 'white',
      details: `The Training & SOPs section is your go-to resource for professional development and standardized procedures. 
      This section includes:
      
      Standard Operating Procedures (SOPs)
      - Step-by-step guides for common processes
      - Quality control procedures
      - Safety protocols
      
      Training Materials
      - New employee onboarding documents
      - Skill development resources
      - Best practices guides
      
      Reference Materials
      - Quick reference guides
      - Process flowcharts
      - Troubleshooting guides`
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'black',
            fontFamily: 'Roboto, sans-serif',
            borderBottom: '3px double black',
            pb: 2,
            mb: 2
          }}
        >
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'black',
            fontFamily: 'Roboto, sans-serif',
            mb: 3
          }}
        >
          Access our comprehensive document library and training materials
        </Typography>
      </Box>
      </StaggeredFadeIn>
      {sections.map((section, index) => (
        <StaggeredFadeIn key={section.title} delay={0.2 * (index + 1)}>
        <React.Fragment key={section.title}>
        <Paper 
          key={section.title}
          elevation={0}
          sx={{ 
            mb: 4, 
            backgroundColor: 'transparent',
            border: 'none'
          }}
        >
          <Grid container spacing={4} direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
            <Grid item xs={12} md={6}>
            <Card
              onClick={() => navigate(section.path)}
              sx={{ 
                height: '100%',
                maxWidth: '800px',
                backgroundColor: '#F8F9FA',
                border: '1px solid black',
                borderRadius: '12px', // More rounded corners
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <CardContent sx={{ 
                p: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem' // Add space between elements
              }}>
                  <Box sx={{ mb: 2 }}>
                    {section.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{ 
                      color: 'black',
                      fontFamily: 'Roboto, sans-serif',
                      mb: 1
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mb: 2,
                      color: 'black',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >
                    {section.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(section.path)}
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        borderColor: 'black'
                      },
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >
                    Access {section.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Typography
                  sx={{
                    color: 'black',
                    fontFamily: 'Roboto, sans-serif',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.8
                  }}
                >
                  {section.details}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        {index < sections.length - 1 && (
          <StaggeredFadeIn delay={0.2 * (index + 1)}>
          <Divider 
            sx={{ 
            my: 6,  // margin top and bottom
            borderColor: 'black',  // matches your theme
            borderWidth: 1,
            width: '100%',  // makes it centered
            margin: '48px auto',  // centers the divider
            opacity: 0.7  // makes it slightly subtle
          }} 
        />
        </StaggeredFadeIn>
      )}
    </React.Fragment>
    </StaggeredFadeIn>
  ))}
    </Container>
  );
}

export default Homepage;