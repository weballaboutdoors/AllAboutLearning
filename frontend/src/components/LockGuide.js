import React from 'react';
import { 
  Container, Typography, Box, Button, Paper, Grid, Card, CardMedia, Fab, CardContent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './common/StaggeredFadeIn';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ImageIcon from '@mui/icons-material/Image';  
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import EditableText from './common/EditableText';
import { useGuideContent } from '../context/GuideContentContext';

function LockGuide() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { loadGuideContent } = useGuideContent();
  const { guideId } = useParams();
  const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_PROD_API_URL 
  : process.env.REACT_APP_API_URL;

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
      console.log('Non-admin fetching content for:', { id, section, cacheKey });
  
      // Check sessionStorage first
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData && cachedData !== 'undefined') {
        try {
          const parsed = JSON.parse(cachedData);
          if (parsed && parsed.data) {
            console.log('Returning cached data:', parsed.data);
            return parsed.data;
          }
          if (parsed) {
            console.log('Returning raw cached data:', parsed);
            return parsed;
          }
        } catch (parseError) {
          console.log('Invalid cache data, removing:', cacheKey);
          sessionStorage.removeItem(cacheKey);
        }
      }
  
      console.log('No cache found, fetching from server');
      const url = `${API_URL}/api/guide-content/${encodeURIComponent(id)}/${encodeURIComponent(section)}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Fetched data:', data);
  
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch content');
      }
  
      if (data.content) {
        // Only cache valid content
        const cacheData = {
          data: data.content,
          timestamp: Date.now()
        };
        console.log('Caching new data:', cacheData);
        sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
        return data.content;
      }
      return null;
    } catch (error) {
      console.error('Error loading content:', error);
      return null;
    }
  };

  // Modified to update both cache and database
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
          guide_type: 'hls7'
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

  // Keep your existing helper functions
  const isCacheExpired = (timestamp) => {
    const CACHE_DURATION = 1800000; // 30 minutes
    return Date.now() - timestamp > CACHE_DURATION;
  };

  const clearContentCache = () => {
    sessionStorage.removeItem(`guide-content-${guideId}`);
  };
  


  const guideContent = {
    'Hoppe HLS7 MPL': {
      title: <EditableText
        id="hoppe-guide-title"  // This ID matches what we see in the GET requests
        defaultContent="Hoppe HLS 7"
        variant="h3"
        getContent={() => getContentFromDatabase({
          id: "hoppe-guide-title",
          section: "title"
        })}
        onSave={(content) => saveContentToDatabase({
          id: "hoppe-guide-title",  // Make sure these match
          content: content,
          section: "title",
          guide_type: "hls7"
        })}
      />,
      subtitle: <EditableText
        id="hoppe-guide-subtitle"  // This ID matches what we see in the GET requests
        defaultContent="HOPPE HLS7 Multi-Point Lock System - Technical Guide | Rory Snow | March 2025"
        variant="subtitle1"
        sx={{ color: 'black' }}
        getContent={() => getContentFromDatabase({
          id: "hoppe-guide-subtitle",
          section: "subtitle"
        })}
        onSave={(content) => saveContentToDatabase({
          id: "hoppe-guide-subtitle",  // Make sure these match
          content: content,
          section: "subtitle",
          guide_type: "hls7"
        })}
      />,
      sections: [
        {
          id: 'general-info',
          title: <EditableText
            id="general-info-title"
            defaultContent="General Information"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "general-info-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "general-info-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <InfoIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="general-info-maintext"
              defaultContent="Multipoint locks operate differently by brand and model. When working with HOPPE locks, there are several important factors to consider:"
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "general-info-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "general-info-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            bulletPoints: [
              {
                id: "general-info-bullet-1",
                defaultContent: "HOPPE does NOT offer internal repair parts for their locks",
                bulletNumber: 1
              },
              {
                id: "general-info-bullet-2",
                defaultContent: "Only the lower assembly or complete lock with extensions are available for purchase",
                bulletNumber: 2
              },
              {
                id: "general-info-bullet-3",
                defaultContent: "Lock case only is NOT available from HOPPE",
                bulletNumber: 3
              },
              {
                id: "general-info-bullet-4",
                defaultContent: "Pictures are essential for accurate identification and service",
                bulletNumber: 4
              },
              {
                id: "general-info-bullet-5",
                defaultContent: "Always verify information received from HOPPE as it may not always be correct",
                bulletNumber: 5
              }
            ].map((bullet) => (
              <EditableText 
                key={bullet.bulletNumber}
                id={bullet.id}
                defaultContent={bullet.defaultContent}
                variant="body2"
                getContent={() => getContentFromDatabase({
                  id: bullet.id,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                onSave={(newContent) => saveContentToDatabase({
                  id: bullet.id,
                  content: newContent,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                sx={{ fontSize: '1.1rem' }}
              />
            )),
            notes: <EditableText
              id="general-info-notes"
              defaultContent="Important: Pictures, Pictures, Pictures prevents Errors and Returns"
              variant="body2"
              getContent={() => getContentFromDatabase({
                id: "general-info-notes",
                section: "notes"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "general-info-notes",
                content: newContent,
                section: "notes"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            images: [
              {
                src: '/AllAboutLearning/images/general-information.png',
                alt: 'Hoppe HLS7 MPL',
                caption: 'Hoppe HLS7 MPL'
              }
            ]
          }
        },
        {
          id: 'lock-components',
          title: <EditableText
            id="lock-components-title"
            defaultContent="Lock System Components"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "lock-components-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "lock-components-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <BuildIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="lock-components-maintext"
              defaultContent="The multi-point lock system consists of multiple components working together:"
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "lock-components-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "lock-components-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            bulletPoints: [
              {
                id: "lock-components-bullet-1",
                defaultContent: "Bottom assembly is 1/2 of the Multipoint Lock system",
                bulletNumber: 1
              },
              {
                id: "lock-components-bullet-2",
                defaultContent: "Top extension is added to lower assembly to complete assembly",
                bulletNumber: 2
              },
              {
                id: "lock-components-bullet-3",
                defaultContent: "Extension length is determined by door height",
                bulletNumber: 3
              },
              {
                id: "lock-components-bullet-4",
                defaultContent: "Standard Handle Height (HH) is 36 inches",
                bulletNumber: 4
              }
            ].map((bullet) => (
              <EditableText 
                key={bullet.bulletNumber}
                id={bullet.id}
                defaultContent={bullet.defaultContent}
                variant="body2"
                getContent={() => getContentFromDatabase({
                  id: bullet.id,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                onSave={(newContent) => saveContentToDatabase({
                  id: bullet.id,
                  content: newContent,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                sx={{ fontSize: '1.1rem' }}
              />
            )),
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
          title: <EditableText
            id="specifications-title"
            defaultContent="HOPPE HLS7 Specifications"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "specifications-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "specifications-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="specifications-maintext"
              defaultContent="The HOPPE HLS7 Multi-Point Lock System offers versatile security configurations designed for optimal door protection and functionality."
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "specifications-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "specifications-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            sections: [
              {
                title: <EditableText 
                  id="specs-section1-title" 
                  defaultContent="3-Point Lock System - Choose From:"
                  variant="h6"
                  getContent={() => getContentFromDatabase({
                    id: "specs-section1-title",
                    section: "subtitle-1"
                  })}
                  onSave={(newContent) => saveContentToDatabase({
                    id: "specs-section1-title",
                    content: newContent,
                    section: "subtitle-1"
                  })}
                  sx={{ fontSize: '1.1rem' }}
                />,
                points: [
                  {
                    id: "specs-section1-point1",
                    defaultContent: "Hook Configuration",
                    pointNumber: 1
                  },
                  {
                    id: "specs-section1-point2",
                    defaultContent: "Shootbolt Configuration",
                    pointNumber: 2
                  },
                  {
                    id: "specs-section1-point3",
                    defaultContent: "Tongue Configuration",
                    pointNumber: 3
                  }
                ].map((point) => (
                  <EditableText 
                    key={point.pointNumber}
                    id={point.id}
                    defaultContent={point.defaultContent}
                    variant="body2"
                    getContent={() => getContentFromDatabase({
                      id: point.id,
                      section: `section1-point-${point.pointNumber}`
                    })}
                    onSave={(newContent) => saveContentToDatabase({
                      id: point.id,
                      content: newContent,
                      section: `section1-point-${point.pointNumber}`
                    })}
                    sx={{ fontSize: '1.1rem' }}
                  />
                ))
              },
              {
                title: <EditableText 
                  id="specs-section2-title" 
                  defaultContent="5-Point Lock System - Available in:"
                  variant="h6"
                  getContent={() => getContentFromDatabase({
                    id: "specs-section2-title",
                    section: "subtitle-2"
                  })}
                  onSave={(newContent) => saveContentToDatabase({
                    id: "specs-section2-title",
                    content: newContent,
                    section: "subtitle-2"
                  })}
                  sx={{ fontSize: '1.1rem' }}
                />,
                points: [
                  {
                    id: "specs-section2-point1",
                    defaultContent: "Tongues with Shootbolts",
                    pointNumber: 1
                  },
                  {
                    id: "specs-section2-point2",
                    defaultContent: "Hook with Shootbolts",
                    pointNumber: 2
                  }
                ].map((point) => (
                  <EditableText 
                    key={point.pointNumber}
                    id={point.id}
                    defaultContent={point.defaultContent}
                    variant="body2"
                    getContent={() => getContentFromDatabase({
                      id: point.id,
                      section: `section2-point-${point.pointNumber}`
                    })}
                    onSave={(newContent) => saveContentToDatabase({
                      id: point.id,
                      content: newContent,
                      section: `section2-point-${point.pointNumber}`
                    })}
                    sx={{ fontSize: '1.1rem' }}
                  />
                ))
              },
              {
                title: <EditableText 
                  id="specs-section3-title" 
                  defaultContent="Standard Specifications:"
                  variant="h6"
                  getContent={() => getContentFromDatabase({
                    id: "specs-section3-title",
                    section: "subtitle-3"
                  })}
                  onSave={(newContent) => saveContentToDatabase({
                    id: "specs-section3-title",
                    content: newContent,
                    section: "subtitle-3"
                  })}
                  sx={{ fontSize: '1.1rem' }}
                />,
                points: [
                  {
                    id: "specs-section3-details",
                    defaultContent: `The HLS7 is only available with the following specifications:
        • 5/8" (16mm) faceplate
        • 1-3/4" (45mm) backset
        • 3-5/8" (92mm) handle to cylinder spacing (PZ)
        • Egress, Panic Function (the action of going out or leaving)`,
                    pointNumber: 1
                  }
                ].map((point) => (
                  <EditableText 
                    key={point.pointNumber}
                    id={point.id}
                    defaultContent={point.defaultContent}
                    variant="body2"
                    getContent={() => getContentFromDatabase({
                      id: point.id,
                      section: `section3-details`
                    })}
                    onSave={(newContent) => saveContentToDatabase({
                      id: point.id,
                      content: newContent,
                      section: `section3-details`
                    })}
                    sx={{ 
                      fontSize: '1.1rem',
                      whiteSpace: 'pre-line'
                    }}
                  />
                ))
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
            notes: <EditableText
              id="handle-components-notes"
              defaultContent="Important: Always verify the door thickness and configuration before ordering parts."
              variant="body2"
              getContent={() => getContentFromDatabase({
                id: "handle-components-notes",
                section: "notes"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "handle-components-notes",
                content: newContent,
                section: "notes"
              })}
              sx={{ 
                p: 1.5,
                width: '100%',
                mt: 2,
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.1rem'
              }}
            />
          }
        },
        {
          id: 'door-handing',
          title: <EditableText
            id="door-handing-title"
            defaultContent="Door Handing Guide"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "door-handing-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "door-handing-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="door-handing-maintext"
              defaultContent="Door handing is always determined from the outside or exterior of the door."
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "door-handing-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "door-handing-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            sections: [
              {
                title: <EditableText 
                  id="door-handing-basics-title" 
                  defaultContent="Door Handing Basics"
                  variant="h6"
                  getContent={() => getContentFromDatabase({
                    id: "door-handing-basics-title",
                    section: "subtitle"
                  })}
                  onSave={(newContent) => saveContentToDatabase({
                    id: "door-handing-basics-title",
                    content: newContent,
                    section: "subtitle"
                  })}
                  sx={{ 
                    mb: 1,
                    fontSize: '1.1rem'
                  }}
                />,
                points: [
                  {
                    id: "door-handing-point1",
                    defaultContent: "When hinges are on the left, the door is a Left Hand (LH)",
                    pointNumber: 1
                  },
                  {
                    id: "door-handing-point2",
                    defaultContent: "When hinges are on the Right, the door is a Right Hand (RH)",
                    pointNumber: 2
                  },
                  {
                    id: "door-handing-point3",
                    defaultContent: "Inswing or outswing does not determine handing for panic function (Egress)",
                    pointNumber: 3
                  },
                  {
                    id: "door-handing-point4",
                    defaultContent: "Spring latch can be pulled out to reverse handing",
                    pointNumber: 4
                  },
                  {
                    id: "door-handing-point5",
                    defaultContent: "T15 Torx Screws in 'A' position is RIGHT HAND (RH)",
                    pointNumber: 5
                  },
                  {
                    id: "door-handing-point6",
                    defaultContent: "T15 Torx Screws in 'B' position is LEFT HAND (LH)",
                    pointNumber: 6
                  }
                ].map((point) => (
                  <EditableText 
                    key={point.pointNumber}
                    id={point.id}
                    defaultContent={point.defaultContent}
                    variant="body2"
                    getContent={() => getContentFromDatabase({
                      id: point.id,
                      section: `point-${point.pointNumber}`
                    })}
                    onSave={(newContent) => saveContentToDatabase({
                      id: point.id,
                      content: newContent,
                      section: `point-${point.pointNumber}`
                    })}
                    sx={{ fontSize: '1.1rem' }}
                  />
                ))
              }
            ],
            images: [
              {
                src: '/AllAboutLearning/images/door-handing.png',
                alt: 'Door Handing Diagram',
                caption: 'Door Handing Guide - Left Hand (LH) vs Right Hand (RH)'
              },
              {
                src: '/AllAboutLearning/images/door-handing-2.png',
                alt: 'Door Handing Diagram',
                caption: 'Door Handing Guide - Left Hand (LH) vs Right Hand (RH)'
              }
            ],
            notes: <EditableText
              id="door-handing-notes"  // Fixed the ID to match the section
              defaultContent="Note: If panic function is on wrong side of lock, it can be changed by adjusting the Torx screw positions."
              variant="body2"
              getContent={() => getContentFromDatabase({
                id: "door-handing-notes",
                section: "notes"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "door-handing-notes",
                content: newContent,
                section: "notes"
              })}
              sx={{ fontSize: '1.1rem' }}
            />
          }
        },
        
        {
          id: 'panic-function',
          title: <EditableText
            id="panic-function-title"
            defaultContent="Panic Function"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "panic-function-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "panic-function-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <WarningIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="panic-function-maintext"
              defaultContent="This lock has a panic release function for Egress. The interior side of the door is always Unlocked. The inside has the Panic Function that allows exiting by pushing down on lever."
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "panic-function-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "panic-function-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            bulletPoints: [
              {
                id: "panic-bullet1",
                defaultContent: "Check panic function before installing lock",
                bulletNumber: 1
              },
              {
                id: "panic-bullet2",
                defaultContent: "Spring latch can be pulled out with pliers to reverse latch for inswing or outswing doors",
                bulletNumber: 2
              },
              {
                id: "panic-bullet3",
                defaultContent: "If panic function is on wrong side of lock, it can be changed:",
                bulletNumber: 3
              },
              {
                id: "panic-bullet4",
                defaultContent: "- Remove A screw, Flip lock over and install in Y side",
                bulletNumber: 4
              },
              {
                id: "panic-bullet5",
                defaultContent: "- Remove Z screw, Flip lock over and install in B Side",
                bulletNumber: 5
              }
            ].map((bullet) => (
              <EditableText 
                key={bullet.bulletNumber}
                id={bullet.id}
                defaultContent={bullet.defaultContent}
                variant="body2"
                getContent={() => getContentFromDatabase({
                  id: bullet.id,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                onSave={(newContent) => saveContentToDatabase({
                  id: bullet.id,
                  content: newContent,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                sx={{ fontSize: '1.1rem' }}
              />
            )),
            images: [
              {
                src: '/AllAboutLearning/images/panic-function.png',
                alt: 'Panic function mechanism and installation diagram'
              }
            ]
          }
        },
        {
          id: 'proper-alignment',
          title: <EditableText
            id="proper-alignment-title"
            defaultContent="Proper Alignment Guide"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "proper-alignment-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "proper-alignment-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <BuildIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="alignment-maintext"
              defaultContent="Proper alignment is crucial for the lock to function correctly. Pay special attention to the 'half-moon' slot positioning:"
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "alignment-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "alignment-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            bulletPoints: [
              {
                id: "half-moon-title",
                defaultContent: "Half-Moon Slot Positioning:",
                bulletNumber: 1,
                variant: "body1"  
              },
              {
                id: "half-moon-point1",
                defaultContent: 'The "half-moon" slot nub next to the handle hub must be positioned at:',
                bulletNumber: 2
              },
              {
                id: "half-moon-point2",
                defaultContent: "3 o'clock position OR",
                bulletNumber: 3
              },
              {
                id: "half-moon-point3",
                defaultContent: "9 o'clock position",
                bulletNumber: 4
              },
              {
                id: "half-moon-point4",
                defaultContent: "Position depends on which side of the gear box you're on",
                bulletNumber: 5
              }
            ].map((bullet) => (
              <EditableText 
                key={bullet.bulletNumber}
                id={bullet.id}
                defaultContent={bullet.defaultContent}
                variant={bullet.variant || "body2"}  // Use body1 for title, body2 for regular points
                getContent={() => getContentFromDatabase({
                  id: bullet.id,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                onSave={(newContent) => saveContentToDatabase({
                  id: bullet.id,
                  content: newContent,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                sx={{ fontSize: '1.1rem' }}
              />
            )),
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
          title: <EditableText
            id="operation-guide-title"
            defaultContent="Operation of HLS7 Multipoint Lock"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "operation-guide-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "operation-guide-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <SettingsIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="operation-maintext"
              defaultContent="Proper operation of the HLS7 Multipoint Lock with installed handle set:"
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "operation-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "operation-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            bulletPoints: [
              {
                id: "operation-section1-title",
                defaultContent: "Locking from Inside:",
                bulletNumber: 1,
                variant: "body1"
              },
              {
                id: "operation-inside-point1",
                defaultContent: "Turn thumb turn to horizontal position",
                bulletNumber: 2
              },
              {
                id: "operation-inside-point2",
                defaultContent: "Lift handle to engage additional locking devices",
                bulletNumber: 3
              },
              {
                id: "operation-section2-title",
                defaultContent: "Unlocking from Inside:",
                bulletNumber: 4,
                variant: "body1"
              },
              {
                id: "operation-inside-unlock1",
                defaultContent: "Depress Lever, latch and all locking points will retract",
                bulletNumber: 5
              },
              {
                id: "operation-inside-unlock3",
                defaultContent: "Optional: turn thumb latch, depress lever",
                bulletNumber: 6
              },
              // Adding new sections
              {
                id: "operation-section3-title",
                defaultContent: "To Lock door from Outside:",
                bulletNumber: 7,
                variant: "body1"
              },
              {
                id: "operation-outside-lock1",
                defaultContent: "Insert key and turn towards door jamb",
                bulletNumber: 8
              },
              {
                id: "operation-outside-lock2",
                defaultContent: "Lift handle to engage additional locking devices",
                bulletNumber: 9
              },
              {
                id: "operation-section4-title",
                defaultContent: "To Unlock door from Outside:",
                bulletNumber: 10,
                variant: "body1"
              },
              {
                id: "operation-outside-unlock1",
                defaultContent: "Insert key and turn toward hinges",
                bulletNumber: 11
              },
              {
                id: "operation-outside-unlock2",
                defaultContent: "Depress lever to open door",
                bulletNumber: 12
              }
            ].map((bullet) => (
              <EditableText 
                key={bullet.bulletNumber}
                id={bullet.id}
                defaultContent={bullet.defaultContent}
                variant={bullet.variant || "body2"}
                getContent={() => getContentFromDatabase({
                  id: bullet.id,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                onSave={(newContent) => saveContentToDatabase({
                  id: bullet.id,
                  content: newContent,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                sx={{ fontSize: '1.1rem' }}
              />
            )),
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
            ],
            notes: <EditableText
              id="operation-notes"  // Fixed the ID to match the section
              defaultContent="Note: Thumbturn rotates back to vertical position automatically when handleset and spring cassette are installed"
              variant="body2"
              getContent={() => getContentFromDatabase({
                id: "operation-notes",
                section: "notes"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "operation-notes",
                content: newContent,
                section: "notes"
              })}
              sx={{ fontSize: '1.2rem' }}
            />
          }
        },
        {
          id: 'handle-components',
          title: <EditableText
            id="handle-components-title"
            defaultContent="HOPPE HLS7 Handle Set Components"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "handle-components-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "handle-components-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <BuildIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
            mainText: <EditableText
              id="handle-components-maintext"
              defaultContent="The HOPPE HLS7 handle set consists of various components and parts packs designed for different door configurations:"
              variant="body1"
              getContent={() => getContentFromDatabase({
                id: "handle-components-maintext",
                section: "mainText"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "handle-components-maintext",
                content: newContent,
                section: "mainText"
              })}
              sx={{ fontSize: '1.1rem' }}
            />,
            bulletPoints: [
              {
                id: "handle-std-title",
                defaultContent: "Standard Door Parts Packs (Centered Lock):",
                bulletNumber: 1,
                variant: "body1"
              },
              {
                id: "handle-std-pack1",
                defaultContent: "2753954 - HLS7 Parts Pack - 1-3/4' Active Door",
                bulletNumber: 2
              },
              {
                id: "handle-std-pack2",
                defaultContent: "2776136 - HLS7 Parts Pack - 2-1/4' Active Door",
                bulletNumber: 3
              },
              {
                id: "handle-std-pack3",
                defaultContent: "2753920 - HLS7 Parts Pack - 1-3/4' Inactive Door",
                bulletNumber: 4
              },
              {
                id: "handle-std-pack4",
                defaultContent: "2753938 - HLS7 Parts Pack - 2-1/4' Inactive Door",
                bulletNumber: 5
              },
              {
                id: "handle-euro-title",
                defaultContent: "Euro Groove Parts Packs (Off-Center):",
                bulletNumber: 6,
                variant: "body1"
              },
              {
                id: "handle-euro-pack1",
                defaultContent: "3084211 - HLS7 Parts Pack - 2-1/4' Active Door Off Center",
                bulletNumber: 7
              },
              {
                id: "handle-euro-pack2",
                defaultContent: "3084220 - HLS7 Parts Pack - 2-1/4' Inactive Door Off Center",
                bulletNumber: 8
              }
            ].map((bullet) => (
              <EditableText 
                key={bullet.bulletNumber}
                id={bullet.id}
                defaultContent={bullet.defaultContent}
                variant={bullet.variant || "body2"}
                getContent={() => getContentFromDatabase({
                  id: bullet.id,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                onSave={(newContent) => saveContentToDatabase({
                  id: bullet.id,
                  content: newContent,
                  section: `bullet-${bullet.bulletNumber}`
                })}
                sx={{ fontSize: '1.1rem' }}
              />
            )),
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
            ],
            notes: <EditableText
              id="handle-components-notes"
              defaultContent="Always verify the door thickness and configuration before ordering parts."
              variant="body2"
              getContent={() => getContentFromDatabase({
                id: "handle-components-notes",
                section: "notes"
              })}
              onSave={(newContent) => saveContentToDatabase({
                id: "handle-components-notes",
                content: newContent,
                section: "notes"
              })}
              sx={{ fontSize: '1.1rem' }}
            />
          }
        },
        {
          id: 'additional-images',
          title: <EditableText
            id="additional-images-title"
            defaultContent="Additional Images"
            variant="h5"
            getContent={() => getContentFromDatabase({
              id: "additional-images-title",
              section: "title"
            })}
            onSave={(newContent) => saveContentToDatabase({
              id: "additional-images-title",
              content: newContent,
              section: "title"
            })}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1,
              maxWidth: 'max-content',
              mt: 1,
              mb: 1,
              pr: 1
            }}
          />,
          icon: <ImageIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />,
          content: {
             
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

  const content = guideContent['Hoppe HLS7 MPL'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        <Box sx={{ mb: 4 }}>
          <Button 
            onClick={() => navigate('/archives/multipoint-locks')}
            sx={{ 
              color: theme.palette.primary.main,
              mb: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.dark
              }
            }}
          >
            ← Back to Multi-Point Locks
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
                  sx={section.title.props.sx}  
                >
                  {section.title.props.defaultContent}
                </Typography>
              )}
            </Box>
  
            {section.content.imageGallery ? (
              <Box>
                <Grid container spacing={3}>
                  {section.content.imageGallery.map((image, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Box 
                        sx={{ 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          border: 1,
                          borderColor: theme.palette.primary.main,
                          borderRadius: 1,
                          p: 1,
                          height: '300px',
                          bgcolor: 'white',
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.5)',
                            cursor: 'pointer',
                            boxShadow: 3,
                            zIndex: 1,
                            bgcolor: 'white'
                          }
                        }}
                      >
                        
                        <Box
                          sx={{
                            flex: 1,
                            width: '100%',
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                          }}
                        >
                          <Box
                            component="img"
                            src={image.src}
                            alt={image.alt}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              padding: '1px'
                            }}
                          />
                        </Box>
                        
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 1,
                      p: 2,
                      height: '100%',
                      maxHeight: '750px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}
                  >
                    {section.content.mainText && (
                      <EditableText
                        {...section.content.mainText.props}
                        onSave={(newContent) => saveContentToDatabase({
                          id: section.content.mainText.props.id,
                          content: newContent,
                          section: `section-${index}-mainText`
                        })}
                      />
                    )}
  
                    {section.content.sections && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        {section.content.sections.map((subsection, idx) => (
                          <Box key={idx} sx={{ mb: 2 }}>
                            <Box 
                              sx={{ 
                                display: 'flex',
                              }}
                            >
                              <EditableText
                                {...subsection.title.props}
                                onSave={(newContent) => saveContentToDatabase({
                                  id: subsection.title.props.id,
                                  content: newContent,
                                  section: `section-${index}-subsection-${idx}-title`
                                })}
                              />
                            </Box>
                            {subsection.title.props?.defaultContent?.includes("Door Handing Basics") || 
                             subsection.title.props?.defaultContent?.includes("Standard Specifications:") ||
                             subsection.title.props?.defaultContent?.includes("3-Point Lock System - Choose From:") ||
                             subsection.title.props?.defaultContent?.includes("5-Point Lock System - Available in:") ? (
                              <Box 
                                sx={{ 
                                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                                  width: '90%',
                                  mt: 0.25,
                                  mb: 1
                                }} 
                              />
                            ) : null}
                            {subsection.points.map((point, pointIdx) => (
                              <Box 
                                key={pointIdx}
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'flex-start',
                                  mb: 1.1,
                                }}
                              >
                                <EditableText
                                  {...point.props}
                                  onSave={(newContent) => saveContentToDatabase({
                                    id: point.props.id,
                                    content: newContent,
                                    section: `section-${index}-subsection-${idx}-point-${pointIdx}`
                                  })}
                                />
                              </Box>
                            ))}
                          </Box>
                        ))}
                      </Box>
                    )}
  
                    {section.content.bulletPoints && (
                      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {section.content.bulletPoints.map((point, idx) => (
                          <Box key={idx}>
                            <Box 
                              sx={{ 
                                display: 'flex',
                              }}
                            >
                              <EditableText
                                {...point.props}
                                onSave={(newContent) => saveContentToDatabase({
                                  id: point.props.id,
                                  content: newContent,
                                  section: `bullet-${idx + 1}`
                                })}
                              />
                            </Box>
                            {(point.props?.defaultContent?.includes("from Inside:") || 
                              point.props?.defaultContent?.includes("Standard Door Parts Packs (Centered Lock):") ||
                              point.props?.defaultContent?.includes("Euro Groove Parts Packs (Off-Center):") ||
                              point.props?.defaultContent?.includes("Locking from Inside:") ||
                              point.props?.defaultContent?.includes("Half-Moon Slot Positioning:") ||
                              point.props?.defaultContent?.includes("To Lock door from Outside:") ||
                              point.props?.defaultContent?.includes("To Unlock door from Outside:") ||
                              point.props?.defaultContent?.includes("If")) && (
                              <Box 
                                sx={{ 
                                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                                  width: '90%',
                                  mt: 0.5,
                                  mb: 1
                                }} 
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Grid>
  
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      height: '100%',
                      maxHeight: '750px',
                    }}
                  >
                    {section.content.images && section.content.images.map((image, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          height: '100%',
                          minHeight: '350px',
                          maxHeight: '610px',
                          backgroundColor: 'white',
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: 1,
                          p: 2,
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          overflow: 'hidden',
                          position: 'relative',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            zIndex: 999,
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Card 
                          sx={{ 
                            width: '100%',
                            height: '100%',
                            maxHeight: '610px',
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            position: 'relative',
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
                            }}
                          />
                        </Card>
                        {image.caption && (
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              mt: 1,
                              textAlign: 'center',
                              color: theme.palette.text.secondary
                            }}
                          >
                            {image.caption}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
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

export default LockGuide;