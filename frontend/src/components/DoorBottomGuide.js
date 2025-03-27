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
  Category as CategoryIcon 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './common/StaggeredFadeIn';
import EditableText from './common/EditableText';
import { useParams } from 'react-router-dom';
import { useScrollTrigger } from '@mui/material';

function DoorBottomGuide() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { guideId } = useParams();
    const API_URL = process.env.NODE_ENV === 'production' 
      ? process.env.REACT_APP_PROD_API_URL 
      : process.env.REACT_APP_API_URL;
  
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
  
    // Add content loading functions
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
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData && cachedData !== 'undefined') {
          try {
            const parsed = JSON.parse(cachedData);
            if (parsed && parsed.data) return parsed.data;
            if (parsed) return parsed;
          } catch (parseError) {
            sessionStorage.removeItem(cacheKey);
          }
        }
    
        const response = await fetch(
          `${API_URL}/api/guide-content/${encodeURIComponent(id)}/${encodeURIComponent(section)}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
    
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || 'Failed to fetch content');
        }
    
        if (data.content) {
          sessionStorage.setItem(cacheKey, JSON.stringify({
            data: data.content,
            timestamp: Date.now()
          }));
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
            guide_type: 'door-bottoms'  // Changed from 'hls7' to 'door-bottoms'
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
  
    // Helper functions
    const isCacheExpired = (timestamp) => {
      const CACHE_DURATION = 1800000; // 30 minutes
      return Date.now() - timestamp > CACHE_DURATION;
    };
  
    const clearContentCache = () => {
      sessionStorage.removeItem(`guide-content-${guideId}`);
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
                    caption: "Common Door Bottom Profiles"
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
                            defaultContent: "1. Remove the Hinge Pins from the Door. Lay door on its edge. Be careful not to position the door where it can fall or become scratched.",
                            id: "staple-on-install-1"
                          }
                        },
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "2. Cut to length as needed. Position onto bottom of door. Note: The staple-on door bottom may seal better if a small spot of adhesive or caulk is applied to the bottom of the door before installing. Use just enough to touch both surfaces.",
                            id: "staple-on-install-2"
                          }
                        },
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "3. Staple from the center and work your way to both ends. This will reduce the likely hood of ripples in the door bottom when applied. It is also best if the staples are staggered to both the inside and outside of the door sweep.",
                            id: "staple-on-install-3"
                          }
                        },
                        {
                          props: {
                            variant: "body1",
                            defaultContent: "4. Re-install door. Note: If replacing door by yourself, be careful not to hurt yourself. Some wood doors are very heavy. The use of shims under the door may help with alignment when connecting hinges.",
                            id: "staple-on-install-4"
                          }
                        }
                      ]
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
                    alt: "Peachtree Door Bottom",
                    caption: "Peachtree Door Bottom Components"
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
                    alt: "Door Sweep Types Overview",
                    caption: "Neoprene Door Sweep"
                  }
                }
              ],
              images: [  // Bottom images in grid
                {
                  src: "/AllAboutLearning/images/sweep2.png",
                  alt: "Door Sweep Types",
                  caption: "Different Types of Door Sweeps"
                },
                {
                  src: "/AllAboutLearning/images/sweep.png",  // Make sure this image exists
                  alt: "Door Sweep Types",
                  caption: "Different Types of Door Sweeps"
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
                    alt: "Thresholds and Sills",
                    caption: "Common Threshold Types"
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

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <StaggeredFadeIn delay={0}>
            <Box sx={{ mb: 4 }}>
              <Button 
                onClick={() => navigate('/archives/door-bottoms')}
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.dark
                  }
                }}
              >
                ← Back to Door Bottoms
              </Button>
              {content?.title && (
                <Typography
                  {...content.title.props}  
                  variant={content.title.props.variant}  
                  sx={content.title.props.sx}  
                >
                  {content.title.props.defaultContent}
                </Typography>
              )}
              <Box 
                sx={{ 
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  width: '100%',
                  mt: 2,
                  mb: 2
                }} 
              />
              {content?.subtitle && (
                <Typography
                  {...content.subtitle.props}  
                  variant={content.subtitle.props.variant}  
                  sx={content.subtitle.props.sx}  
                >
                  {content.subtitle.props.defaultContent}
                </Typography>
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
                    <Box key={`subsection-${subIndex}`} sx={{ mb: 4 }}>
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
                            loadContent={() => getContentFromDatabase({
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
                                        fontSize: '1.1rem',  // Increase regular text size
                                        lineHeight: 1.6,     // Adjust line height for better readability
                                        '& .MuiTypography-root': {
                                          fontSize: '1.2rem'  // Ensure Typography inside EditableText is also larger
                                        }
                                      }}
                                    onSave={(newContent) => saveContentToDatabase({
                                    id: point.props.id,
                                    content: newContent,
                                    section: `section-${section.id}-subsection-${subIndex}-point-${pointIndex}`
                                    })}
                                    loadContent={() => getContentFromDatabase({
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
                            p: 3, 
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
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: '400px',
                                    backgroundColor: 'white',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: 2,
                                    maxWidth: '800px',
                                    '&:hover': {
                                    transform: 'scale(1.2)',
                                    transition: 'transform 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    backgroundColor: 'white'
                                    }
                                }}
                                />
                                <Typography
                                variant="caption"
                                sx={{ 
                                    mt: 2,
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
                      mt: 3,
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