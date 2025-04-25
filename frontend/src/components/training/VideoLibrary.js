import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Divider, Card, Fab, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VideoCard from './VideoCard';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import { useTheme } from '@mui/material/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function VideoLibrary() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const videoCategories = [
    {
      id: 'door-handles',
      title: 'Door Handles & Levers',
      videos: [
        {
          title: 'Storm Door Handle Set Installation',
          description: 'Step-by-step guide for installing storm door handle sets',
          videoId: 'YOJv63CnBs4'
        },
        {
          title: 'Emtek Handle Sets - Changing Handing',
          description: 'How to change the handing of an Emtek handle set',
          videoId: 'FD4nRfFBWek'
        },
        {
          title: 'Handle Set Installation',
          description: 'How to install a handleset in a door with an Andersen multipoint lock',
          videoId: '-HswsQJliCQ'
        },
        {
          title: 'Handle Sets',
          description: 'Discussing the different types of handle sets for Multi-Point Locks',
          videoId: 'GyiVA-Pm94A'
        },
        {
          title: 'Replace a Sliding Door Handle',
          description: 'How to replace a sliding patio door handle',
          videoId: 'ud1Um0Abw_g'
        },
        {
          title: 'Pella Sliding Door Handle Set ',
          description: 'How to install a Pella sliding door handle set',
          videoId: 'SBhOLfyEoxM'
        },
        {
          title: 'Measuring Handle Height',
          description: 'How to measure the height of a handle set',
          videoId: 'PU4Wfiev8IQ'
        },
        {
          title: 'Kwikset Entry Handle',
          description: 'How To change the handing on a kwikset entry handle',
          videoId: 'QXP_9iXv1L0'
        }
      ]
    },
    {
      id: 'multipoint-locks',
      title: 'Multi-Point Locks',
      videos: [
        {
          title: 'Rehanding a GU Multi-Point Lock',
          description: 'How to rehand a GU multi-point lock',
          videoId: 'JqfVdyXV9Bc'
        },
        {
          title: 'Rehanding Ashland Multi-Point Locks',
          description: 'How to rehand an Ashland multi-point lock',
          videoId: '8QQCIZtgh6c'
        },
        {
          title: 'Multi-Point Lock Guide',
          description: 'Learn the basics of multi-point locks',
          videoId: 'ChozyCEPNKY'
        },
        {
          title: 'Multi-Point Lock with Shootbolts',
          description: 'How to replace a multi-point lock with shootbolts',
          videoId: 'pfHiq7H_HCc'
        },
        {
          title: 'GU Multi-Point Lock Case',
          description: 'Replacing the lock case on a GU MPL',
          videoId: 'i32nI91Zn64'
        },
        {
          title: 'Repair an IPD Multi-Point Lock',
          description: 'How to repair an IPD multi-point lock',
          videoId: 'wy52QPGa2WY'
        },
        {
          title: 'Multi-Point Locking Devices: Roundbolt',
          description: 'Learn about the roundbolt multi-point lock',
          videoId: 'WlyrMttgTto'
        },
        {
          title: 'Multi-Point Locking Devices: Rollers',
          description: 'Learn about the rollers multi-point lock',
          videoId: 'mGKuxWRh6Bg'
        },
        {
          title: 'Multi-Point Locking Devices: Shootbolt',
          description: 'Learn about the shootbolt multi-point lock',
          videoId: 'hbJfhbpA0rk'
        },
        {
          title: 'Multi-Point Locking Devices: Hook',
          description: 'Learn about the hook multi-point lock',
          videoId: '3y5v60BA66s'
        },
        {
          title: 'Multi-Point Locking Devices: Tongue',
          description: 'Learn about the tongue multi-point lock',
          videoId: 'qK2SEh_2xHQ'
        },
        {
          title: 'Measure a Backset for a Hoppe MPL',
          description: 'How to measure a backset for a Hoppe multi-point lock',
          videoId: 'nLbtDuAyS9k'
        }
      ]
    },
    {
      id: 'deadbolts',
      title: 'Deadbolt Locks',
      videos: [
        {
          title: 'How to Measure a Deadbolt Throw',
          description: 'Learn how to properly measure deadbolt throw length',
          videoId: 'qnwI1y13e9c'
        },
        {
          title: 'How to Replace a Deadbolt Lock',
          description: 'Step-by-step guide for replacing an existing deadbolt',
          videoId: 'PQnzsL87mos'
        },
        {
          title: 'Installing a Double Cylinder Deadbolt',
          description: 'Complete installation process for double cylinder deadbolts',
          videoId: 'OCHRgNjvo2o'
        }
      ]
    },
    {
      id: 'hinges',
      title: 'Door Hinges',
      videos: [
        {
          title: 'All About Door Hinges',
          description: 'Complete guide to door hinge types, installation, and maintenance',
          videoId: 'I6EBdxdOZtA'
        }
        // Add more hinge videos
      ]
    },
    {
      id: 'window-operators',
      title: 'Window Operators',
      videos: [
        {
          title: 'Identify Casement Window Operators',
          description: 'Learn about different types of casement window operators and their applications',
          videoId: 'hWWILNbx7hY'
        }
      ]
    },
    {
      id: 'weatherstripping',
      title: 'Weatherstripping',
      videos: [
        {
          title: 'Easily Install Window Weatherstripping',
          description: 'Instructions for installing weatherstripping on windows',
          videoId: 'hTH0PMVg3_A'
        },
        {
          title: 'How to Measure Weatherstripping',
          description: 'How to measure different styles of weatherstripping',
          videoId: 'yXS4ahvtetU'
        },
        {
          title: 'Different Styles of Weatherstripping',
          description: 'Different styles of weatherstripping and their applications',
          videoId: '0OFnPpUKmPs'
        }
      ]
    },
    {
      id: 'door-bottoms',
      title: 'Door Bottoms & Sweeps',
      videos: [
        {
          title: 'Installing Door Sweeps',
          description: 'Complete guide to installing different types of door sweeps',
          videoId: 'CcueimH49WU'
        },
        /*{
          title: 'Automatic Door Bottom Installation',
          description: 'How to install and adjust automatic door bottoms',
          videoId: 'YOUR_AUTO_BOTTOM_VIDEO_ID'
        }*/
      ]
    },
    {
      id: 'windows',
      title: 'Windows',
      videos: [
        {
          title: 'Awning Windows',
          description: 'A guide to awning window types, hardware and operation',
          videoId: '4Zn0WPvIsKQ'
        },
        {
          title: 'Andersen Power Operator Installation',
          description: 'Install an Andersen power window operator',
          videoId: 'fjkaPgNEGvI'
        },
        {
          title: 'Different Types of Windows',
          description: 'Learn about various window styles and their applications',
          videoId: '4RCfJ7rf6gQ'
        },
        {
          title: 'Replace Basement Windows',
          description: 'Step-by-step guide to replacing basement windows',
          videoId: 'g5QJXbGOxgc'
        }
      ]
    },
    /* Commenting out these categories until videos are ready
    {
      id: 'thresholds',
      title: 'Door Thresholds',
      videos: [
        {
          title: 'Replacing Door Thresholds',
          description: 'Step-by-step guide for replacing worn door thresholds',
          videoId: 'YOUR_THRESHOLD_VIDEO_ID'
        },
        {
          title: 'Adjustable Threshold Guide',
          description: 'How to properly adjust door thresholds for optimal sealing',
          videoId: 'YOUR_ADJUST_THRESHOLD_VIDEO_ID'
        }
      ]
    },
    {
      id: 'storm-products',
      title: 'Storm Doors & Windows',
      videos: [
        {
          title: 'Storm Door Installation',
          description: 'Complete installation guide for storm doors',
          videoId: 'YOUR_STORM_DOOR_VIDEO_ID'
        },
        {
          title: 'Storm Window Maintenance',
          description: 'How to maintain and repair storm windows',
          videoId: 'YOUR_STORM_WINDOW_VIDEO_ID'
        }
      ]
    },
    {
      id: 'specialty',
      title: 'Specialty Hardware',
      videos: [
        {
          title: 'French Door Astragal Installation',
          description: 'Installing and adjusting French door astragals',
          videoId: 'YOUR_ASTRAGAL_VIDEO_ID'
        },
        {
          title: 'Panic Hardware Basics',
          description: 'Understanding and installing commercial panic hardware',
          videoId: 'YOUR_PANIC_VIDEO_ID'
        }
      ]
    }
    */
  ];

  useEffect(() => {
    videoCategories.forEach(category => {
      category.videos.forEach(video => {
        const img = new Image();
        img.src = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
      });
    });
  }, []);

  const renderCategoryVideos = (videos) => {
    return (
      <Grid container spacing={2}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <VideoCard
              title={video.title}
              description={video.description}
              videoId={video.videoId}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <StaggeredFadeIn delay={0}>
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/archives')}
          sx={{ 
            mb: 3,
            color: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(75, 172, 82, 0.1)' }
          }}
        >
          ← Back to Archives
        </Button>

        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 450,
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: '2rem'
          }}>
            All About Videos
          </Typography>
        </Box>

        <Divider 
          sx={{ 
            my: 4, 
            borderColor: theme.palette.primary.main,
            borderWidth: '1px',
            '&::before, &::after': {
              borderColor: theme.palette.primary.main,
            }
          }}
        />

        {/* Introduction paragraph */}
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: '1.1rem',
            maxWidth: '1100px',
            fontFamily: 'Roboto, sans-serif',
            lineHeight: 1.6,
            mb: 4  // Add margin to separate from Table of Contents
          }}
        >
          Welcome to our video library! Here you'll find a comprehensive collection of instructional videos covering everything from door handle installations to window operations. Each video provides step-by-step guidance to help you understand our products and their proper installation techniques. Browse through our categorized sections below to find the specific information you need.
        </Typography>

        {/* Table of Contents Card */}
        <Card sx={{ 
          mb: 6,
          backgroundColor: 'black',
          border: `1px solid ${theme.palette.primary.main}`,
          p: 3
        }}>
          <Box
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              mb: 2
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.main,
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              Table of Contents
            </Typography>
            <Box sx={{ 
              position: 'absolute',
              right: 0,
              color: theme.palette.primary.main
            }}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </Box>

          <Collapse in={isExpanded}>
            <Grid container spacing={2}>
              {videoCategories.map((category) => (
                <Grid item xs={12} sm={6} key={category.id}>
                  <Box
                    component="a"
                    href={`#${category.id}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: 'background.paper',
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        backgroundColor: 'rgba(75, 172, 82, 0.1)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        textAlign: 'center',
                        transition: 'color 0.3s ease',
                        fontSize: '1rem',
                        fontWeight: 500
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Card>

        {/* Video Categories */}
        {videoCategories.map((category) => (
          <Box 
            key={category.id} 
            id={category.id} 
            sx={{ mb: 6 }}
          >
            <Typography variant="h5" sx={{ 
              mb: 3,
              color: 'black',
              fontWeight: 500 
            }}>
              {category.title}
            </Typography>
            {renderCategoryVideos(category.videos)}
          </Box>
        ))}
      </StaggeredFadeIn>

      {/* Back to Top Button */}
      <Zoom in={showScroll}>
        <Fab 
          color="primary" 
          size="medium"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#4bac52',
            width: 58,
            height: 58,
            '&:hover': {
              backgroundColor: '#3d8a42'
            }
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} />
        </Fab>
      </Zoom>
    </Container>
  );
}

export default VideoLibrary; 