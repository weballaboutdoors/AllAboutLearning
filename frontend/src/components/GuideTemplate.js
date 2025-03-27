/**
 * Guide Template
 * 
 * This template serves as a base for creating new guide pages.
 * 
 * Required Dependencies:
 * - @mui/material
 * - @mui/icons-material
 * - react-router-dom
 * - Your custom components (EditableText, StaggeredFadeIn)
 */

import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  Container, Box, Button, Typography, Paper,
  Grid, Card, CardMedia, Fab
} from '@mui/material';

// CHANGE THESE: Import icons needed for your guide
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import BuildIcon from '@mui/icons-material/Build';
import ConstructionIcon from '@mui/icons-material/Construction';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// CHANGE THIS: Rename function to match your guide (e.g., HingeGuide, LockGuide)
function GuideTemplate() {
    // Core hooks - Keep these the same
    const theme = useTheme();
    const navigate = useNavigate();
    const { guideId } = useParams();

    // API URL Configuration - Keep this the same unless you have different endpoints
    const API_URL = process.env.NODE_ENV === 'production' 
      ? process.env.REACT_APP_PROD_API_URL 
      : process.env.REACT_APP_API_URL;
  
    /**
     * Scroll Trigger Setup
     * Controls the "back to top" button visibility
     * Keep this configuration unless you want different scroll behavior
     */
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
  
    /**
     * Content Loading Function
     * Handles fetching and caching of guide content
     * 
     * CHANGE REQUIRED:
     * - Update error messages to match your guide context
     * - Adjust cache duration if needed (currently 30 mins)
     */
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

    /**
     * Database Interaction Functions
     * Handle saving and retrieving individual content pieces
     * 
     * CHANGE REQUIRED:
     * - Update guide_type in saveContentToDatabase
     * - Adjust error handling if needed
     */
    const getContentFromDatabase = async ({ id, section }) => {
      // ... existing getContentFromDatabase code ...
    };

    const saveContentToDatabase = async ({ id, content, section }) => {
      try {
        // ... existing code ...
        body: JSON.stringify({
          id,
          content,
          section,
          guide_type: 'YOUR_GUIDE_TYPE_HERE'  // CHANGE THIS to match your guide type
        })
        // ... rest of existing code ...
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
      
    };

    /**
     * Cache Management Functions
     * Keep these the same unless you need different cache behavior
     */
    const isCacheExpired = (timestamp) => {
      const CACHE_DURATION = 1800000; // 30 minutes
      return Date.now() - timestamp > CACHE_DURATION;
    };
  
    const clearContentCache = () => {
      sessionStorage.removeItem(`guide-content-${guideId}`);
    };

        /**
     * Guide Content Structure
     * This is the main content definition for your guide
     * 
     * REQUIRED CHANGES:
     * 1. Update 'guide-id-here' to match your guide
     * 2. Customize title, subtitle, and sections
     * 3. Update all IDs to be unique to your guide
     * 4. Add your specific content and images
     */
        const guideContent = {
            'guide-id-here': {  // CHANGE THIS: e.g., 'hinge-guide', 'lock-guide'
              title: {
                props: {
                  variant: "h4",
                  sx: { fontWeight: 500 },
                  defaultContent: "YOUR_MAIN_TITLE",  // CHANGE THIS: Main guide title
                  id: "your-guide-main-title"  // CHANGE THIS: Unique ID for main title
                }
              },
              subtitle: {
                props: {
                  variant: "h7",
                  sx: { color: 'black' },
                  defaultContent: "YOUR_SUBTITLE | AUTHOR | DATE",  // CHANGE THIS
                  id: "your-guide-subtitle"  // CHANGE THIS: Unique subtitle ID
                }
              },
      
              /**
               * Guide Sections
               * Each section represents a major topic in your guide
               * 
               * Section Structure:
               * - id: Unique identifier for the section
               * - icon: Material-UI icon component
               * - title: Section header
               * - content: Contains sections, points, images, and notes
               */
              sections: [
                {
                  // EXAMPLE SECTION - Modify or remove
                  id: "section-1-id",  // CHANGE THIS: Unique section ID
                  icon: <InfoIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
                  title: {
                    props: {
                      variant: "h5",
                      sx: { fontWeight: 500 },
                      defaultContent: "Section 1 Title",  // CHANGE THIS
                      id: "section-1-title"  // CHANGE THIS
                    }
                  },
                  content: {
                    /**
                     * Subsections
                     * Each subsection can have:
                     * 1. Title
                     * 2. Points (bullet points/text)
                     * 3. Single image (appears next to points)
                     * 4. Multiple images (appear in grid below)
                     * 5. Notes (appear at bottom)
                     */
                    sections: [
                      {
                        title: {
                          props: {
                            variant: "h6",
                            defaultContent: "Subsection Title",  // CHANGE THIS
                            id: "subsection-1-title"  // CHANGE THIS
                          }
                        },
                        points: [
                          {
                            props: {
                              variant: "body1",
                              defaultContent: "Point 1 content",  // CHANGE THIS
                              id: "point-1-id"  // CHANGE THIS
                            }
                          },
                          // Add more points as needed
                        ],
                        // OPTIONAL: Single image to appear next to points
                        image: {  
                          src: "/AllAboutLearning/images/YOUR_IMAGE.png",  // CHANGE THIS
                          alt: "Image description",  // CHANGE THIS
                          caption: "Image caption"  // CHANGE THIS
                        }
                      }
                    ],
                    
                    // OPTIONAL: Multiple images to appear in grid
                    images: [  
                      {
                        src: "/AllAboutLearning/images/YOUR_IMAGE1.png",  // CHANGE THIS
                        alt: "Image 1 description",  // CHANGE THIS
                        caption: "Image 1 caption"  // CHANGE THIS
                      },
                      // Add more images as needed
                    ],
      
                    // OPTIONAL: Notes section
                    notes: {
                      props: {
                        variant: "body1",
                        defaultContent: "Important note text here",  // CHANGE THIS
                        id: "section-1-note"  // CHANGE THIS
                      }
                    }
                  }
                },
      
                // OPTIONAL: Installation Steps Section Example
                {
                  id: "installation-section",
                  icon: <BuildIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
                  content: {
                    sections: [{
                      installSteps: {
                        title: {
                          props: {
                            variant: "h6",
                            defaultContent: "Installation Steps:",
                            id: "install-steps-title"
                          }
                        },
                        points: [
                          {
                            props: {
                              variant: "body1",
                              defaultContent: "1. First step instruction",
                              id: "install-step-1"
                            }
                          },
                          // Add more steps as needed
                        ]
                      }
                    }]
                  }
                }
                // Add more sections as needed
              ]
            }
          };
      
          // Initialize content with your guide ID
          const content = guideContent['guide-id-here'];  // CHANGE THIS to match your guide ID

          return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {/* 
               * Header Section
               * Contains: Back button, Title, Divider, Subtitle
               * 
               * REQUIRED CHANGES:
               * 1. Update navigation path in Button onClick
               * 2. Update back button text
               */}
              <StaggeredFadeIn delay={0}>
                <Box sx={{ mb: 4 }}>
                  <Button 
                    onClick={() => navigate('/archives/YOUR-SECTION')}  // CHANGE THIS: Update path
                    sx={{ 
                      color: theme.palette.primary.main,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: theme.palette.primary.dark
                      }
                    }}
                  >
                    ← Back to YOUR SECTION  {/* CHANGE THIS: Update text */}
                  </Button>
    
                  {/* Title - Keep structure, content comes from guideContent */}
                  {content?.title && (
                    <Typography
                      {...content.title.props}  
                      variant={content.title.props.variant}  
                      sx={content.title.props.sx}  
                    >
                      {content.title.props.defaultContent}
                    </Typography>
                  )}
    
                  {/* Divider - Keep this styling unless you want different colors */}
                  <Box 
                    sx={{ 
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                      width: '100%',
                      mt: 2,
                      mb: 2
                    }} 
                  />
    
                  {/* Subtitle - Keep structure, content comes from guideContent */}
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
          
              {/* 
               * Main Content Sections
               * Maps through all sections defined in guideContent
               * 
               * Structure:
               * 1. Section container with icon and title
               * 2. Subsections with points and images
               * 3. Optional grid images
               * 4. Optional notes
               */}
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
                    {/* Section Header with Icon */}
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
    
                    {/* 
                     * Subsections Rendering
                     * Handles:
                     * - Title
                     * - Points with EditableText
                     * - Side-by-side image layout
                     */}
                    {section.content.sections?.map((subsection, subIndex) => (
                        <Box key={`subsection-${subIndex}`} sx={{ mb: 4 }}>
                            {/* Subsection Title */}
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

                                                    {/* 
                         * Content Grid Layout
                         * Two-column layout for text and images
                         * Left: Text content
                         * Right: Image content
                         */}
                        <Grid container spacing={3}>
                          {/* Text Content Column */}
                          <Grid item xs={12} md={6}>
                            <Paper 
                              elevation={1} 
                              sx={{ 
                                p: 2, 
                                height: '100%', 
                                backgroundColor: 'white', 
                                border: `1px solid ${theme.palette.primary.main}` 
                              }}
                            >
                              {/* Render Points */}
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
                                    loadContent={() => getContentFromDatabase({
                                      id: point.props.id,
                                      section: `section-${section.id}-subsection-${subIndex}-point-${pointIndex}`
                                    })}
                                  />
                                </Box>
                              ))}

                              {/* 
                               * Installation Steps (Optional)
                               * Only renders if installSteps are defined in the content
                               */}
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

                          {/* 
                           * Image Column
                           * Handles single images with zoom effect
                           * 
                           * CUSTOMIZATION OPTIONS:
                           * 1. Adjust maxHeight for different image sizes
                           * 2. Modify zoom scale (currently 1.2)
                           * 3. Change transition timing
                           */}
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
                                  image={subsection.image ? subsection.image.src : 
                                    `/AllAboutLearning/images/${subsection.title.props.id.replace('-title', '')}.png`}
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
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                      transform: 'scale(1.2)',
                                      cursor: 'pointer',
                                      backgroundColor: 'white'
                                    }
                                  }}
                                />
                                {/* Image Caption */}
                                <Typography
                                  variant="caption"
                                  sx={{ 
                                    mt: 2,
                                    textAlign: 'center',
                                    color: theme.palette.text.secondary,
                                    backgroundColor: 'white'
                                  }}
                                >
                                  {subsection.image ? subsection.image.caption : 
                                    subsection.title.props.defaultContent}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                        </Grid>
                    </Box>
                ))}

                                {/* 
                 * Direct Points Rendering (Optional)
                 * For points that belong directly to a section rather than a subsection
                 */}
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
    
                {/* 
                 * Grid Images Section (Optional)
                 * Displays multiple images in a responsive grid
                 * Images zoom on hover independently
                 */}
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
                                  overflow: 'hidden'
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
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                      transform: 'scale(1.2)',
                                      cursor: 'pointer'
                                    }
                                  }}
                                />
                              </Card>
                              {/* Grid Image Caption */}
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

                {/* 
                 * Notes Section (Optional)
                 * Displays important notes with distinct styling
                 * Yellow left border for visual distinction
                 */}
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
    
          {/* 
           * Back to Top Button
           * Appears when scrolling down
           * Uses MUI Fade for smooth appearance
           */}
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
    
    export default GuideTemplate;