import React from 'react';
import { Container, Typography, Box, Grid, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VideoCard from './VideoCard';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import { useTheme } from '@mui/material/styles';

function VideoLibrary() {
  const theme = useTheme();
  const navigate = useNavigate();

  const videos = [
    {
      title: 'Storm Door Handle Set Installation',
      description: 'Step-by-step guide for installing storm door handle sets',
      videoId: 'YOJv63CnBs4'
    },
    {
      title: 'Multi-Point Lock Handle Sets',
      description: 'Complete installation process for multi-point locks',
      videoId: 'GyiVA-Pm94A'
    },
    {
      title: 'All About Door Hinges',
      description: 'Complete guide to door hinge types, installation, and maintenance',
      videoId: 'I6EBdxdOZtA'  // You'll need to provide the YouTube video ID
    }
    // Add more videos as needed
  ];

  return (
    <Container maxWidth="md">
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

        {/* Add Divider here */}
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

        {/* Videos Grid */}
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
      </StaggeredFadeIn>
    </Container>
  );
}

export default VideoLibrary; 