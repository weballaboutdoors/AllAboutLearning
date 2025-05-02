import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './common/StaggeredFadeIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from './common/SearchBar';
import searchIndex from '../searchIndex';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BreadcrumbTrail from './common/BreadcrumbTrail';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';
import IconButton from '@mui/material/IconButton';

function TrainingDocs() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteToggler, setFavoriteToggler] = useState(false);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    
    const normalizedQuery = query.toLowerCase()
      .replace(/-/g, '')
      .replace(/\s+/g, '')
      .replace(/[.,]/g, '');

    const results = searchIndex.filter(item => {
      const normalizedTitle = (item.title || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');
      const normalizedDescription = (item.description || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');
      const normalizedDetails = (item.details || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedDetails.includes(normalizedQuery)
      );
    });

    setSearchResults(results);
  };

  const handleFavorite = (dept) => {
    if (isFavorite(dept.id)) {
      removeFavorite(dept.id);
    } else {
      addFavorite(dept);
    }
    setFavoriteToggler(fav => !fav); // force re-render
  };

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
      
    },
    {
      id: 'new-parts-estimate',
      title: 'New Parts Estimate',
      description: 'Inventory management, receiving procedures, and warehouse operations training.',
      image: '/AllAboutLearning/images/new-parts-estimate.jpg',
      path: '/training/new-parts-estimate'
    },
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Shipping procedures, packaging guidelines, and logistics training materials.',
      image: '/AllAboutLearning/images/shipping-training.png',
      
    },
    {
      id: 'receiving',
      title: 'Receiving',
      description: 'Inventory management, receiving procedures, and warehouse operations training.',
      image: '/AllAboutLearning/images/receiving-training.png',
      
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <BreadcrumbTrail />

      <StaggeredFadeIn delay={0}>
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
                mb: 2
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
                Training & Operating Procedures
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
                  mt: 1.5,
                  mb: .5,
                  '& input': {
                    color: 'black',
                    fontFamily: 'Roboto, sans-serif',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </StaggeredFadeIn>

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
                            ? '#000000' 
                            : result.type === 'document' 
                            ? '#000000'
                            : '#2196f3',
                          fontWeight: 590,
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

      <Grid container spacing={3}>
        {departments.map((dept, index) => (
          <Grid item xs={12} sm={6} md={4} key={dept.id}>
            <StaggeredFadeIn delay={index * 0.1}>
              <Card 
                onClick={() => dept.path && navigate(dept.path)}
                sx={{ 
                  height: '100%',
                  cursor: dept.path ? 'pointer' : 'default',
                  backgroundColor: 'background.paper',
                  border: `1px solid ${theme.palette.primary.main}`,
                  position: 'relative',
                  '&:hover': dept.path ? {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  } : {}
                }}
              >
                {dept.path && (
                  <IconButton
                    onClick={e => {
                      e.stopPropagation();
                      handleFavorite(dept);
                    }}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, color: '#4bac52', backgroundColor: 'black', borderRadius: '50%', boxShadow: 2, p: 0.5, '&:hover': { backgroundColor: 'black' } }}
                  >
                    {isFavorite(dept.id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
                  </IconButton>
                )}
                {!dept.path && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      zIndex: 1,
                      fontSize: '0.875rem'
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
                <CardMedia
                  component="img"
                  height="400"
                  image={dept.image}
                  alt={dept.title}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#f5f5f5',
                    filter: !dept.path ? 'grayscale(100%)' : 'none',
                    '&:hover': dept.path ? {
                      opacity: .5
                    } : {}
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