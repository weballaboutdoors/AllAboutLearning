import React, { useState } from 'react';
import { 
  Container, Box, Typography, Paper, Grid, CardMedia, Fab, Fade 
} from '@mui/material';
import { 
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import BreadcrumbTrail from '../common/BreadcrumbTrail';
import SearchBar from '../common/SearchBar';

const PLACEHOLDER_IMG = {
  src: '/AllAboutLearning/images/placeholder.jpg',
  alt: 'Placeholder Image'
};

function FourBarHingesPage() {
  const theme = useTheme();
  const [showScroll, setShowScroll] = useState(false);
  const [zoomedImg, setZoomedImg] = useState(null);
  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) setShowScroll(true);
      else if (showScroll && window.pageYOffset <= 400) setShowScroll(false);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Helper to ensure every subsection has at least one image
  function ensureImages(sub) {
    if (sub.images && sub.images.length > 0) return sub;
    if (sub.image) return { ...sub, images: [sub.image] };
    return { ...sub, images: [PLACEHOLDER_IMG] };
  }

  const guideContent = {
    title: "4-Bar Hinges Guide",
    subtitle: "All About 4-Bar Hinges | Ben Kissinger | 4/30/2025",
    sections: [
      {
        id: "overview",
        icon: <InfoIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Overview & Materials",
        content: {
          sections: [
            {
              title: "General Information",
              points: [
                "Made by Several Companies",
                "Amesbury Truth 4-Bar hinges consist of four interconnected bars and a track with a black acetal or brass track shoe with a screw to allow friction adjustment.",
                "Used as pairs on Awning, Casement and Pushout Projected windows.",
                "The hinge allows the window to open smoothly while providing stability and support.",
                "Recommend changing both when replacing.",
                "Material: Can be Aluminum, Carbon Steel, or Stainless Steel, with Brass or Black Acetal Shoes.",
                "Steel YDI Hinges are being phased out, limited to existing inventory."
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-hinges.png",
                  alt: "4-Bar Hinge"
                }
              ]
            }
          ]
        }
      },
      {
        id: "design",
        icon: <BuildIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Design & Application Notes",
        content: {
          sections: [
            {
              title: "Design & Application",
              points: [
                "4-Bar Hinges are designed for vents with a lip on the outside edge. They project the vent out as it pivots to avoid interference between a lipped vent and frame.",
                "Call Size is not necessarily the actual size of hinge. A 12\" hinge can be 12.22 inches or 12.50 inches in length depending on model.",
                "Standard Duty 11/16\" wide 4-Bar Hinges: Used for residential projects (up to 40 lbs), usually with a stop built into the track for awning/projected windows. Without stop, opens to ~65° in casement applications.",
                "Heavy Duty 7/8\" wide 4-Bar Hinges: Used for commercial projects (up to 200 lbs).",
                "Superior Hinge 7/8\" x 28\": Accommodates sash weight up to 300 lbs.",
                "Friction adjustment is achieved by adjusting the screw in the sliding shoe.",
                "Stack Height: 1/2 inch and 5/8 inch (.625) for most windows. Actual pocket height can vary. Shims may be needed.",
                "Shims: Used to increase stack height. Aluminum shims available in various thicknesses. Some sizes provided by Truth, others by window manufacturer.",
                "Stops: Prevent sash from opening too far, ensuring egress and preventing damage. Generally for awning/projection windows.",
                "No Stop: Allows wider opening (up to 65°) for ventilation, especially in casement/awning windows.",
                "Egress: Minimum opening area 5.7 sq ft. Minimum height 24\", width 20\". Sill height max 44\" above floor. Window well required if sill below grade."
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-hinges-design.png",
                  alt: "4-Bar Hinge Design"
                },
                {
                  src: "/AllAboutLearning/images/4bar-hinge-stack-height.png",
                  alt: "4-Bar Hinge Stack Height and Shims",
                  caption: "Stack Height and Shim Installation"
                },
                {
                  src: "/AllAboutLearning/images/4bar-hinge-stops.png",
                  alt: "4-Bar Hinge Stop Types",
                  caption: "Stop vs No-Stop Hinge Configurations"
                }
              ]
            }
          ]
        }
      },
      {
        id: "series",
        icon: <CategoryIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Truth Anderberg Series",
        content: {
          sections: [
            {
              title: "Series Overview",
              points: [
                "201 Series Standard Duty, generally Residential Hinges",
                "301 Series Heavy Duty, generally Commercial Hinges",
                "222 Series Standard Duty Egress & 224 Egress & Washability",
                "333 Series Heavy Duty Egress & 334 Egress & Washability",
                "401 Series Standard Duty Casement Only, 601 Heavy Duty",
                "301 Superior with maximum vent weight of 300 pounds"
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-series.png",
                  alt: "Truth Anderberg Series"
                }
              ]
            }
          ]
        }
      },
      {
        id: "201series",
        icon: <CategoryIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "201 Series Standard Duty Residential Hinge",
        content: {
          sections: [
            {
              title: "Lengths & Chart Notes",
              points: [
                "Lengths: 8\" = 34.10.00, 10\" = 34.11.00, 12\" = 34.12.00, 14\" = 34.13.00, 16\" = 34.14.00, 18\" = 34.15.00, 20\" = 34.16.00",
                "Typo on chart: .100 & .102 = Std. Stop   &   .101 No Stop"
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/201series-part-number-guide.png",
                  alt: "201 Series Part Number Guide"
                },
                {
                  src: "/AllAboutLearning/images/201series-application-table.png",
                  alt: "201 Series Application Table"
                },
                {
                  src: "/AllAboutLearning/images/4bar-hinge-awning-projected-windows.png",
                  alt: "4-Bar Hinge Awning & Projected"
                },
                {
                  src: "/AllAboutLearning/images/201series-hinge-layout.png",
                  alt: "201 Series Hinge Layout"
                },
                {
                  src: "/AllAboutLearning/images/4bar-hinge-with-stop-diagram.png",
                  alt: "4-Bar Hinge With Stop Diagram"
                }
              ]
            }
          ]
        }
      },
      {
        id: "numbering",
        icon: <CategoryIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Product Numbering System",
        content: {
          sections: [
            {
              title: "Numbering System",
              points: [
                "The Truth product numbering system for hinges denotes the product with the first two numerals, model by the second two numerals, and the finish by the next two numerals (decorative finishes only -- this does not apply to hinges).",
                "For 4-Bar Hinges, the last three numerals represent the various hinge features with no commonalty between product models intended."
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-numbering.png",
                  alt: "Product Numbering System"
                }
              ]
            }
          ]
        }
      },
      {
        id: "awning4bar",
        icon: <BuildIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Awning 4-Bar Hinge",
        content: {
          sections: [
            {
              title: "Awning 4-Bar Hinge",
              points: [
                "A wide range of lengths and thicknesses",
                "4-bar hinges are certified to AAMA 904.1",
                "4-bar hinges have been designed to be used primarily on vents with a lip on the outside edge",
                "4-bar hinges are adaptable to both casement and projected window applications",
                "Standard 4-bar hinges are for lighter windows no heavier than 40 lbs.",
                "Heavy duty 4-bar hinges are for commercial windows up to 200 lbs.",
                "201/301 Series hinges are manufactured with a black acetal or brass shoe",
                "Available in both steel or stainless steel"
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-awning-hinge.png",
                  alt: "Awning 4-Bar Hinge"
                }
              ]
            }
          ]
        }
      },
      {
        id: "casement4bar",
        icon: <BuildIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Casement 4-Bar Hinge",
        content: {
          sections: [
            {
              title: "Casement 4-Bar Hinge",
              points: [
                "Designed for casement windows",
                "Standard duty recommended for a maximum vent weight of 82 lbs. heavy duty: 158 lbs.",
                "4 bar hinges are certified to AAMA 904.1",
                "4 bar hinges are adaptable to both casement and projected window applications",
                "Non-handed and made of durable stainless steel",
                "222/333 Series Hinges can produce a 90 degree window opening allowing an average-sized person to escape in the event of an emergency",
                "4 bar egress hinges allow outside vents to be washed from the inside",
                "4 bar hinges have been designed to be used primarily on vents with a lip on the outside edge",
                "By design, our 4 bar hinges are engineered to project the vent out as it pivots to avoid interference between a lipped vent and frame"
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-casement-hinge.png",
                  alt: "Casement 4-Bar Hinge"
                }
              ]
            }
          ]
        }
      },
      {
        id: "images",
        icon: <CategoryIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mr: 2 }} />,
        title: "Hinge Material Types",
        content: {
          sections: [
            {
              title: "Material Types",
              points: [
                "Yellow Dichromate Steel, Stainless Steel, Aluminum"
              ],
              images: [
                {
                  src: "/AllAboutLearning/images/4bar-yellow-dichromate.jpg",
                  alt: "Yellow Dichromate Steel"
                },
                {
                  src: "/AllAboutLearning/images/4bar-stainless-steel.jpg",
                  alt: "Stainless Steel"
                },
                {
                  src: "/AllAboutLearning/images/4bar-aluminum.jpg",
                  alt: "Aluminum"
                }
              ]
            }
          ]
        }
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
        <BreadcrumbTrail />
        <Box sx={{ mb: 4 }}>
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
                  {guideContent.title}
                </Typography>
                <SearchBar 
                  onSearch={() => {}}
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
        </Box>
      </StaggeredFadeIn>

      <StaggeredFadeIn delay={0.2}>
        {guideContent.sections.map((section, idx) => (
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {section.icon}
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {section.title}
              </Typography>
            </Box>
            {section.content.sections.map((sub, subIdx) => (
              <Box key={subIdx} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                  {sub.title}
                </Typography>
                <Grid container spacing={3}>
                  {/* Text Container */}
                  <Grid item xs={12} md={6}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 2, 
                        backgroundColor: 'white', 
                        border: `1px solid ${theme.palette.primary.main}`, 
                        maxHeight: 350, 
                        overflow: 'auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      {sub.points && sub.points.map((point, i) => (
                        <Typography key={i} variant="body1" sx={{ mb: 1.2, fontSize: '1.1rem', lineHeight: 1.7 }}>
                          • {point}
                        </Typography>
                      ))}
                    </Paper>
                  </Grid>
                  {/* Image Containers */}
                  {ensureImages(sub).images.map((img, i) => (
                    <Grid item xs={12} md={6} key={i} sx={{ display: 'flex' }}>
                      <Paper 
                        elevation={1} 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'white', 
                          border: `1px solid ${theme.palette.primary.main}`,
                          height: '100%',
                          maxHeight: '350px',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Box sx={{ 
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: 300
                        }}>
                          <CardMedia
                            component="img"
                            image={img.src}
                            alt={img.alt}
                            sx={{ 
                              objectFit: 'contain',
                              width: '100%',
                              height: '100%',
                              maxHeight: '300px',
                              backgroundColor: 'white'
                            }}
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              display: 'block', 
                              textAlign: 'center', 
                              mt: 1,
                              color: theme.palette.text.secondary
                            }}
                          >
                            {img.caption || img.alt}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Paper>
        ))}
      </StaggeredFadeIn>

      <Fade in={showScroll}>
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

export default FourBarHingesPage;