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

function TrainingDocs() {
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
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          color: '#8B4513',
          fontFamily: '"Playfair Display", serif',
          borderBottom: '3px double #8B4513',
          pb: 2
        }}
      >
        Training & SOPs
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => {
            setTabValue(newValue);
            setCategory(['all', 'sop', 'onboarding', 'training'][newValue]);
          }}
          sx={{
            '& .MuiTab-root': {
              fontFamily: '"Old Standard TT", serif',
              color: '#8B4513'
            }
          }}
        >
          <Tab label="All Documents" />
          <Tab label="Standard Operating Procedures" />
          <Tab label="Onboarding" />
          <Tab label="Training Materials" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {documents.map((doc) => (
          <Grid item xs={12} md={6} key={doc.id}>
            <Card sx={{ 
              backgroundColor: '#FAF0E6',
              border: '1px solid #DEB887'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#8B4513', fontFamily: '"Playfair Display", serif' }}>
                  {doc.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {doc.description}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Category: {doc.category}
                </Typography>
                <Typography variant="caption" display="block">
                  Uploaded: {new Date(doc.upload_date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  onClick={() => handleViewDocument(doc.id)}
                  sx={{ 
                    color: '#8B4513',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 69, 19, 0.1)'
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
    </Container>
  );
}

export default TrainingDocs;