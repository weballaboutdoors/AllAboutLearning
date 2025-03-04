import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Breadcrumbs,
  Link
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import { useParams, useNavigate } from 'react-router-dom';

function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would eventually come from your backend
  const documentDetails = {
    'multipoint-locks': {
      title: 'Multi-Point Locks',
      description: 'Comprehensive information about multi-point locks',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'door-closers': {
      title: 'Door Closers',
      description: 'Detailed product features and specifications',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'hinges': {
      title: 'Door Hinges',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'sliding-hardware': {
      title: 'Sliding Hardware',
      description: 'Installation and maintenance of sliding door systems',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'window-hardware': {
      title: 'Window Hardware',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'electronic-locks': {
      title: 'Electronic Locks',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'door-hardware': {
      title: 'Door Hardware',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'weatherstripping': {
      title: 'Weatherstripping',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'thresholds': {
      title: 'Thresholds',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'panic-hardware': {
      title: 'Panic Hardware',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'operators': {
      title: 'Operators',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    },
    'specialty-hardware': {
      title: 'Specialty Hardware',
      description: 'Internal policies and procedures',
      resources: [
        { 
          title: 'Installation Guide', 
          type: 'pdf',
          url: '#',
          description: 'Step-by-step installation instructions'
        },
        { 
          title: 'Maintenance Video', 
          type: 'video',
          url: '#',
          description: 'Regular maintenance procedures'
        },
        { 
          title: 'Troubleshooting Guide', 
          type: 'pdf',
          url: '#',
          description: 'Common issues and solutions'
        },
        { 
          title: 'Parts Catalog', 
          type: 'document',
          url: '#',
          description: 'Complete parts listing and specifications'
        }
      ]
    }
    // Add more documents as needed
  };

  const getIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'video':
        return <PlayCircleIcon color="primary" />;
      default:
        return <ArticleIcon color="info" />;
    }
  };

  const document = documentDetails[id];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          color="inherit" 
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Documents
        </Link>
        <Typography color="text.primary">{document?.title}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4, color: 'primary.main' }}>
        {document?.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {document?.description}
      </Typography>

      <List>
        {document?.resources.map((resource, index) => (
          <Paper 
            key={index} 
            elevation={1} 
            sx={{ 
              mb: 2,
              '&:hover': {
                backgroundColor: 'background.paper',
                transform: 'translateY(-2px)',
                transition: 'transform 0.2s',
                boxShadow: 2
              }
            }}
          >
            <ListItem 
              button 
              component="a" 
              href={resource.url}
              target="_blank"
            >
              <ListItemIcon>
                {getIcon(resource.type)}
              </ListItemIcon>
              <ListItemText 
                primary={resource.title}
                secondary={resource.description}
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'primary'
                }}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default DocumentDetail;