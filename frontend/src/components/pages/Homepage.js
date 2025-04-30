import React, { useState } from 'react';
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
import SearchBar from '../common/SearchBar';
import searchIndex from '../../searchIndex';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';

function Homepage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const theme = useTheme();
  const sections = [
    {
      title: 'Archives',
      description: 'Access Door & Window Part Documents & Videos',
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

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const normalizeText = (text) => {
    return text.toLowerCase()
      .replace(/-/g, '') // Remove hyphens
      .replace(/\s+/g, '') // Remove spaces
      .replace(/[.,]/g, ''); // Remove periods and commas
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    
    const normalizedQuery = normalizeText(query);

    const results = searchIndex.filter(item => {
      const normalizedTitle = normalizeText(item.title || '');
      const normalizedDescription = normalizeText(item.description || '');
      const normalizedDetails = normalizeText(item.details || '');

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedDetails.includes(normalizedQuery)
      );
    });

    setSearchResults(results);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        {/* Flex container for welcome and search bar */}
        <Box
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: 2,
          }}
        >
          <Box sx={{ width: 1, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                pb: 0,
                borderBottom: '3px double #4bac52',
                mb: 2,
                mt: 1
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'black',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '2.7rem',
                  fontWeight: 500,
                  mb: 1,
                  lineHeight: 1.8
                }}
              >
                Welcome, {user?.firstName} {user?.lastName}
              </Typography>

              <SearchBar 
                onSearch={handleSearch}
                sx={{
                  backgroundColor: '#f1f8e9',
                  border: '1.5px solid #4bac52',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  color: 'black',
                  minWidth: '320px',
                  alignSelf: 'flex-start',
                  mt: .5,
                  mb: 4,
                  '& input': {
                    color: 'black',
                    fontFamily: 'Roboto, sans-serif',
                  },
                }}
              />
            </Box>
            
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'black',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '1.1rem'
                
              }}
            >
              Access to All About Doors & comprehensive document library and training materials
            </Typography>
          </Box>
        </Box>

        {/* Search Results Display */}
        {searching && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {searchResults.length > 0 ? (
              <Paper sx={{ p: 2, backgroundColor: '#f1f8e9', border: '1px solid #4bac52' }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'black', fontWeight: 500 }}>
                  Search Results:
                </Typography>
                <Grid container spacing={3} maxWidth="lg">
                  {searchResults.map((result, idx) => (
                    <Grid item xs={12} md={6} key={result.title}>
                      <Box
                        sx={{
                          height: '100%',
                          p: 3,
                          borderRadius: 2,
                          backgroundColor: '#fff',
                          border: '1px solid #e0e0e0',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          '&:hover': { 
                            backgroundColor: '#e8f5e9',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                        onClick={() => {
                          if (result.type === 'video') {
                            navigate(result.path);
                            setTimeout(() => {
                              const videoElement = document.getElementById(result.videoId);
                              if (videoElement) {
                                videoElement.scrollIntoView({ 
                                  behavior: 'smooth',
                                  block: 'center'
                                });
                                videoElement.style.transition = 'all 0.3s ease-in-out';
                                videoElement.style.boxShadow = '0 0 20px rgba(75, 172, 82, 0.5)';
                                setTimeout(() => {
                                  videoElement.style.boxShadow = 'none';
                                }, 2000);
                              }
                            }, 500);
                          } else {
                            navigate(result.path);
                          }
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1
                        }}>
                          <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: result.type === 'video' 
                              ? '#ff4444' 
                              : result.type === 'document' 
                              ? '#4bac52'
                              : '#2196f3',
                            fontSize: '2rem'
                          }}>
                            {result.type === 'video' ? (
                              <VideoLibraryIcon sx={{ fontSize: 'inherit' }} />
                            ) : result.type === 'document' ? (
                              <ArticleIcon sx={{ fontSize: 'inherit' }} />
                            ) : (
                              <MenuBookIcon sx={{ fontSize: 'inherit' }} />
                            )}
                          </Box>
                          <Typography variant="h6" sx={{ 
                            color: result.type === 'video' 
                              ? '#ff4444' 
                              : result.type === 'document' 
                              ? '#4bac52'
                              : '#2196f3',
                            fontWeight: 600,
                            fontSize: '1rem',
                            flexGrow: 1
                          }}>
                            {result.title}
                          </Typography>
                        </Box>
                        <Typography sx={{ 
                          color: 'black',
                          fontSize: '0.9rem',
                          flexGrow: 1
                        }}>
                          {result.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ) : (
              <Paper sx={{ p: 2, backgroundColor: '#fffbe6', border: '1px solid #ffe082' }}>
                <Typography sx={{ color: '#b71c1c' }}>No results found.</Typography>
              </Paper>
            )}
          </Box>
        )}

        {/* Divider now outside the flex container, will span full width */}
        <Divider sx={{ mb: 3 }} />

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
      </StaggeredFadeIn>
    </Container>
  );
}

export default Homepage;