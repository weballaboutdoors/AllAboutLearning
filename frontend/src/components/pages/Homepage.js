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
  Divider,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAuth } from '../../context/AuthContext';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import { useTheme } from '@mui/material/styles';

function Homepage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const theme = useTheme();
  const sections = [
    {
      title: 'Archives',
      description: 'Access Door & Window Part Documents and Records',
      icon: <img 
      src="/AllAboutLearning/images/warehouse-archive.png"
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
      details: `The Training & SOPs section is your comprehensive learning hub, featuring materials from our weekly training sessions and essential company procedures. 
      
      Standard Operating Procedures (SOPs)
      - Quality assurance checklists
      - Safety protocols and best practices
      - Company policies and procedures
      
      Professional Development
      - Industry standards and updates
      - Advanced troubleshooting techniques
      - Product knowledge assessments
      
      Stay current with our latest training materials and enhance your expertise through our regularly updated resources. Access everything you need to excel in your role and deliver outstanding service to our customers.`
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
      <StaggeredFadeIn delay={0}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'black',
              fontFamily: 'Roboto, sans-serif',
              borderBottom: '3px double black',
              pb: 2,
              mb: 2,
              fontSize: '2.5rem',  // Added
              fontWeight: 500     // Added
            }}
          >
            Welcome, {user?.firstName} {user?.lastName}
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'black',
              fontFamily: 'Roboto, sans-serif',
              mb: 3,
              fontSize: '1.1rem'  // Added
            }}
          >
            Access to All About Doors & comprehensive document library and training materials
          </Typography>
        </Box>
      </StaggeredFadeIn>
  
      {sections.map((section, index) => (
        <StaggeredFadeIn key={section.title} delay={0.2 * (index + 1)}>
          <React.Fragment>
            <Paper 
              elevation={0}
              sx={{ 
                mb: 4, 
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
              <Grid container spacing={4} direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3, 
                    backgroundColor: '#F8F9FA',
                    border: '1px solid black',
                    borderRadius: '10px',
                    height: '100%',
                    maxWidth: '800px',
                    maxHeight: '695px',
                    padding: '1px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'  // Added
                  }}>
                    <Card
                      onClick={() => navigate(section.path)}
                      sx={{ 
                        height: '100%',
                        backgroundColor: '#F8F9FA',
                        border: 'none',
                        transition: 'transform 0.2s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1)',
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.7)'
                        }
                      }}
                    >
                      <CardContent sx={{ 
                        p: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '1rem'
                      }}>
                        <Box sx={{ 
                          mb: 2,
                          width: '100%',    // Added
                          display: 'flex',  // Added
                          justifyContent: 'center',  // Added
                          alignItems: 'center',       // Added
                          '& img': {  // Add filter to the image
                            filter: 'brightness(0.8) contrast(1.4) saturate(1.6)',  // Subtle enhancement
                            // OR try these alternatives:
                            // filter: 'grayscale(100%)',  // Black and white
                            // filter: 'sepia(50%)',  // Vintage look
                            // filter: 'opacity(0.8)',  // Slightly faded
                            // filter: 'brightness(0.8) contrast(1.2) saturate(1.2)',  // Rich and deep
                            // filter: 'hue-rotate(45deg)',  // Color shift
                            transition: 'filter 0.3s ease',  // Smooth transition
                            '&:hover': {
                              filter: 'brightness(0.8) contrast(1.4) saturate(1.6)'  // Remove filter on hover
                              // OR
                              // filter: 'brightness(1.1)',  // Brighten on hover
                            }
                          }
                        }}>
                          {section.icon}
                        </Box>
                        <Typography 
                          variant="h5" 
                          component="h2"
                          sx={{ 
                            color: 'black',
                            fontFamily: 'Roboto, sans-serif',
                            mb: 1,
                            fontWeight: 500  // Added
                          }}
                        >
                          {section.title}
                        </Typography>
                        <Typography 
                          sx={{ 
                            mb: 1,
                            color: 'black',
                            fontFamily: 'Roboto, sans-serif'
                          }}
                        >
                          {section.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3, 
                    height: '100%',
                    maxHeight: '695px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#F1F8E9',
                    border: '1px solid black',
                    borderRadius: '10px',
                    padding: '2rem',  // Updated
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'  // Added
                  }}>
                    <Typography
                      sx={{
                        color: 'black',
                        fontFamily: 'Roboto, sans-serif',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.9,
                        '& li': {        // Added
                          marginBottom: '0.5rem'
                        }
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
                    my: 6,
                    borderColor: 'rgba(0, 0, 0, 0.12)',  // Updated
                    borderWidth: 1,
                    width: '90%',    // Updated
                    margin: '48px auto',
                    opacity: 0.5     // Updated
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