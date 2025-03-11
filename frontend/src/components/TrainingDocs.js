import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import StaggeredFadeIn from './StaggeredFadeIn';

function TrainingDocs() {
  const theme = useTheme();
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState('all');
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchDocuments();
  }, [category]);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.get(
        `${baseUrl}/api/training-documents${category !== 'all' ? `?category=${category}` : ''}`,
        {
          headers: { Authorization: token }
        }
      );
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to fetch documents');
    }
  };

  const handleViewDocument = async (docId) => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      
      const viewerUrl = `/AllAboutLearning/pdf-viewer.html?file=${encodeURIComponent(
        `${baseUrl}/api/training-documents/${docId}`
      )}&token=${encodeURIComponent(token)}`;
      
      window.open(viewerUrl, '_blank', 
        'width=1000,height=800,toolbar=0,menubar=0,location=0'
      );
    } catch (error) {
      console.error('Error viewing document:', error);
      setError('Failed to view document');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StaggeredFadeIn delay={0}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          color: 'secondary.main',  // Changed from #8B4513 to black
          fontFamily: 'Roboto, sans-serif',
          borderBottom: `3px solid ${theme.palette.primary.main}`,  // Changed to green
          pb: 2
        }}
      >
        Training & SOPs
      </Typography>
    </StaggeredFadeIn>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

    <StaggeredFadeIn delay={0.2}>
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: theme.palette.primary.main,  // Changed to green
        mb: 3 
      }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => {
            setTabValue(newValue);
            setCategory(['all', 'sop', 'onboarding', 'training'][newValue]);
          }}
          sx={{
            '& .MuiTab-root': {
              fontFamily: 'Roboto, sans-serif',
              color: 'secondary.main',  // Changed to black
              '&.Mui-selected': {
                color: theme.palette.primary.main  // Changed to green
              }
            }
          }}
        >
          <Tab label="All Documents" />
          <Tab label="Standard Operating Procedures" />
          <Tab label="Onboarding" />
          <Tab label="Training Materials" />
        </Tabs>
      </Box>
      </StaggeredFadeIn>

      <StaggeredFadeIn delay={0.4}>
      <Grid container spacing={3}>
        {documents.map((doc) => (
          <Grid item xs={12} md={6} key={doc.id}>
            <Card sx={{ 
              backgroundColor: 'background.paper',  // Changed from #FAF0E6 to white
              border: `1px solid ${theme.palette.primary.main}`,  // Changed to green
              '&:hover': {
                boxShadow: 3,
                borderColor: theme.palette.primary.dark
              }
            }}>
              <CardContent>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'secondary.main',  // Changed from #8B4513 to black
                    fontFamily: 'Roboto, sans-serif',
                    mb:1,
                    pt:0,
                    mt:0
                  }}
                >
                  {doc.title}
                </Typography>
                <Typography 
                  variant="body1"  // Changed from body2 to body1 for larger text
                  sx={{ 
                    mt: 1,
                    color: 'white',
                    fontSize: '1.1rem',
                    mb:2,
                    pt:0,
                    mt:0
                  }}
                >
                  {doc.description}
                </Typography>
                <Typography 
                  variant="caption" 
                  display="block" 
                  sx={{ 
                    mt: 1,
                    color: 'white',
                    fontSize: '0.9rem',
                    mb:1,
                    pt:0,
                    mt:0
                  }}
                >
                  Category: {doc.category}
                </Typography>
                <Typography 
                  variant="caption" 
                  display="block"
                  sx={{ 
                    color: 'white',
                    fontSize: '0.9rem',
                    mb:1,
                    pt:0,
                    mt:0
                  }}
                >
                  Uploaded: {new Date(doc.upload_date).toLocaleDateString()}
                </Typography>
                </CardContent>
                <CardActions sx={{ pt: 2 }}>
                  <Button 
                    onClick={() => handleViewDocument(doc.id)}
                    sx={{ 
                      color: 'white',
                      border: `2px solid ${theme.palette.primary.main}`,  // Added green border
                      borderRadius: '4px',
                      padding: '8px 16px',  // Added more padding
                      fontSize: '0.95rem',  // Larger text
                      fontWeight: 'medium',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        borderColor: 'white'
                      }
                    }}
                  >
                    View Document
                  </Button>
                </CardActions>
              
            </Card>
          </Grid>
        ))}
      </Grid>
      </StaggeredFadeIn>
    </Container>
  );
}

export default TrainingDocs;