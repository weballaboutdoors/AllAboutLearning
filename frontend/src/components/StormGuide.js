import React from 'react';
import { 
  Container, Typography, Box, Button, Paper, Grid, Card, CardMedia 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import  StaggeredFadeIn  from './common/StaggeredFadeIn';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ImageIcon from '@mui/icons-material/Image';

function StormGuide() {
  const { guideId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const guideContent = {
    'Columbia Storm Window': {
      title: 'Columbia Storm Window',
      subtitle: 'Columbia Storm Window Installation Guide | Rory Snow | March 12, 2025',
      sections: [
        {
          id: 'general-info',
          title: 'General Information',
          icon: <InfoIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Columbia Storm Window Installation Guide:',
            bulletPoints: [
              'Needs Updating',
              '',
              '',
              '',
              ''
            ],
            notes: ''
          }
        },
        {
          id: 'lock-components',
          title: 'Lock System Components',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Columbia Storm Window Installation Guide:',
            bulletPoints: [
              'Needs Updating',
              '',
              '',
              '',
              ''
            ],
            images: [
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Installation Guide',
                caption: 'Columbia Storm Window Installation Guide'
              }
            ]
          }
        },
        {
          id: 'specifications',
          title: 'Columbia Storm Window Specifications',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Columbia Storm Window Specifications:',
            bulletPoints: [
              'Needs Updating',
              '',
              '',
              '',
              ''
            ],
            callouts: [
              {
                title: 'Available Specifications',
                text: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              }
            ],
            images: [
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Specifications',
                caption: 'Columbia Storm Window Specifications'
              },
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Specifications',
                caption: 'Columbia Storm Window Specifications'
              }
            ]
          }
        },
        {
          id: 'door-handing',
          title: 'Columbia Storm Window',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Columbia Storm Window Door Handing Guide:',
            bulletPoints: [
              'Needs Updating',
              '',
              '',
              ''
            ],
            callouts: [
              {
                title: 'Needs Updating',
                text: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              }
            ],
            notes: 'Needs Updating'
          }
        },
        {
          id: 'proper-alignment',
          title: 'Columbia Storm Window',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Columbia Storm Window Proper Alignment Guide:',
            bulletPoints: [
              'Needs Updating',
              '',
              '',
              ''
            ],
            callouts: [
              {
                title: 'Needs Updating',
                text: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              }
            ],
            images: [
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Proper Alignment',
                caption: 'Columbia Storm Window Proper Alignment'
              },
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Proper Alignment',
                caption: 'Columbia Storm Window Proper Alignment'
              }
            ]
          }
        },
        {
          id: 'operation-guide',
          title: 'Columbia Storm Window',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Proper operation of the HLS7 Multipoint Lock with installed handle set:',
            operationGuides: [
              {
                title: 'Locking from Inside',
                steps: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              },
              {
                title: 'Unlocking from Inside',
                steps: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              },
              {
                title: 'Locking from Outside',
                steps: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              },
              {
                title: 'Unlocking from Outside',
                steps: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              }
            ],
            notes: 'Needs Updating',
            images: [
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Operation',
                caption: 'Columbia Storm Window Operation'
              }
              
            ]
          }
        },
        {
          id: 'handle-components',
          title: 'Columbia Storm Window',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Columbia Storm Window Handle Components:',
            
            callouts: [
              {
                title: 'Needs Updating',
                text: [
                  'Needs Updating',
                  '',
                  '',
                  ''
                ]
              }
            ],
            
            bulletPoints: {
              'Standard Door Parts Packs (Centered Lock)': [
                'Needs Updating',
                '',
                '',
                ''
                
              ],
              'Euro Groove Parts Packs (Off-Center)': [
                'Needs Updating',
                '',
                '',
                ''
              ]
            },
            
            notes: 'Needs Updating',
            
            images: [
              {
                src: '/AllAboutLearning/images/',
                alt: 'Columbia Storm Window Handle Components',
                caption: 'Columbia Storm Window Handle Components'
              }
            ]
          }
        },
        {
          id: 'additional-images',
          title: 'Columbia Storm Window',
          icon: <ImageIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Additional images for Columbia Storm Window components and configurations:',
            imageGallery: [
              {
                title: 'Backplate & Handle Styles',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Color & Finishes',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 2'
              },
              {
                title: 'Standard Door & Handleset Options',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Grip Style MPLS',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Lever Style MPLS',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Backplate Dimensions Solid Brass',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Backplate Dimensions Solid Brass',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Schlage Keyway',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Cylinder Adapter',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              },
              {
                title: 'Exterior Lever Handle Kit Contents',
                src: '/AllAboutLearning/images/',
                alt: 'Description of image 1'
              }
              
              
              // ... Add all 11 images with their titles
            ]
          }
        }
      ]
    }
  };

  const content = guideContent[guideId];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        <Box sx={{ mb: 4 }}>
          <Button 
            onClick={() => navigate('/archives/storm-doors-and-windows')}
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.dark
              }
            }}
          >
            ← Back to Storm Doors & Windows
          </Button>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'secondary.main',
              fontFamily: 'Roboto, sans-serif',
              borderBottom: `3px solid ${theme.palette.primary.main}`,
              pb: 2
            }}
          >
            {content?.title}
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              color: 'black',
              mt: 2
            }}
          >
            {content?.subtitle}
          </Typography>
        </Box>
      </StaggeredFadeIn>

      <StaggeredFadeIn delay={0.2}>
        {content?.sections.map((section, index) => (
          <Paper
            key={section.id}
            elevation={3}
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: 'background.paper',
              border: `1px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {section.icon}
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  ml: 2,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1
                }}
              >
                {section.title}
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography 
                  variant="body1" 
                  color="white" 
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  {section.content.mainText}
                </Typography>

                {section.content.bulletPoints && (
  <Box sx={{ mt: 3 }}>
    {Array.isArray(section.content.bulletPoints) ? (
      // Regular bullet points
      section.content.bulletPoints.map((point, idx) => (
        <Typography 
          key={idx} 
          variant="body1" 
          color="white"
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 2
          }}
        >
          <CheckCircleIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          {point}
        </Typography>
      ))
    ) : (
      // Categorized bullet points
      Object.entries(section.content.bulletPoints).map(([category, items], catIdx) => (
        <Box 
          key={catIdx}
          sx={{ 
            mb: 4,
            p: 2,
            backgroundColor: 'rgba(75, 172, 82, 0.05)',
            borderRadius: 1,
            border: `1px solid ${theme.palette.primary.main}`
          }}
        >
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: `2px solid ${theme.palette.primary.main}`
            }}
          >
            {category}
          </Typography>
          {items.map((item, idx) => (
            <Typography 
              key={idx}
              variant="body1"
              color="white"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                mb: 1.5,
                pl: 2
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontFamily: 'monospace',
                  mr: 2,
                  minWidth: '80px'
                }}
              >
                {item.split(' - ')[0]}
              </Box>
              {item.split(' - ')[1]}
            </Typography>
          ))}
        </Box>
      ))
    )}
  </Box>
)}

                {section.content.operationGuides && (
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                    {section.content.operationGuides.map((guide, idx) => (
                      <Paper
                        key={idx}
                        sx={{
                          flex: '1 1 300px',
                          p: 2,
                          backgroundColor: 'background.paper',
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: 1
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          color="primary"
                          sx={{ 
                            mb: 2,
                            pb: 1,
                            borderBottom: `2px solid ${theme.palette.primary.main}`
                          }}
                        >
                          {guide.title}
                        </Typography>
                        {guide.steps.map((step, stepIdx) => (
                          <Typography 
                            key={stepIdx}
                            variant="body1"
                            color="white"
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              mb: 1,
                              pl: 2
                            }}
                          >
                            {step.startsWith('Note:') ? (
                              <Box sx={{ fontStyle: 'italic' }}>{step}</Box>
                            ) : (
                              <>
                                <Box 
                                  component="span" 
                                  sx={{ 
                                    mr: 1,
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {stepIdx + 1}.
                                </Box>
                                {step}
                              </>
                            )}
                          </Typography>
                        ))}
                      </Paper>
                    ))}
                  </Box>
                )}

                {section.content.callouts && (
                  <Box 
                    sx={{ 
                      mt: 3,
                      mb: 3,
                      p: 2,
                      backgroundColor: 'rgba(75, 172, 82, 0.1)',
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 1
                    }}
                  >
                    {section.content.callouts.map((callout, idx) => (
                      <Box key={idx}>
                        <Typography 
                          variant="h6" 
                          color="primary" 
                          sx={{ 
                            mb: 2,
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                            pb: 1
                          }}
                        >
                          {callout.title}
                        </Typography>
                        {Array.isArray(callout.text) ? (
                          callout.text.map((line, index) => (
                            <Typography 
                              key={index}
                              color="white"
                              sx={{ 
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                '&:before': {
                                  content: '"•"',
                                  color: theme.palette.primary.main,
                                  mr: 1,
                                  fontWeight: 'bold'
                                }
                              }}
                            >
                              {line}
                            </Typography>
                          ))
                        ) : (
                          <Typography color="white">
                            {callout.text}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}

                {section.content.notes && (
                  <Box 
                    sx={{ 
                      mt: 3,
                      p: 2,
                      backgroundColor: 'rgba(255, 193, 7, 0.1)',
                      borderLeft: '4px solid #ffc107',
                      borderRadius: 1
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color="white" 
                      sx={{ fontStyle: 'italic' }}
                    >
                      Important: {section.content.notes}
                    </Typography>
                  </Box>
                )}
              </Grid>


              {section.content.imageGallery && (
  <Grid item xs={12}>
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: { 
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)' 
      },
      gap: 4,
      mt: 3,
      p: 2
    }}>
      {section.content.imageGallery.map((image, idx) => (
        <Box 
          key={idx}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
            position: 'relative', // Added for zoom functionality
            zIndex: 1, // Base z-index
            '&:hover': {
              zIndex: 999 // Ensure hovered image stays on top
            }
          }}
        >
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ 
              mb: 2,
              textAlign: 'center',
              width: '100%',
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              pb: 1
            }}
          >
            {image.title}
          </Typography>
          <Card 
            sx={{ 
              width: '100%',
              backgroundColor: 'transparent',
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.5)', // Increased zoom factor
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                zIndex: 1000,
                backgroundColor: 'transparent'
              }
            }}
          >
            <CardMedia
              component="img"
              image={image.src}
              alt={image.alt}
              sx={{ 
                objectFit: 'contain',
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 1,
                minHeight: 200,
                maxHeight: 300,
                transition: 'all 0.3s ease-in-out'
              }}
            />
          </Card>
        </Box>
      ))}
    </Box>
  </Grid>
)}

              {section.content.images && (
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    flexDirection: { xs: 'column', md: 'row' },
                    mb: 3
                  }}>
                    {section.content.images.map((image, idx) => (
                      <Card 
                        key={idx}
                        sx={{ 
                          flex: 1,
                          backgroundColor: 'transparent'
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={image.src}
                          alt={image.alt}
                          sx={{ 
                            objectFit: 'contain',
                            maxHeight: 400,
                            width: '100%',
                            backgroundColor: 'white',
                            padding: 2,
                            borderRadius: 1
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'white',
                            textAlign: 'center',
                            display: 'block',
                            mt: 1
                          }}
                        >
                          {image.caption}
                        </Typography>
                      </Card>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        ))}
      </StaggeredFadeIn>
    </Container>
  );
}

export default StormGuide;