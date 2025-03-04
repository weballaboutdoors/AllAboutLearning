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
  IconButton,
  InputAdornment,
  TextField,
  CardMedia,
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { getDocuments } from '../services/api';

function DocumentList() {
  const initialDocuments = [
    { 
      id: 'multipoint-locks', 
      name: 'Multi-Point Locks', 
      type: 'pdf', 
      description: 'Installation guides, maintenance tips, and troubleshooting for multi-point lock systems',
      image: '/AllAboutLearning/images/multipointlock.jpg'
    },
    { 
      id: 'door-closers', 
      name: 'Door Closers', 
      type: 'pdf', 
      description: 'Complete documentation for door closer installation and adjustment',
      image: '/AllAboutLearning/images/doorcloser.jpg'
    },
    { 
      id: 'hinges', 
      name: 'Door Hinges', 
      type: 'document', 
      description: 'Specifications and installation guides for various hinge types',
      image: '/AllAboutLearning/images/hinge.jpg'
    },
    { 
      id: 'sliding-hardware', 
      name: 'Sliding Door Hardware', 
      type: 'presentation', 
      description: 'Installation and maintenance of sliding door systems',
      image: '/AllAboutLearning/images/sliding-hardware.jpg'
    },
    { 
      id: 'window-hardware', 
      name: 'Window Hardware', 
      type: 'pdf', 
      description: 'Complete guides for window operators and locks',
      image: '/AllAboutLearning/images/window-hardware.jpg'
    },
    { 
      id: 'door-hardware', 
      name: 'Door Hardware', 
      type: 'document', 
      description: 'Installation guides for various handle styles and mechanisms',
      image: '/AllAboutLearning/images/door-handles.jpg'
    },
    { 
      id: 'weatherstripping', 
      name: 'Weatherstripping', 
      type: 'pdf', 
      description: 'Selection and installation of door and window weatherstripping',
      image: '/AllAboutLearning/images/weatherstripping.jpg'
    },
    { 
      id: 'thresholds', 
      name: 'Thresholds', 
      type: 'document', 
      description: 'Installation and adjustment of door thresholds and sweeps',
      image: '/AllAboutLearning/images/threshold.jpg'
    },
    { 
      id: 'operators', 
      name: 'Operators', 
      type: 'pdf', 
      description: 'Automatic door operator installation and programming',
      image: '/AllAboutLearning/images/operator.jpg'
    },
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [loading, setLoading] = useState(false);  // Changed to false since we have initial data
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'presentation':
        return <SlideshowIcon color="primary" />;
      default:
        return <DescriptionIcon color="info" />;
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Informational Materials
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                }
              }}
              onClick={() => navigate(`/documents/${doc.id}`)}
            >
              <CardMedia
                component="img"
                height="400"
                image={doc.image}
                alt={doc.name}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: .5
                  }
                }}
              />
              <CardContent sx={{ cursor: 'pointer' }}>
                <Typography variant="h6" component="h2" sx={{ mb: 1, color: 'primary.main' }}>
                  {doc.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doc.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DocumentList;