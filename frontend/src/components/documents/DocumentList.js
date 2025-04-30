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
  useTheme,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaggeredFadeIn from '../common/StaggeredFadeIn';
import VideoCard from '../training/VideoCard';
import SearchBar from '../common/SearchBar';
import searchIndex from '../../searchIndex';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
      id: 'door-bottoms', 
      name: 'Door Bottoms & Sweeps', 
      type: 'presentation', 
      description: 'Installation and maintenance of door bottoms and sweeps',
      image: '/AllAboutLearning/images/door-bottoms.png'
    },
    { 
      id: 'storm-doors-and-windows', 
      name: 'Storm Doors & Windows', 
      type: 'pdf', 
      description: 'Complete documentation for Storm Door installation and adjustment',
      image: '/AllAboutLearning/images/storm-window.png'
    },
    { 
      id: 'hinges', 
      name: 'Door Hinges', 
      type: 'document', 
      description: 'Specifications and installation guides for various hinge types',
      image: '/AllAboutLearning/images/hinge.jpg'
    },
    { 
      id: 'videos', 
      name: 'Videos', 
      type: 'video', 
      description: 'Watch and Learn - Enhance Your Support Expertise',
      image: '/AllAboutLearning/images/training-videos.png'
    },
    /* Commented out until information is ready
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
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

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
    if (categoryId === 'videos') {
      navigate('/videos'); // This will route to the video component
    } else {
      navigate(`/archives/${categoryId}`);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    
    const normalizedQuery = query.toLowerCase()
      .replace(/-/g, '') // Remove hyphens
      .replace(/\s+/g, '') // Remove spaces
      .replace(/[.,]/g, ''); // Remove periods and commas

    const results = searchIndex.filter(item => {
      const normalizedTitle = (item.title || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');
      const normalizedDescription = (item.description || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');
      const normalizedDetails = (item.details || '').toLowerCase()
        .replace(/-/g, '')
        .replace(/\s+/g, '')
        .replace(/[.,]/g, '');

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedDetails.includes(normalizedQuery)
      );
    });

    setSearchResults(results);
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
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <ToastContainer position="bottom-right" />
    <StaggeredFadeIn delay={0}>
      <Button 
        onClick={() => navigate('/')}
        sx={{ 
          color: theme.palette.primary.main,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.dark
          }
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        Back to Home
      </Button>

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
              mb: 2
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
              Informational Archives
            </Typography>

            <SearchBar 
              onSearch={handleSearch}
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

      {searching && (
        <Box sx={{ mt: 2, mb: 2 }}>
          {searchResults.length > 0 ? (
            <Paper sx={{ p: 2, backgroundColor: '#f1f8e9', border: '1px solid #4bac52' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'black', fontWeight: 500 }}>
                Search Results:
              </Typography>
              <Grid container spacing={3} maxWidth="lg">
                {searchResults.map((result, idx) => (
                  <Grid item xs={12} md={6} key={result.title}>
                    <Box
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        '&:hover': { 
                          backgroundColor: '#e8f5e9',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s ease-in-out',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                      onClick={() => {
                        if (result.type === 'video') {
                          navigate(result.path);
                          setTimeout(() => {
                            const videoElement = document.getElementById(result.videoId);
                            if (videoElement) {
                              videoElement.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'center'
                              });
                              videoElement.style.transition = 'all 0.3s ease-in-out';
                              videoElement.style.boxShadow = '0 0 20px rgba(75, 172, 82, 0.5)';
                              setTimeout(() => {
                                videoElement.style.boxShadow = 'none';
                              }, 2000);
                            }
                          }, 500);
                        } else {
                          navigate(result.path);
                        }
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1
                      }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: result.type === 'video' 
                            ? '#ff4444' 
                            : result.type === 'document' 
                            ? '#4bac52'
                            : '#2196f3',
                          fontSize: '2rem'
                        }}>
                          {result.type === 'video' ? (
                            <VideoLibraryIcon sx={{ fontSize: 'inherit' }} />
                          ) : result.type === 'document' ? (
                            <ArticleIcon sx={{ fontSize: 'inherit' }} />
                          ) : (
                            <MenuBookIcon sx={{ fontSize: 'inherit' }} />
                          )}
                        </Box>
                        <Typography variant="h6" sx={{ 
                          color: result.type === 'video' 
                            ? '#ff4444' 
                            : result.type === 'document' 
                            ? '#4bac52'
                            : '#2196f3',
                          fontWeight: 600,
                          fontSize: '1rem',
                          flexGrow: 1
                        }}>
                          {result.title}
                        </Typography>
                      </Box>
                      <Typography sx={{ 
                        color: 'black',
                        fontSize: '0.9rem',
                        flexGrow: 1
                      }}>
                        {result.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          ) : (
            <Paper sx={{ p: 2, backgroundColor: '#fffbe6', border: '1px solid #ffe082' }}>
              <Typography sx={{ color: '#b71c1c' }}>No results found.</Typography>
            </Paper>
          )}
        </Box>
      )}

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
              <StaggeredFadeIn delay={index * 0.1}>
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
                    <Typography variant="body2" color="white">
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
    </StaggeredFadeIn>
  </Container>
);
}

export default DocumentList;