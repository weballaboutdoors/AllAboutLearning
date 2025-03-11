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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaggeredFadeIn from './StaggeredFadeIn';
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
    /*
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
    */
  ];

  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async (categoryId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/documents/${categoryId}`,
          {
            headers: { Authorization: token }
          }
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching documents for ${categoryId}:`, error);
        return [];
      }
    };

    const loadAllDocuments = async () => {
      setLoading(true);
      const documentsMap = {};
      for (const category of initialDocuments) {
        documentsMap[category.id] = await fetchDocuments(category.id);
      }
      setDocuments(documentsMap);
      setLoading(false);
    };

    loadAllDocuments();
  }, []);

  const handleCardClick = (categoryId) => {
    navigate(`/archives/${categoryId}`);
  };

  const DocumentDialog = ({ open, onClose, categoryId }) => {
    const categoryDocs = documents[categoryId] || [];
    
    const handleDocumentClick = async (doc) => {
      // Show loading toast immediately
      const loadingId = toast.loading("Opening document...");
      
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? process.env.REACT_APP_PROD_API_URL 
          : process.env.REACT_APP_API_URL;

        const response = await axios.get(
          `${apiUrl}/api/documents/${categoryId}/${doc.file_path}/file`,
          {
            headers: { Authorization: token },
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              toast.update(loadingId, { 
                render: `Loading: ${percentCompleted}%`
              });
            }
          }
        );
        
        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          // Update toast to success
          toast.update(loadingId, {
            render: "Document ready!",
            type: "success",
            isLoading: false,
            autoClose: 2000
          });
          
          const base64data = reader.result;
          
          // Open viewer and pass data
          const viewer = window.open(
            '/AllAboutLearning/pdf-viewer.html',
            '_blank',
            'width=800,height=600'
          );
          
          viewer.onload = () => {
            viewer.postMessage({ pdfData: base64data }, '*');
          };

          onClose();
        };
      } catch (error) {
        console.error('Error:', error);
        // Update toast to show error
        toast.update(loadingId, {
          render: "Error loading document",
          type: "error",
          isLoading: false,
          autoClose: 2000
        });
      }
    };

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {initialDocuments.find(cat => cat.id === categoryId)?.name} Documents
        </DialogTitle>
        <DialogContent>
          <List>
            {categoryDocs.map((doc) => (
              <ListItem 
                key={doc.id} 
                button 
                onClick={() => handleDocumentClick(doc)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer'
                  }
                }}
              >
                <ListItemIcon>
                  <PictureAsPdfIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={doc.title} 
                  secondary={doc.description} 
                />
              </ListItem>
            ))}
            {categoryDocs.length === 0 && (
              <ListItem>
                <ListItemText primary="No documents available" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
};

return (
  <Container>
    <ToastContainer position="bottom-right" />
    <StaggeredFadeIn delay={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Informational Archives
        </Typography>
      </Box>
    </StaggeredFadeIn>
    
    {loading ? (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    ) : error ? (
      <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
    ) : (
      <Grid container spacing={3}>
        {initialDocuments.map((doc, index) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <StaggeredFadeIn delay={index * 0.1}> {/* Added StaggeredFadeIn with delay */}
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
                onClick={() => handleCardClick(doc.id)}
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
            </StaggeredFadeIn>
          </Grid>
        ))}
      </Grid>
    )}

    <DocumentDialog 
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      categoryId={selectedCategory}
    />
  </Container>
);
}

export default DocumentList;