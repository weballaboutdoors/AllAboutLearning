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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';


function LockGuide() {
  const { guideId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true
  });

  const guideContent = {
    'Hoppe HLS7 MPL': {
      title: 'Hoppe HLS 7',
      subtitle: 'HOPPE HLS7 Multi-Point Lock System - Technical Guide | Rory Snow | March 5, 2024',
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
            notes: 'Pictures, Pictures, Pictures prevents Errors and Returns',
            images: [
              {
                src: '/AllAboutLearning/images/general-information.png',
                alt: 'Hoppe HLS7 MPL',
                caption: 'Hoppe HLS7 MPL'
              }
            ]
          },
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
                src: '/AllAboutLearning/images/lock-system-components.png',
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
            mainText: 'The HOPPE HLS7 Multi-Point Lock System offers versatile security configurations designed for optimal door protection and functionality.',
            sections: [
              {
                title: '3-Point Lock System - Choose From:',
                points: [
                  '  Hook Configuration',
                  '  Shootbolt Configuration',
                  '  Tongue Configuration'
                ]
              },
              {
                title: '5-Point Lock System - Available in:',
                points: [
                  '  Tongues with Shootbolts',
                  '  Hook with Shootbolts'
                ]
              },
              {
                title: 'Standard Specifications',
                points: [
                  'Faceplate Width: 5/8" (16mm)',
                  'Backset Distance: 1-3/4" (45mm)',
                  'Handle to Cylinder Spacing (PZ): 3-5/8" (92mm)',
                  'Egress/Panic Function: Quick exit capability for emergency situations'
                ]
              },
              {
                title: 'Key Features',
                points: [
                  'Built-in Egress functionality for emergency exit',
                  'Panic Function ensures easy exit during emergencies',
                  'Multiple locking points for enhanced security',
                  'Standardized measurements for consistent installation'
                ]
              }
            ],
            images: [
              {
                src: '/AllAboutLearning/images/hoppe-configurations.png',
                alt: 'Lock configurations diagram',
                caption: 'Lock Point Configurations - 3-Point and 5-Point Systems'
              },
              {
                src: '/AllAboutLearning/images/hoppe-configurations2.png',
                alt: 'Additional configurations',
                caption: 'Detailed Configuration Options and Measurements'
              }
            ],
            notes: 'The Egress/Panic Function is a critical safety feature that allows quick exit in emergency situations, meeting building safety requirements.'
          }
        },
        {
          id: 'door-handing',
          title: 'Door Handing Guide',
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Door handing is always determined from the exterior (outside) of the door.',
            sections: [
              {
                title: 'Door Handing Basics',
                points: [
                  'When hinges are on the left, the door is a Left Hand (LH)',
                  'When hinges are on the Right, the door is a Right Hand (RH)',
                  'Inswing or outswing does not determine handing for panic function (Egress)',
                  'Spring latch can be pulled out to reverse handing'
                ]
              },
              {
                title: 'Torx Screw Positions',
                points: [
                  'T15 Torx Screws in "A" position = RIGHT HAND (RH)',
                  'T15 Torx Screws in "B" position = LEFT HAND (LH)'
                ]
              }
            ],
            notes: 'If panic function is on wrong side of lock, it can be changed by adjusting the Torx screw positions.',
            images: [
              {
                src: '/AllAboutLearning/images/door-handing.png',  // Add your image path here
                alt: 'Door Handing Diagram',
                caption: 'Door Handing Guide - Left Hand (LH) vs Right Hand (RH)'
              },
              {
                src: '/AllAboutLearning/images/door-handing-2.png',  // Add your image path here
                alt: 'Door Handing Diagram',
                caption: 'Door Handing Guide - Left Hand (LH) vs Right Hand (RH)'
              }
            ]
          }
        },
        {
          id: 'panic-function',
          title: 'Panic Function',
          icon: <WarningIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'This lock has a panic release function for Egress. The interior side of the door is always Unlocked. The inside has the Panic Function that allows exiting by pushing down on lever.',
            bulletPoints: [
              'Check panic function before installing lock',
              'Spring latch can be pulled out with pliers to reverse latch for inswing or outswing doors',
              'If panic function is on wrong side of lock, it can be changed:',
              '- Remove A screw, Flip lock over and install in Y side',
              '- Remove Z screw, Flip lock over and install in B Side'
            ],
            images: [
              {
                src: '/AllAboutLearning/images/panic-function.png',  // Update with actual image path
                alt: 'Panic function mechanism and installation diagram'
              }
            ]
          }
        },
        {
          id: 'proper-alignment',
          title: 'Proper Alignment Guide',
          icon: <BuildIcon sx={{ color: theme.palette.primary.main }} />,
          content: {
            mainText: 'Proper alignment is crucial for the lock to function correctly. Pay special attention to the "half-moon" slot positioning:',
            sections: [
              {
                title: 'Half-Moon Slot Positioning',
                points: [
                  'The "half-moon" slot nub next to the handle hub must be positioned at:',
                  '3 o\'clock position OR',
                  '9 o\'clock position',
                  'Position depends on which side of the gear box you\'re on'
                ]
              },
              {
                title: 'Important Installation Notes',
                points: [
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
            sections: [
              {
                title: 'Locking from Inside',
                points: [
                  'Turn thumb turn to horizontal position',
                  'Lift handle to engage additional locking devices'
                ]
              },
              {
                title: 'Unlocking from Inside',
                points: [
                  'Depress Lever, latch and all locking points will retract',
                  'Note: Thumbturn rotates back to vertical position automatically when handleset and spring cassette are installed',
                  'Optional: turn thumb latch, depress lever'
                ]
              },
              {
                title: 'Locking from Outside',
                points: [
                  'Insert key and turn towards door jamb',
                  'Lift handle to engage additional locking devices'
                ]
              },
              {
                title: 'Unlocking from Outside',
                points: [
                  'Insert key and turn toward hinges',
                  'Depress lever to open door'
                ]
              }
            ],
            notes: 'If handle set is not installed, use a flat blade screwdriver to extend deadbolt and test panic function before using lock.',
            images: [
              {
                src: '/AllAboutLearning/images/operation.png',
                alt: 'Interior operation',
                caption: 'Interior Operation'
              },
              {
                src: '/AllAboutLearning/images/operation-2.png',
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
              ],
              'Essential Components': [
                '2702170 - Cassette Spring Cartridge',
                '1958579 - Cylinder Adaptor 8 x 23mm - Black'
              ]
            },
            
            notes: 'Always verify the door thickness and configuration before ordering parts.',
            
            images: [
              {
                src: '/AllAboutLearning/images/hoppe11.png',
                alt: 'HLS7 Handle Components',
                caption: 'HLS7 Handle Set Components'
              },
              {
                src: '/AllAboutLearning/images/handle-components.png',
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
            bulletPoints: [],  // Empty array since we don't need bullet points
            imageGallery: [
              {
                title: 'Backplate & Handle Styles',
                src: '/AllAboutLearning/images/hoppe1.png',
                alt: 'Backplate and handle styles for HOPPE HLS7'
              },
              {
                title: 'Color & Finishes',
                src: '/AllAboutLearning/images/hoppe2.png',
                alt: 'Available colors and finishes'
              },
              {
                title: 'Standard Door & Handleset Options',
                src: '/AllAboutLearning/images/hoppe3.png',
                alt: 'Standard door and handleset options'
              },
              {
                title: 'Grip Style MPLS',
                src: '/AllAboutLearning/images/hoppe4.png',
                alt: 'Grip style multi-point locking system'
              },
              {
                title: 'Lever Style MPLS',
                src: '/AllAboutLearning/images/hoppe5.png',
                alt: 'Lever style multi-point locking system'
              },
              {
                title: 'Backplate Dimensions Solid Brass',
                src: '/AllAboutLearning/images/hoppe6.png',
                alt: 'Solid brass backplate dimensions - view 1'
              },
              {
                title: 'Backplate Dimensions Solid Brass',
                src: '/AllAboutLearning/images/hoppe7.png',
                alt: 'Solid brass backplate dimensions - view 2'
              },
              {
                title: 'Schlage Keyway',
                src: '/AllAboutLearning/images/hoppe8.png',
                alt: 'Schlage keyway specifications'
              },
              {
                title: 'Cylinder Adapter',
                src: '/AllAboutLearning/images/hoppe9.png',
                alt: 'Cylinder adapter specifications'
              },
              {
                title: 'Exterior Lever Handle Kit Contents',
                src: '/AllAboutLearning/images/hoppe10.png',
                alt: 'Complete exterior lever handle kit contents'
              }
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
              backgroundColor: '#faf9f6',
              border: `1px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {section.icon}
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'black',
                  ml: 2,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1
                }}
              >
                {section.title}
              </Typography>
            </Box>
  
            {section.id === 'additional-images' ? (
              // Additional Images Section
              <Grid container spacing={2}>
                {section.content.imageGallery.map((image, idx) => (
                  <Grid item xs={12} sm={6} md={2.4} key={idx}>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 1,
                        p: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '300px'
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'black',
                          mb: 2,
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'normal'
                        }}
                      >
                        {image.title}
                      </Typography>
                      <Box 
                        sx={{ 
                          flex: 1,
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Card 
                          sx={{ 
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            position: 'relative',
                            '&:hover': {
                              transform: 'scale(2.5)',
                              zIndex: 999,
                              transition: 'transform 0.3s ease-in-out',
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
                              height: '200px',
                              backgroundColor: 'white',
                              padding: 1,
                              borderRadius: 1
                            }}
                          />
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (

            

            // Regular Section Content
            <Grid container spacing={4}>
              {/* Text Content Box */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 1,
                    p: 3,
                    height: '100%',
                    minHeight: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  <Typography 
                    variant="body1" 
                    color="black" 
                    sx={{ mb: 1, lineHeight: 1.5 }}
                  >
                    {section.content.mainText}
                  </Typography>

                  {section.content.sections ? (
                    // New sections format
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {section.content.sections.map((subsection, idx) => (
                        <Box key={idx} sx={{ mb: 2 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'black',
                              borderBottom: `2px solid ${theme.palette.primary.main}`,
                              pb: 1,
                              mb: 2,
                              display: 'inline-block',
                              fontSize: '1.1rem'
                            }}
                          >
                            {subsection.title}
                          </Typography>
                          {subsection.points.map((point, pointIdx) => (
                            <Typography 
                              key={pointIdx} 
                              variant="body1" 
                              color="black"
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'flex-start',
                                mb: 1.5,
                                pl: 2,
                                fontSize: '1.1rem',
                                lineHeight: 1.1
                              }}
                            >
                              <CheckCircleIcon 
                                sx={{ 
                                  mr: 2, 
                                  color: theme.palette.primary.main,
                                  mt: 0.5,
                                  fontSize: '1.2rem'
                                }} 
                              />
                              {point}
                            </Typography>
                          ))}
                        </Box>
                      ))}
                    </Box>
                  ) : section.content.bulletPoints && (
                    // Original bullet points format
                    <Box sx={{ mt: 3 }}>
                      {Array.isArray(section.content.bulletPoints) ? (
                        section.content.bulletPoints.map((point, idx) => (
                          <Typography 
                            key={idx} 
                            variant="body1" 
                            color="black"
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
                                color="black"
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
                </Box>
              </Grid>

              {/* Image Content Box */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    height: '100%',
                  }}
                >
                  {section.content.images && section.content.images.map((image, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        backgroundColor: 'white',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 1,
                        p: 2,
                        maxHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        position: 'relative',
                        zIndex: 1,
                        '&:hover': {
                          zIndex: 999
                        }
                      }}
                    >
                      <Card 
                        sx={{ 
                          backgroundColor: 'white',
                          border: 'none',
                          boxShadow: 'none',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.5)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
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
                            maxHeight: '400px',
                            cursor: 'pointer'
                          }}
                        />
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Operation Guides */}
              {section.content.operationGuides && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                    {section.content.operationGuides.map((guide, idx) => (
                      <Paper
                        key={idx}
                        sx={{
                          flex: '1 1 250px',
                          p: 2,
                          backgroundColor: 'white',
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: 1
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: theme.palette.primary.main,
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
                            color="black"
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              mb: 1.5,
                              pl: 2
                            }}
                          >
                            {step.startsWith('Note:') ? (
                              <Box sx={{ 
                                fontStyle: 'italic',
                                color: theme.palette.primary.main 
                              }}>
                                {step}
                              </Box>
                            ) : (
                              <>
                                <Box 
                                  component="span" 
                                  sx={{ 
                                    mr: 2,
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold',
                                    minWidth: '20px'
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
                </Grid>
              )}

              {/* Callouts */}
              {section.content.callouts && (
                <Grid item xs={12}>
                  {section.content.callouts.map((callout, idx) => (
                    <Box 
                      key={idx}
                      sx={{ 
                        mt: 3,
                        mb: 3,
                        p: 2,
                        backgroundColor: 'rgba(75, 172, 82, 0.1)',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 1
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.primary.main,
                          mb: 2,
                          pb: 1,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}
                      >
                        {callout.title}
                      </Typography>
                      {Array.isArray(callout.text) ? (
                        callout.text.map((item, textIdx) => (
                          <Typography 
                            key={textIdx}
                            variant="body1"
                            color="black"
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                              pl: 2
                            }}
                          >
                            <CheckCircleIcon 
                              sx={{ 
                                mr: 2, 
                                color: theme.palette.primary.main,
                                fontSize: '1rem'
                              }} 
                            />
                            {item}
                          </Typography>
                        ))
                      ) : (
                        <Typography 
                          variant="body1" 
                          color="black"
                          sx={{ pl: 2 }}
                        >
                          {callout.text}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Grid>
              )}

              {/* Notes */}
              {section.content.notes && (
                <Grid item xs={12}>
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
                      color="black" 
                      sx={{ fontStyle: 'italic' }}
                    >
                      Important: {section.content.notes}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
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
          backgroundColor: '#4BAC52',
          '&:hover': {
            backgroundColor: '#3d8b42'
          }
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon sx={{ color: 'white' }} />
      </Fab>
    </Fade>
  </Container>

  );
}

export default LockGuide;