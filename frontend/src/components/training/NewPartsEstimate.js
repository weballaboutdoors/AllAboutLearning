import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Box, Paper, Grid, Card, Fab, Zoom, Button,
    Divider, Collapse
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ExpandLess, ExpandMore, CheckCircle } from '@mui/icons-material';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import { useNavigate } from 'react-router-dom';
import NavigationIcon from '@mui/icons-material/Navigation';
import FolderIcon from '@mui/icons-material/Folder';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function NewPartsEstimate() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

    const sections = [
      { id: 'overview', title: 'Overview & Basics' },
      { id: 'navigation', title: 'Navigation' },
      { id: 'creation', title: 'Creating Estimates' },
      { id: 'addItem', title: 'Adding Items' },
      { id: 'files', title: 'Files & Tasks' },
      { id: 'communication', title: 'Customer Communication' }
    ];
  
  const sectionContent = {
      overview: {
          title: 'Overview & Basics',
          content: `Estimates in NetSuite
          
  Creating estimates in NetSuite is crucial for effective business operations:
  
  • Accurate estimates help in budgeting and forecasting
  • They enhance customer relationships by providing clear expectations
  • Estimates are the foundation of successful sales processes
  • Essential for streamlined business operations`,
          imagePath: '/AllAboutLearning/images/netsuite-overview-3.png',
          imageAlt: 'NetSuite Overview'
      },
      navigation: {
        title: 'Navigation',
        content: `Navigating to New Parts Estimate:

  Essential Navigation Steps:
  • Log into NetSuite with your credentials
  • Click on "Opportunities" in the main menu
  • Select "Transactions" from the dropdown
  • Click on "Estimates"
  • Choose "New" to create a new estimate
  • Important: Change the Form to "AADW New Part Estimate"

  Key Points:
  • Ensure you're in the correct subsidiary
  • Verify you have proper permissions
  • Check that you're using the correct form
  • Save frequently to prevent data loss`,
          imagePath: '/AllAboutLearning/images/navigating-estimates.png',
          imagePath2: '/AllAboutLearning/images/navigating-estimates-2.png',
          imageAlt: 'NetSuite Navigation Path',
          imageAlt2: 'Form Selection Interface'
      },
      creation: {
          title: 'Creating Estimates',
          content: `Essential Steps for the New Parts Estimate:
  
  Required Fields:
  • Customer
  • Sales Source
  • Vendor Name
  • Vendor Item Number
  • Vendor Cost
  • Vendor Description - Notes
  
  Additional Important Fields:
  • Vendor Surcharge
  • Vendor Min. Order Quantity
  • Approx Lead Time
  • Sales Rep
  • Title`,
          imagePath: '/AllAboutLearning/images/creating-estimate-1.png',
          imagePath2: '/AllAboutLearning/images/creating-estimates-3.png',
          imageAlt: 'Estimate Creation Process',
          imageAlt2: 'Required Fields'
      },
      addItem: {
        title: 'Adding Items',
        content: `Adding Items to Estimates:

  Essential Steps:
  • Click "Add Item" button
  • Search for and select "0000NonNetsuiteItem"
  • Set the desired quantity
  • Enter detailed item description
  • Initial rate should be $0.00
  • Set Shipping rate to UPS Ground at $40.00

  Important Details:
  • Verify vendor information is complete
  • Double-check quantity matches customer request
  • Ensure description is clear and accurate
  • Add any special handling instructions
  • Include relevant part numbers
  • Set appropriate shipping method`,
          imagePath: '/AllAboutLearning/images/add-to-estimate.png',
          imageAlt: 'Add to Estimate',
          imageAlt2: 'Item Details Form'
      },
      files: {
          title: 'Files & Tasks',
          content: `File Management:
  
  Adding Files to Estimates:
  • Navigate to Communication tab > Files > New File
  • Use unique file names
  • Store relevant pictures, PDFs, and documents
  • Avoid large file sizes
  • Ensure comprehensive documentation
  
  Task Creation Process:
  • Go to Communication > Activities > New Task
  • Set appropriate Title (e.g., "Estimate 25539")
  • Assign to next responsible person
  • Include clear instructions in Message
  • Set Priority and Due Date
  • Update Status appropriately
  • Check "Notify Assignee By Email"`,
          imagePath: '/AllAboutLearning/images/add-files.png',
          imagePath2: '/AllAboutLearning/images/add-files-2.png',
          imagePath3: '/AllAboutLearning/images/create-tasks-1.png',
          imagePath4: '/AllAboutLearning/images/create-tasks-2.png',
          imageAlt: 'Add Files',
          imageAlt2: 'Task Creation Interface',
          imageAlt3: 'Task Creation Interface 2',
          imageAlt4: 'Task Creation Interface 3'
      },
      communication: {
          title: 'Customer Communication',
          content: `Messaging Options:
  
  Direct Message Box:
  • Standard message typing and sending
  • Commonly used by Customer Service
  • Includes estimate attachment
  
  Email Templates:
  • "New Part Estimate Transaction Email Temp"
  • Automated information filling
  • Read receipt tracking
  • Professional consistency
  • Multiple recipient options (CC/BCC)
  
  Important Notes:
  • Check "available in customer center" for portal access
  • Verify all information before sending
  • Use appropriate template type (HTML/PDF)
  • Always review before final send`,
          imagePath: '/AllAboutLearning/images/message-customer.png',
          imagePath2: '/AllAboutLearning/images/message-customer-2.png',
          imagePath3: '/AllAboutLearning/images/message-customer-3.png',
          imagePath4: '/AllAboutLearning/images/message-customer-4.png',
          imageAlt: 'Messaging Interface',
          imageAlt2: 'Email Templates',
          imageAlt3: 'Message Customer',
          imageAlt4: 'Message Customer 2'
      }
  };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Back Button */}
            <Button 
                onClick={() => navigate('/training')}
                sx={{ 
                    mb: 3,
                    color: theme.palette.primary.main,
                    '&:hover': { backgroundColor: 'rgba(75, 172, 82, 0.1)' }
                }}
            >
                ← Back to Training & SOP's
            </Button>

            {/* Header */}
            <StaggeredFadeIn delay={0}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mb: 4,
                        color: 'black',
                        fontFamily: 'Roboto, sans-serif',
                        borderBottom: `3px solid ${theme.palette.primary.main}`,
                        pb: 2
                    }}
                >
                    New Parts Estimate Training
                </Typography>

                {/* Introduction Box */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" sx={{ 
                        fontSize: '1.1rem',
                        mb: 3,
                        maxWidth: '1100px',
                        fontFamily: 'Roboto, sans-serif',
                        lineHeight: 1.6
                    }}>
                        Welcome to the New Parts Estimate training guide. This comprehensive resource covers inventory management, receiving procedures, and warehouse operations.
                    </Typography>

                    {/* Key Principles Box */}
                    <Box sx={{
                        backgroundColor: 'rgba(75, 172, 82, 0.05)',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.primary.main}`,
                        p: 3,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '4px',
                            height: '100%',
                            backgroundColor: theme.palette.primary.main
                        }} />

                        <Typography variant="h6" sx={{ 
                            mb: 2,
                            fontFamily: 'Roboto, sans-serif',
                            color: theme.palette.primary.main,
                            fontWeight: 500
                        }}>
                            Key Principles
                        </Typography>

                        <Box sx={{ pl: 1 }}>
                            <ul style={{ 
                                listStyle: 'none',
                                padding: 0,
                                margin: 0
                            }}>
                                {[
                                    { title: 'Accuracy', desc: 'Maintain precise inventory counts and documentation' },
                                    { title: 'Organization', desc: 'Keep warehouse spaces clean and well-organized' },
                                    { title: 'Efficiency', desc: 'Optimize receiving and storage procedures' },
                                    { title: 'Documentation', desc: 'Record all transactions and changes accurately' }
                                ].map((item, index) => (
                                    <li key={index} style={{ 
                                        marginBottom: index === 3 ? 0 : '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <CheckCircle sx={{ 
                                            color: theme.palette.primary.main,
                                            fontSize: '1.1rem'
                                        }} />
                                        <span>
                                            <strong>{item.title}</strong> - {item.desc}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </Box>

                                {/* Table of Contents */}
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
                            color: theme.palette.primary.main,
                            transition: 'transform 0.3s ease'
                        }}>
                            {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                    </Box>

                    <Collapse in={isExpanded}>
                        <Grid container spacing={2}>
                            {sections.map((section, index) => (
                                <Grid item xs={12} sm={6} md={4} key={section.id}>
                                    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                        <Box
                                            component="a"
                                            href={`#${section.id}`}
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
                                                    boxShadow: 3,
                                                    '& .icon': {
                                                        transform: 'scale(1.2)',
                                                    },
                                                    '& .title': {
                                                        color: theme.palette.primary.main,
                                                    }
                                                }
                                            }}
                                        >
                                            <Box
                                              className="icon"
                                              sx={{
                                                  color: theme.palette.primary.main,
                                                  mb: 2,
                                                  fontSize: '2rem',
                                                  transition: 'transform 0.3s ease',
                                                  p: 1,
                                                  borderRadius: '50%',
                                                  backgroundColor: 'rgba(75, 172, 82, 0.1)',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: 60,
                                                  height: 60
                                              }}
                                          >
                                              {section.id === 'overview' && <InfoIcon sx={{ fontSize: '2rem' }} />}
                                              {section.id === 'navigation' && <NavigationIcon sx={{ fontSize: '2rem' }} />}
                                              {section.id === 'creation' && <ReceiptLongIcon sx={{ fontSize: '2rem' }} />}
                                              {section.id === 'addItem' && <AddCircleIcon sx={{ fontSize: '2rem' }} />}
                                              {section.id === 'files' && <FolderIcon sx={{ fontSize: '2rem' }} />}
                                              {section.id === 'communication' && <MessageIcon sx={{ fontSize: '2rem' }} />}
                                          </Box>
                                            <Typography
                                                className="title"
                                                sx={{
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    transition: 'color 0.3s ease',
                                                    fontSize: '1rem',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {section.title}
                                            </Typography>
                                        </Box>
                                    </Zoom>
                                </Grid>
                            ))}
                        </Grid>
                    </Collapse>
                </Card>

                                                               {/* Content Sections */}
                                                               {sections.map((section) => (
                    <Box key={section.id} id={section.id} sx={{ mb: 6 }}>
                        <Divider 
                            sx={{ 
                                my: 4, 
                                borderColor: theme.palette.primary.main,
                                '&::before, &::after': {
                                    borderColor: theme.palette.primary.main,
                                }
                            }}
                        >
                            <Typography 
                                variant="h1"
                                sx={{ 
                                    color: theme.palette.primary.main, 
                                    px: .9,
                                    fontSize: { 
                                        xs: '1rem',
                                        sm: '1.1rem',
                                        md: '1.2rem'
                                    },
                                    fontWeight: 500
                                }}
                            >
                                {sectionContent[section.id].title}
                            </Typography>
                        </Divider>

                        <Grid container spacing={4}>
                            {/* Text Content */}
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{ 
                                        p: 3,
                                        border: '1px solid black',
                                        borderRadius: '2px',
                                        backgroundColor: '#faf9f6',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        height: '100%',
                                        minHeight: sectionContent[section.id].imagePath2 ? '724px' : '470px',
                                        maxHeight: sectionContent[section.id].imagePath2 ? '724px' : '535px',
                                        overflowY: 'auto'  
                                    }}
                                >
                                    <Typography 
                                        sx={{ 
                                            color: 'black', 
                                            lineHeight: 2,
                                            whiteSpace: 'pre-line',
                                            fontSize: '1.1rem',
                                            fontFamily: 'Roboto, sans-serif'
                                        }}
                                    >
                                        {sectionContent[section.id].content}
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Images - Stacked */}
                            <Grid item xs={12} md={6}>
                                <Grid container direction="column" spacing={2}>
                                    {/* First Image */}
                                    <Grid item>
                                        <Paper 
                                            elevation={3}
                                            sx={{ 
                                                p: 2,
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                backgroundColor: '#faf9f6',
                                                position: 'relative',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: sectionContent[section.id].imagePath2 ? '320px' : '500px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    border: `2px solid ${theme.palette.primary.main}`,
                                                    borderRadius: '5px',
                                                    backgroundColor: 'white',
                                                    position: 'relative',
                                                    zIndex: 1,
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.75)',
                                                        zIndex: 999
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={sectionContent[section.id].imagePath}
                                                    alt={sectionContent[section.id].imageAlt}
                                                    style={{ 
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain',
                                                        
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </Box>
                                        </Paper>
                                    </Grid>

                                    {/* Second Image - Only render if imagePath2 exists */}
                                    {sectionContent[section.id].imagePath2 && (
                                        <Grid item>
                                            <Paper 
                                                elevation={3}
                                                sx={{ 
                                                    p: 2,
                                                    border: `1px solid ${theme.palette.primary.main}`,
                                                    backgroundColor: '#faf9f6',
                                                    position: 'relative',
                                                }}
                                            >
                                                  <Box
                                                    sx={{
                                                        height: '320px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        border: `2px solid ${theme.palette.primary.main}`,
                                                        borderRadius: '4px',
                                                        backgroundColor: 'white',
                                                        position: 'relative',
                                                        zIndex: 1,
                                                        transition: 'transform 0.3s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'scale(1.5)',
                                                            zIndex: 999
                                                        }
                                                    }}
                                                >
                                                    <img
                                                        src={sectionContent[section.id].imagePath2}
                                                        alt={sectionContent[section.id].imageAlt2}
                                                        style={{ 
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>{(sectionContent[section.id].imagePath3 || sectionContent[section.id].imagePath4) && (
                            <Grid container spacing={4} sx={{ mt: 0 }}>
                                {/* Third Image */}
                                {sectionContent[section.id].imagePath3 && (
                                    <Grid item xs={12} md={6}>
                                        <Paper 
                                            elevation={3}
                                            sx={{ 
                                                p: 2,
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                backgroundColor: '#faf9f6',
                                                position: 'relative',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: '320px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    border: `2px solid ${theme.palette.primary.main}`,
                                                    borderRadius: '4px',
                                                    backgroundColor: 'white',
                                                    position: 'relative',
                                                    zIndex: 1,
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.75)',
                                                        zIndex: 999
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={sectionContent[section.id].imagePath3}
                                                    alt={sectionContent[section.id].imageAlt3}
                                                    style={{ 
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )}

                                {/* Fourth Image */}
                                {sectionContent[section.id].imagePath4 && (
                                    <Grid item xs={12} md={6}>
                                        <Paper 
                                            elevation={3}
                                            sx={{ 
                                                p: 2,
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                backgroundColor: '#faf9f6',
                                                position: 'relative',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: '320px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    border: `2px solid ${theme.palette.primary.main}`,
                                                    borderRadius: '4px',
                                                    backgroundColor: 'white',
                                                    position: 'relative',
                                                    zIndex: 1,
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.75)',
                                                        zIndex: 999
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={sectionContent[section.id].imagePath4}
                                                    alt={sectionContent[section.id].imageAlt4}
                                                    style={{ 
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )}
                            </Grid>
                        )}
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
                          bottom: 24,    // Increased from 16 to 24 for better spacing
                          right: 24,     // Increased from 16 to 24 for better spacing
                          backgroundColor: '#4bac52',
                          width: 58,     // Added explicit width
                          height: 58,    // Added explicit height
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

export default NewPartsEstimate;