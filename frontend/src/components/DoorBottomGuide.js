import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Box, Button, Typography, Paper, Grid, Card, CardMedia, Fab, Fade 
} from '@mui/material';
import { 
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  Construction as ConstructionIcon,
  Category as CategoryIcon,
  ArrowBack as ArrowBackIcon,
  VideoLibrary as VideoLibraryIcon,
  Article as ArticleIcon,
  MenuBook as MenuBookIcon 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './common/StaggeredFadeIn';
import EditableText from './common/EditableText';
import { useParams } from 'react-router-dom';
import { useScrollTrigger } from '@mui/material';
import SearchBar from './common/SearchBar';

function DoorBottomGuide() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { guideId } = useParams();
    const API_URL = process.env.NODE_ENV === 'production' 
      ? process.env.REACT_APP_PROD_API_URL 
      : process.env.REACT_APP_API_URL;
  
    // Add these functions from LockGuide
    const loadAllGuideContent = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return null;
      }
  
      const cacheKey = `guide-content-${guideId}`;
      const cached = sessionStorage.getItem(cacheKey);
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (!isCacheExpired(timestamp)) {
          console.log('Using cached guide content');
          return data;
        }
      }
  
      try {
        console.log('Fetching all guide content');
        const response = await fetch(`${API_URL}/api/guide-content/guide/${guideId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) throw new Error('Failed to fetch guide content');
        
        const data = await response.json();
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        return data;
      } catch (error) {
        console.error('Error loading guide content:', error);
        return null;
      }
    };
  
    const getContentFromDatabase = async ({ id, section }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
    
        const cacheKey = `guide-content-${id}-${section}`;
        console.log('Fetching content for:', { id, section, cacheKey });
    
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData && cachedData !== 'undefined') {
          try {
            const parsed = JSON.parse(cachedData);
            if (parsed && parsed.data) {
              return parsed.data;
            }
            if (parsed) {
              return parsed;
            }
          } catch (parseError) {
            sessionStorage.removeItem(cacheKey);
          }
        }
    
        const url = `${API_URL}/api/guide-content/${encodeURIComponent(id)}/${encodeURIComponent(section)}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.detail || 'Failed to fetch content');
        }
    
        if (data.content) {
          const cacheData = {
            data: data.content,
            timestamp: Date.now()
          };
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
          return data.content;
        }
        return null;
      } catch (error) {
        console.error('Error loading content:', error);
        return null;
      }
    };
  
    const saveContentToDatabase = async ({ id, content, section }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
  
        const response = await fetch(`${API_URL}/api/guide-content/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            id,
            content,
            section,
            guide_type: 'door_bottoms'  // Changed from 'hls7' to 'door_bottoms'
          })
        });
  
        if (!response.ok) throw new Error('Failed to update content');
  
        // Update cache
        const cacheKey = `guide-content-${guideId}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const cacheData = JSON.parse(cached);
          cacheData.data[`${id}-${section}`] = content;
          cacheData.timestamp = Date.now();
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error in saveContentToDatabase:', error);
        throw error;
      }
    };
  
    const isCacheExpired = (timestamp) => {
      const CACHE_DURATION = 1800000; // 30 minutes
      return Date.now() - timestamp > CACHE_DURATION;
    };
  
    const clearContentCache = () => {
      sessionStorage.removeItem(`guide-content-${guideId}`);
    };

    // Add scroll trigger
    const trigger = useScrollTrigger({
        threshold: 100,
        disableHysteresis: true
      });
    
      const handleBackToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

  const guideContent = {
    'door-bottoms-guide': {
      title: {
        props: {
          variant: "h4",
          sx: { fontWeight: 500 },
          defaultContent: "Understanding Door Bottoms & Sweeps",
          id: "door-bottoms-title"
        }
      },
      subtitle: {
        props: {
          variant: "h7",
          sx: { color: 'black' },
          defaultContent: "Door Bottoms and Sweeps - Technical Guide | Rory Snow | March 25, 2025",
          id: "door-bottoms-subtitle"
        }
      },
      sections: [
        {
            id: "general-info",
            icon: <InfoIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
            title: {
              props: {
                variant: "h5",
                sx: { fontWeight: 500 },
                defaultContent: "General Information",
                id: "general-info-title"
              }
            },
            content: {
              sections: [  // Add sections array
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Understanding Door Bottoms",
                      id: "general-info-section-title"
                    }
                  },
                  points: [  // Changed from bulletPoints to points to match other sections
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Door bottoms come in various profiles for different applications",
                        id: "general-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Standard colors: White, Bronze, and Tan",
                        id: "general-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Standard 1-3/4\" thick doors use 36\" length (can be cut down)",
                        id: "general-point-3"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Longer 42\" or 48\" lengths available in several styles",
                        id: "general-point-4"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Bulbs are generally more weatherproof than fins",
                        id: "general-point-5"
                      }
                    }
                  ],
                  image: {  // Changed from images array to single image object
                    src: "/AllAboutLearning/images/general-info-section2.png",  // Updated path to match your structure
                    alt: "Door Bottom Overview",
                    
                  }
                }
              ]
            }
          },
        {
            id: "door-bottom-types",
            icon: <CategoryIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
            title: {
              props: {
                variant: "h5",
                sx: { fontWeight: 500 },
                defaultContent: "Six Basic Types of Door Bottoms",
                id: "types-title"
              }
            },
            content: {
              sections: [
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Slide-On Door Bottoms",
                      id: "slide-on-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Primarily used on steel doors, with varying tab spacing",
                        id: "slide-on-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Slide off the old sweep and slide on the new one",
                        id: "slide-on-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Different designs available based on door type",
                        id: "slide-on-point-3"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Cut new sweep to length if needed and slide it on",
                        id: "slide-on-point-4"
                      }
                    }
                  ],
                  images: [
                    {
                      src: "/AllAboutLearning/images/slide-on.png",
                      alt: "Slide-On Door Bottom",
                      caption: "Slide-On Door Bottom Components"
                    }
                  ]
                },
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Snap-In Door Bottoms",
                      id: "snap-in-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Fits into single/double kerf in door panel",
                        id: "snap-in-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Used in wood/steel doors with wood/composite bottoms",
                        id: "snap-in-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "May be installed without removing the door",
                        id: "snap-in-point-3"
                      }
                    }
                  ],
                  images: [
                    {
                      src: "/images/door-bottoms/snap-in.png",
                      alt: "Snap-In Door Bottom",
                      caption: "Snap-In Door Bottom Components"
                    }
                  ]
                },
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Wrap-Around Door Bottoms",
                      id: "wrap-around-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "General replacement for discontinued styles",
                        id: "wrap-around-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Easily installed and adjustable, may require new screw holes",
                        id: "wrap-around-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Suitable for doors other than 1-3/4\" thick",
                        id: "wrap-around-point-3"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Cut new door bottom to length if needed. Position onto bottom of door.",
                        id: "wrap-around-point-4"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Close door and adjust door bottom as needed to get proper fit.",
                        id: "wrap-around-point-5"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Install new screws and tighten.",
                        id: "wrap-around-point-6"
                      }
                    }
                  ],
                  images: [
                    {
                      src: "/AllAboutLearning/images/wrap-around.png",
                      alt: "Wrap-Around Door Bottom",
                      caption: "Wrap-Around Door Bottom Components"
                    }
                  ]
                },
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "L-Shape Door Bottoms",
                      id: "l-shape-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Typically used for hollow steel doors, like Benchmark doors",
                        id: "l-shape-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "The 'L' shape screws to the inside surface of the door",
                        id: "l-shape-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Easy to install and adjust",
                        id: "l-shape-point-3"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Does not always work well on flat bottom doors",
                        id: "l-shape-point-4"
                      }
                    }
                  ]
                },
                {
                    title: {
                      props: {
                        variant: "h6",
                        defaultContent: "Staple-On Door Bottoms",
                        id: "staple-on-title"
                      }
                    },
                    points: [
                      {
                        props: {
                          variant: "body1",
                          defaultContent: "Primarily for wood doors; available in wider/longer lengths",
                          id: "staple-on-point-1"
                        }
                      },
                      {
                        props: {
                          variant: "body1",
                          defaultContent: "Requires removing the door from the frame for installation",
                          id: "staple-on-point-2"
                        }
                      },
                      {
                        props: {
                          variant: "body1",
                          defaultContent: "Works well on thicker 2-1/4\" doors",
                          id: "staple-on-point-3"
                        }
                      }
                    ],
                    // Add new installation steps section
                    installSteps: {
                      title: {
                        props: {
                          variant: "h6",
                          defaultContent: "Installation Steps:",
                          id: "staple-on-install-title"
                        }
                      },
                      points: [
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "1. Remove door from hinges and lay on edge in a secure position to prevent damage.",
                            id: "staple-on-install-1"
                          }
                        },
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "2. Cut door bottom to length and position. Optional: Apply small amount of adhesive to improve seal.",
                            id: "staple-on-install-2"
                          }
                        },
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "3. Install staples starting from center outward, staggering them on inside and outside edges to prevent ripples.",
                            id: "staple-on-install-3"
                          }
                        },
                        {
                            props: {
                              variant: "body1",
                              defaultContent: "4. Re-install door.",
                              id: "staple-on-install-4"
                            }
                          }
                        ]
                      },
                      notes: {
                        props: {
                          variant: "body1",
                          defaultContent: "If replacing door by yourself, be careful. Some doors are very heavy. Use shims under the door to help with alignment when connecting hinges.",
                          id: "staple-on-install-note"
                        }
                      }
                    }
                  
                ]
              }
            },
            {
                id: "pocket-bottoms",
                icon: <BuildIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
                title: {
                  props: {
                    variant: "h5",
                    sx: { fontWeight: 500 },
                    defaultContent: "Pocket Door Bottoms",
                    id: "pocket-title"
                  }
                },
                content: {
                  sections: [
                    {
                      title: {
                        props: {
                          variant: "h6",
                          defaultContent: "Pocket Type Door Bottoms:",
                          id: "pocket-bottom-title"
                        }
                      },
                      points: [
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "Requires removing the door from the frame",
                            id: "pocket-point-1"
                          }
                        },
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "This type of door bottom is generally found on Commercial steel doors",
                            id: "pocket-point-2"
                          }
                        }
                      ],
                      image: {
                        src: "/AllAboutLearning/images/pocket-bottom.png",
                        caption: "Pocket Door Bottom Components",
                        alt: "Pocket Door Bottom"
                      }
                    }
                  ]
                }
              },
          {
            id: "peachtree-bottoms",
            icon: <BuildIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
            title: {
              props: {
                variant: "h5",
                sx: { fontWeight: 500 },
                defaultContent: "Peachtree Door Bottoms",
                id: "peachtree-title"
              }
            },
            content: {
              sections: [  // Added sections array to match other types
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Peachtree Door Bottoms:",
                      id: "peachtree-bottom-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Peachtree Avanti doors use heavy rubber material fitted at the bottom",
                        id: "peachtree-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Polyurethane foam connects the steel panels and door bottom",
                        id: "peachtree-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Best replacement option: wrap-around type (840010 or 840011)",
                        id: "peachtree-point-3"
                      }
                    }
                  ],
                  image: {  // Added image at the subsection level to match structure
                    src: "/AllAboutLearning/images/peachtree-bottom.png",
                    caption: "Peachtree Door Bottom Components",
                    alt: "Peachtree Door Bottom"
                  }
                }
              ]
            }
          },
          {
            id: "door-sweeps",
            icon: <ConstructionIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
            title: {
              props: {
                variant: "h5",
                sx: { fontWeight: 500 },
                defaultContent: "Types of Door Sweeps",
                id: "sweeps-title"
              }
            },
            content: {
              sections: [
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Door Sweep Types:",
                      id: "sweep-types-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Neoprene Sweeps: Durable and resistant to weather and chemicals",
                        id: "sweep-type-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Brush Fiber/Bristle Sweeps: Ideal for uneven floors and high-traffic areas",
                        id: "sweep-type-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Automatic Drop-Down Sweeps: Retract when the door opens, sealing tightly when closed",
                        id: "sweep-type-3"
                      }
                    }
                  ],
                  image: {  // Side image that appears next to text
                    src: "/AllAboutLearning/images/sweeps-neoprene.png",
                    caption: "Neoprene Door Sweep",
                    alt: "Door Sweep Types Overview"
                  }
                }
              ],
              images: [  // Bottom images in grid
                {
                  src: "/AllAboutLearning/images/sweep2.png",
                  caption: "Drop-Down Door Sweep",
                  alt: "Door Sweep Types"
                },
                {
                  src: "/AllAboutLearning/images/sweep.png",  // Make sure this image exists
                  caption: "Automatic Drop-Down Door Sweep",
                  alt: "Door Sweep Types"
                }
              ],
              notes: {
                props: {
                  variant: "body1",
                  defaultContent: "Note: When selecting a door sweep, consider the floor surface, door usage, and environmental conditions for optimal performance.",
                  id: "sweeps-note"
                }
              }
            }
          },
          {
            id: "thresholds-sills",
            icon: <CategoryIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
            title: {
              props: {
                variant: "h5",
                sx: { fontWeight: 500 },
                defaultContent: "Thresholds and Bottom Sills",
                id: "thresholds-title"
              }
            },
            content: {
              sections: [
                {
                  title: {
                    props: {
                      variant: "h6",
                      defaultContent: "Key Information:",
                      id: "threshold-info-title"
                    }
                  },
                  points: [
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Under-door weatherstripping has evolved from aluminum thresholds with rubber inserts",
                        id: "threshold-point-1"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Modern designs include fixed plastic and adjustable sill caps",
                        id: "threshold-point-2"
                      }
                    },
                    {
                      props: {
                        variant: "body1",
                        defaultContent: "Thresholds and sills play a crucial role in sealing the bottom of doors",
                        id: "threshold-point-3"
                      }
                    }
                  ],
                  image: {  // Move the image here to appear next to text
                    src: "/AllAboutLearning/images/thresholds.png",
                    caption: "Thresholds and Sills",
                    alt: "Thresholds and Sills"
                  }
                }
              ],
              notes: {
                props: {
                  variant: "body1",
                  defaultContent: "Note: Regular maintenance and adjustment of thresholds and sill caps is essential for maintaining an effective seal.",
                  id: "threshold-note"
                }
              }
            }
          }
        ]
      }
    };
  
    const content = guideContent['door-bottoms-guide'];

    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (query) => {
      setSearching(true);
      try {
        const results = await loadAllGuideContent();
        if (results) {
          const filteredResults = results.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filteredResults);
        }
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setSearching(false);
      }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <StaggeredFadeIn delay={0}>
            <Box sx={{ mb: 4 }}>
              <Button 
                onClick={() => navigate('/archives/door-bottoms')}
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.dark
                  }
                }}
              >
                <ArrowBackIcon sx={{ mr: 1 }} />
                Back to Door Bottoms
              </Button>

              {/* Flex container for title and search bar */}
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
                      mb: 1
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
                        lineHeight: 1.5
                      }}
                    >
                      Door Bottoms & Sweeps Guide
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
            </Box>
          </StaggeredFadeIn>
      
          <StaggeredFadeIn delay={0.2}>

            {content?.sections.map((section, index) => (
              <Paper
                key={section.id}
                elevation={3}
                sx={{
                  mb: 3,
                  p: 3,
                  backgroundColor: '#faf9f6',
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {section.icon}
                  {section.title && (
                    <Typography
                      {...section.title.props}  
                      variant={section.title.props.variant}  
                      sx={{ 
                        pb: 1,
                        width: '100%',
                        borderBottom: `1px solid ${theme.palette.primary.main}`,
                        display: 'flex',
                        alignItems: 'center'
                        }}
                    >
                      {section.title.props.defaultContent}
                    </Typography>
                  )}
                </Box>
    
                {section.content.sections?.map((subsection, subIndex) => (
                    <Box key={`subsection-${subIndex}`} sx={{ mb: 2 }}>
                        {/* Title with EditableText */}
                        {subsection.title && (
                        <Typography
                            variant="h6"
                            sx={{ 
                            pb: 1,
                            mb: 3,
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                            display: 'flex',
                            alignItems: 'center'
                            }}
                        >
                            <EditableText
                                {...subsection.title.props}
                                onSave={(newContent) => saveContentToDatabase({
                                    id: subsection.title.props.id,
                                    content: newContent,
                                    section: `section-${section.id}-subsection-${subIndex}-title`
                                })}
                                getContent={() => getContentFromDatabase({  // Changed from loadContent to getContent
                                    id: subsection.title.props.id,
                                    section: `section-${section.id}-subsection-${subIndex}-title`
                                })}
                            />
                        </Typography>
                        )}
                        
                        <Grid container spacing={3}>
                        {/* Text Content */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 2, height: '100%', backgroundColor: 'white', border: `1px solid ${theme.palette.primary.main}` }}>
                            {subsection.points?.map((point, pointIndex) => (
                                <Box key={`point-${pointIndex}`} sx={{ mb: 2 }}>
                                <EditableText
                                    {...point.props}
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        '& .MuiTypography-root': {
                                          fontSize: '1.2rem'
                                        }
                                    }}
                                    onSave={(newContent) => saveContentToDatabase({
                                        id: point.props.id,
                                        content: newContent,
                                        section: `section-${section.id}-subsection-${subIndex}-point-${pointIndex}`
                                    })}
                                    getContent={() => getContentFromDatabase({  // Changed from loadContent to getContent
                                        id: point.props.id,
                                        section: `section-${section.id}-subsection-${subIndex}-point-${pointIndex}`
                                    })}
                                />
                                </Box>
                            ))}

                            {/* Installation Steps */}
                            {subsection.installSteps && (
                            <>
                                <Box sx={{ mt: 4, mb: 2 }}>
                                <EditableText {...subsection.installSteps.title.props} />
                                </Box>
                                {subsection.installSteps.points?.map((step, stepIndex) => (
                                <Box key={`install-step-${stepIndex}`} sx={{ mb: 2 }}>
                                    <EditableText {...step.props} />
                                </Box>
                                ))}
                            </>
                            )}
                            </Paper>
                        </Grid>

                    {/* Image Content */}
                    <Grid item xs={12} md={6}>
                        <Paper 
                        elevation={1}
                        sx={{ 
                            p: 2, 
                            height: '100%',
                            
                            backgroundColor: 'white',
                            border: `1px solid ${theme.palette.primary.main}`,
                        }}
                        >
                        <Box
                            sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white'
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={subsection.image ? subsection.image.src : `/AllAboutLearning/images/${subsection.title.props.id.replace('-title', '')}.png`}
                                alt={subsection.image ? subsection.image.alt : subsection.title.props.defaultContent}
                                sx={{ 
                                    objectFit: 'contain',
                                    mt: 1,
                                    
                                    
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: '660px',
                                    backgroundColor: 'white',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: 2,
                                    maxWidth: '800px',
                                    '&:hover': {
                                    transform: 'scale(1.3)',
                                    transition: 'transform 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
                                    }
                                }}
                                />
                                <Typography
                                variant="caption"
                                sx={{ 
                                    mt: 1,
                                    textAlign: 'center',
                                    color: theme.palette.text.secondary,
                                    backgroundColor: 'white'
                                }}
                                >
                                {subsection.image ? subsection.image.caption : subsection.title.props.defaultContent}
                                </Typography>
                        </Box>
                        </Paper>
                    </Grid>
                    </Grid>
                    {/* Section Note - Outside Grid container */}
                    {subsection.notes && (
                            <Box 
                                sx={{ 
                                    backgroundColor: '#fff9f0',
                                    borderLeft: '4px solid #ffc107',
                                    p: 1.5,
                                    width: '100%',
                                    mt: 2,
                                    
                                    minHeight: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontStyle: 'italic'
                                }}
                            >
                                <EditableText 
                                    {...subsection.notes.props}
                                    onSave={(newContent) => saveContentToDatabase({
                                        id: subsection.notes.props.id,
                                        content: newContent,
                                        section: `section-${section.id}-subsection-${subIndex}-note`
                                    })}
                                    loadContent={() => getContentFromDatabase({
                                        id: subsection.notes.props.id,
                                        section: `section-${section.id}-subsection-${subIndex}-note`
                                    })}
                                />
                            </Box>
                        )}
                    
                </Box>
                ))}
                {section.content.points?.map((point, pointIndex) => (
                  <Box key={`direct-point-${pointIndex}`} sx={{ mb: 1 }}>
                    <EditableText
                      {...point.props}
                      onSave={(newContent) => saveContentToDatabase({
                        id: point.props.id,
                        content: newContent,
                        section: `section-${index}-point-${pointIndex}`
                      })}
                    />
                  </Box>
                ))}
    
                {section.content.images && (
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      {section.content.images.map((image, imageIndex) => (
                        <Grid item xs={12} md={6} key={imageIndex}>
                          <Paper 
                            elevation={1}
                            sx={{ 
                              p: 3,
                              backgroundColor: 'white',
                              border: `1px solid ${theme.palette.primary.main}`,
                              borderRadius: 2,
                            }}
                          >
                            <Box 
                              sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <Card 
                                sx={{ 
                                  width: '100%',
                                  height: '100%',
                                  maxHeight: '610px',
                                  backgroundColor: 'white',
                                  border: `1px solid ${theme.palette.primary.main}`,
                                  boxShadow: 'none',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                      transform: 'scale(1.2)',
                                      cursor: 'pointer'
                                    }
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  image={image.src}
                                  alt={image.alt}
                                  sx={{ 
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: '510px',
                                    backgroundColor: 'white',
                                    
                                  }}
                                />
                              </Card>
                              {image.caption && (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    mt: 1,
                                    textAlign: 'center',
                                    color: theme.palette.success.main,
                                    display: 'block'
                                  }}
                                >
                                  {image.caption}
                                </Typography>
                              )}
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {section.content.notes && (
                  <Box 
                    sx={{ 
                      backgroundColor: '#fff9f0',
                      borderLeft: '4px solid #ffc107',
                      p: 1.5,
                      width: '100%',
                      mt: 2,
                      minHeight: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      fontStyle: 'italic'
                    }}
                  >
                    <EditableText
                      {...section.content.notes.props}
                      onSave={(newContent) => saveContentToDatabase({
                        id: section.content.notes.props.id,
                        content: newContent,
                        section: `section-${index}-notes`
                      })}
                    />
                  </Box>
                )}
              </Paper>
            ))}
          </StaggeredFadeIn>
    
          <Fade in={trigger}>
            <Fab 
              onClick={handleBackToTop}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
              aria-label="scroll back to top"
            >
              <KeyboardArrowUpIcon sx={{ fontSize: '2rem', color: 'white' }} />
            </Fab>
          </Fade>
        </Container>
      );
    }
    
    export default DoorBottomGuide;