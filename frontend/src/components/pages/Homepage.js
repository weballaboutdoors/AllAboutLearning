import React, { useState, useEffect } from 'react';
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
  CardActions,
  IconButton
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
import { getFavorites, removeFavorite } from '../../utils/favorites';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

function Homepage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const theme = useTheme();
  const sections = [
    {
      title: 'Resources',
      description: 'Click here to access documents and videos',
      icon: <img 
      src="/AllAboutLearning/images/warehouse-archive.png"
      alt="Archives" 
      style={{ 
        width: '500px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '6px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }} 
    />,
      path: '/documents',
      color: 'white',
      details: `Quick access to essential training materials and documentation:

      Installation & Troubleshooting
      - Multi-Point Locks
      - Door Closers
      - Hinges & Hardware
      - Storm Doors & Windows
      - Weatherstripping
      - Door Bottoms & Thresholds
      - Automatic Operators

      All materials are regularly updated with the latest product information and best practices from our weekly training sessions.`
    },
    {
      title: 'Training & SOPs',
      description: 'Click here to view Training Materials & Department Procedures',
      icon: <img 
      src="/AllAboutLearning/images/training-sop.png"
      alt="Archives" 
      style={{ 
        width: '500px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '6px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }} 
    />,
      path: '/training',
      color: 'white',
      details: `Quick access to company procedures and professional development:

      Standard Operating Procedures
      - Quality Assurance Guidelines
      - Safety Protocols
      - Company Policies
      - Best Practices

      Professional Development
      - Industry Standards
      - Troubleshooting Guides

      All materials are regularly updated to ensure you have the latest information to excel in your role.`
    }
  ];

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites());
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = React.useRef();

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

  useEffect(() => {
    // Optionally, listen for storage changes if you want to sync across tabs
    const onStorage = () => setFavorites(getFavorites());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setScrollX(scrollRef.current.scrollLeft + offset);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 3 }}>
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
          <Box sx={{ width: 1, mb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                pb: 0,
                borderBottom: '3px double #4bac52',
                mb: 1,
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
                  lineHeight: 1.7
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
                  mt: 1,
                  mb: 2,
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
                fontSize: '1.1rem',
                mt: 2
              }}
            >
              Access to All About Doors & Windows comprehensive document library and training materials. Click the images below to access resources.
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

        {/* Divider now outside the flex container, will span full width */}
        <Divider sx={{ my: 3, mt: 1 }} />

        {sections.map((section, index) => (
          <StaggeredFadeIn key={section.title} delay={0.2 * (index + 1)}>
            <React.Fragment>
              <Paper 
                elevation={0}
                sx={{ 
                  mb: 2, 
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
              >
                <Grid container spacing={4} direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 2,  // Reduce from p: 3
                      backgroundColor: '#F8F9FA',
                      border: '1px solid black',
                      borderRadius: '10px',
                      height: '100%',
                      maxWidth: '800px',
                      maxHeight: '695px',
                      padding: '1px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
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
                          p: 4,  // Reduce from p: 10
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          gap: '1.5rem'
                        }}>
                          <Box sx={{ 
                            mb: 1,
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
                              mb: .5,
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
                      p: 2.5,  // Reduce from p: 3
                      height: '100%',
                      maxHeight: '695px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      backgroundColor: '#F1F8E9',
                      border: '1px solid black',
                      borderRadius: '10px',
                      padding: '1.75rem',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
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
                      my: 4,
                      borderColor: 'rgba(0, 0, 0, 0.12)',
                      borderWidth: 1,
                      width: '90%',
                      margin: '32px auto',
                      opacity: 0.5
                    }} 
                  />
                </StaggeredFadeIn>
              )}
            </React.Fragment>
          </StaggeredFadeIn>
        ))}

        {/* --- FAVORITES SECTION HERE --- */}
        <Box sx={{ mt: 5, mb: 3 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              background: 'transparent',
              borderRadius: 2,
              border: '1px solid black',
              boxShadow: '0 2px 8px rgba(76, 175, 80, 0.07)',
              position: 'relative'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: 'black', fontWeight: 500 }}>
              Favorites
            </Typography>
            {favorites.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                You have no favorites yet.
              </Typography>
            ) : (
              <Box sx={{ position: 'relative', width: '100%' }}>
                {/* Left Arrow */}
                {favorites.length > 4 && (
                  <IconButton
                    onClick={() => scrollBy(-240)}
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      zIndex: 2,
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.8)',
                      boxShadow: 1,
                      display: { xs: 'none', sm: 'flex' }
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                )}
                {/* Scrollable Favorites */}
                <Box
                  ref={scrollRef}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    overflowX: favorites.length > 4 ? 'auto' : 'visible',
                    overflowY: 'hidden',
                    scrollBehavior: 'smooth',
                    py: 1,
                    px: favorites.length > 4 ? 5 : 0,
                    '&::-webkit-scrollbar': { height: 8 },
                    '&::-webkit-scrollbar-thumb': { background: '#e0e0e0', borderRadius: 4 }
                  }}
                >
                  {favorites.map(item => (
                    <Card
                      key={item.id}
                      onClick={() => {
                        if (item.type === 'video') {
                          navigate('/resources/videos');
                          setTimeout(() => {
                            const videoElement = document.getElementById(item.id);
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
                          navigate(item.path || `/resources/${item.id}`);
                        }
                      }}
                      sx={{
                        width: 215,
                        minWidth: 215,
                        maxWidth: 215,
                        minHeight: 240,
                        cursor: 'pointer',
                        backgroundColor: item.type === 'video' ? '#111' : '#fff',
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        boxShadow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'box-shadow 0.2s, transform 0.2s',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: 4,
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      {/* Remove from favorites button */}
                      <IconButton
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          removeFavorite(item.id);
                          setFavorites(favorites => favorites.filter(fav => fav.id !== item.id));
                        }}
                        sx={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          zIndex: 3,
                          backgroundColor: 'rgba(255,255,255,0.85)',
                          borderRadius: '50%',
                          boxShadow: 1,
                          p: 0.5,
                          '&:hover': { backgroundColor: '#ffebee', color: '#b71c1c' }
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      {/* Video icon and text for video cards */}
                      {item.type === 'video' ? (
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, py: 3 }}>
                          <VideoLibraryIcon sx={{ color: '#ff1744', fontSize: 48, mb: 1 }} />
                          <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 500, fontSize: '1.12rem', width: '100%', textAlign: 'center' }}>
                            {item.name || item.title}
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          {item.image && (
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name || item.title}
                              sx={{
                                width: '100%',
                                height: 215,
                                objectFit: 'cover',
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                                backgroundColor: '#f5f5f5'
                              }}
                            />
                          )}
                          <CardContent sx={{ p: 1, width: '100%', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 500, fontSize: '1.12rem', width: '100%' }}>
                              {item.name || item.title}
                            </Typography>
                          </CardContent>
                        </>
                      )}
                    </Card>
                  ))}
                </Box>
                {/* Right Arrow */}
                {favorites.length > 4 && (
                  <IconButton
                    onClick={() => scrollBy(240)}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      zIndex: 2,
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.8)',
                      boxShadow: 1,
                      display: { xs: 'none', sm: 'flex' }
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </Paper>
        </Box>
        {/* --- END FAVORITES SECTION --- */}
      </StaggeredFadeIn>
    </Container>
  );
}

export default Homepage;