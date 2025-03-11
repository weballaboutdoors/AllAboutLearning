import React from 'react';
import { 
  Container, Typography, Box, Button, Paper, Grid, Card, CardMedia 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import  StaggeredFadeIn  from './StaggeredFadeIn';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ImageIcon from '@mui/icons-material/Image';
function LockGuide() {
  const { guideId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const guideContent = {
    'Hoppe HLS7 MPL': {
      title: 'Hoppe HLS 7',
      subtitle: 'Essential information about multi-point lock systems',
      sections: [
        {
          id: 'general-info',
          title: 'General Information',
          icon: <InfoIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Multipoint locks operate differently by brand and model. When working with HOPPE locks, there are several important factors to consider:',
            bulletPoints: [
              'HOPPE does NOT offer internal repair parts for their locks',
              'Only the lower assembly or complete lock with extensions are available for purchase',
              'Lock case only is NOT available from HOPPE',
              'Pictures are essential for accurate identification and service',
              'Always verify information received from HOPPE as it may not always be correct'
            ],
            notes: 'Pictures, Pictures, Pictures prevents Errors and Returns'
          }
        },
        {
          id: 'lock-components',
          title: 'Lock System Components',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'The multi-point lock system consists of multiple components working together:',
            bulletPoints: [
              'Bottom assembly is 1/2 of the Multipoint Lock system',
              'Top extension is added to lower assembly to complete assembly',
              'Extension length is determined by door height',
              'Standard Handle Height (HH) is 36 inches'
            ],
            images: [
              {
                src: '/AllAboutLearning/images/multipointlock.jpg',
                alt: 'Multi-point lock components',
                caption: 'Lock Components'
              }
            ]
          }
        },
        {
          id: 'specifications',
          title: 'HOPPE HLS7 Specifications',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'HOPPE HLS7 comes with various locking point configurations:',
            bulletPoints: [
              '3-point locks with Hook, Shootbolt or Tongue',
              '5-point locks with Tongues and Shootbolts or Hook with Shootbolts'
            ],
            callouts: [
              {
                title: 'Available Specifications',
                text: [
                  '5/8" (16mm) faceplate',
                  '1-3/4" (45mm) backset',
                  '3-5/8" (92mm) handle to cylinder spacing (PZ)'
                ]
              }
            ],
            images: [
              {
                src: '/AllAboutLearning/images/hoppe-configurations.png',
                alt: 'Lock configurations diagram',
                caption: 'Lock Point Configurations'
              },
              {
                src: '/AllAboutLearning/images/hoppe-configurations2.png',
                alt: 'Additional configurations',
                caption: 'Additional Configurations'
              }
            ]
          }
        },
        {
          id: 'door-handing',
          title: 'Door Handing Guide',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Door handing is always determined from the exterior (outside) of the door.',
            bulletPoints: [
              'When hinges are on the left, the door is a Left Hand (LH)',
              'When hinges are on the Right, the door is a Right Hand (RH)',
              'Inswing or outswing does not determine handing for panic function (Egress)',
              'Spring latch can be pulled out to reverse handing'
            ],
            callouts: [
              {
                title: 'Torx Screw Positions',
                text: [
                  'T15 Torx Screws in "A" position = RIGHT HAND (RH)',
                  'T15 Torx Screws in "B" position = LEFT HAND (LH)'
                ]
              }
            ],
            notes: 'If panic function is on wrong side of lock, it can be changed by adjusting the Torx screw positions.'
          }
        },
        {
          id: 'proper-alignment',
          title: 'Proper Alignment Guide',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Proper alignment is crucial for the lock to function correctly. Pay special attention to the "half-moon" slot positioning:',
            bulletPoints: [
              'The "half-moon" slot nub next to the handle hub must be positioned at:',
              '3 o\'clock position OR',
              '9 o\'clock position',
              'Position depends on which side of the gear box you\'re on'
            ],
            callouts: [
              {
                title: 'Important Installation Notes',
                text: [
                  'If the nub is not properly positioned, the gear will not work',
                  'Handle set with spring assist will naturally move to proper position when installed',
                  'When lock is out of the door, manually ensure nub is at 3 or 9 o\'clock'
                ]
              }
            ],
            images: [
              {
                src: '/AllAboutLearning/images/proper-alignment1.png',
                alt: '3 o\'clock position',
                caption: '3 o\'clock position'
              },
              {
                src: '/AllAboutLearning/images/proper-alignment2.png',
                alt: '9 o\'clock position',
                caption: '9 o\'clock position'
              }
            ]
          }
        },
        {
          id: 'operation-guide',
          title: 'Operation of HLS7 Multipoint Lock',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Proper operation of the HLS7 Multipoint Lock with installed handle set:',
            operationGuides: [
              {
                title: 'Locking from Inside',
                steps: [
                  'Turn thumb turn to horizontal position',
                  'Lift handle to engage additional locking devices'
                ]
              },
              {
                title: 'Unlocking from Inside',
                steps: [
                  'Depress Lever, latch and all locking points will retract',
                  'Note: Thumbturn rotates back to vertical position automatically when handleset and spring cassette are installed',
                  'Optional: turn thumb latch, depress lever'
                ]
              },
              {
                title: 'Locking from Outside',
                steps: [
                  'Insert key and turn towards door jamb',
                  'Lift handle to engage additional locking devices'
                ]
              },
              {
                title: 'Unlocking from Outside',
                steps: [
                  'Insert key and turn toward hinges',
                  'Depress lever to open door'
                ]
              }
            ],
            notes: 'If handle set is not installed, use a flat blade screwdriver to extend deadbolt and test panic function before using lock.',
            images: [
              {
                src: '/AllAboutLearning/images/operation1.png',
                alt: 'Interior operation',
                caption: 'Interior Operation'
              }
              
            ]
          }
        },
        {
          id: 'handle-components',
          title: 'HOPPE HLS7 Handle Set Components',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'The HOPPE HLS7 handle set consists of various components and parts packs designed for different door configurations:',
            
            callouts: [
              {
                title: 'Essential Components',
                text: [
                  '2702170 - Cassette Spring Cartridge',
                  '1958579 - Cylinder Adaptor 8 x 23mm - Black'
                ]
              }
            ],
            
            bulletPoints: {
              'Standard Door Parts Packs (Centered Lock)': [
                '2753954 - HLS7 Parts Pack - 1-3/4" Active Door',
                '2776136 - HLS7 Parts Pack - 2-1/4" Active Door',
                '2753920 - HLS7 Parts Pack - 1-3/4" Inactive Door',
                '2753938 - HLS7 Parts Pack - 2-1/4" Inactive Door'
              ],
              'Euro Groove Parts Packs (Off-Center)': [
                '3084211 - HLS7 Parts Pack - 2-1/4" Active Door Off Center',
                '3084220 - HLS7 Parts Pack - 2-1/4" Inactive Door Off Center'
              ]
            },
            
            notes: 'Always verify the door thickness and configuration before ordering parts.',
            
            images: [
              {
                src: '/AllAboutLearning/images/hoppe11.png',
                alt: 'HLS7 Handle Components',
                caption: 'HLS7 Handle Set Components'
              }
            ]
          }
        },
        {
          id: 'additional-images',
          title: 'HOPPE HLS7 Additional Images',
          icon: <ImageIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Additional images for HOPPE HLS7 components and configurations:',
            imageGallery: [
              {
                title: 'Backplate & Handle Styles',
                src: '/AllAboutLearning/images/hoppe1.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Color & Finishes',
                src: '/AllAboutLearning/images/hoppe2.png',
                alt: 'Description of image 2'
              },
              {
                title: 'Standard Door & Handleset Options',
                src: '/AllAboutLearning/images/hoppe3.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Grip Style MPLS',
                src: '/AllAboutLearning/images/hoppe4.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Lever Style MPLS',
                src: '/AllAboutLearning/images/hoppe5.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Backplate Dimensions Solid Brass',
                src: '/AllAboutLearning/images/hoppe6.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Backplate Dimensions Solid Brass',
                src: '/AllAboutLearning/images/hoppe7.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Schlage Keyway',
                src: '/AllAboutLearning/images/hoppe8.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Cylinder Adapter',
                src: '/AllAboutLearning/images/hoppe9.png',
                alt: 'Description of image 1'
              },
              {
                title: 'Exterior Lever Handle Kit Contents',
                src: '/AllAboutLearning/images/hoppe10.png',
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
            onClick={() => navigate('/archives/multipoint-locks')}
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.dark
              }
            }}
          >
            ← Back to Multi-Point Locks
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

export default LockGuide;