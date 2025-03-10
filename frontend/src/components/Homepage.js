import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAuth } from '../context/AuthContext';

function Homepage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cards = [
    {
      title: 'Archives',
      description: 'Access Door & Window documents and records',
      icon: <ArchiveIcon sx={{ fontSize: 60, color: '#8B4513' }} />,
      path: '/documents',
      color: '#FAF0E6'
    },
    {
      title: 'Training & SOPs',
      description: 'View training materials and standard operating procedures',
      icon: <MenuBookIcon sx={{ fontSize: 60, color: '#8B4513' }} />,
      path: '/training',
      color: '#FAF0E6'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#8B4513',
            fontFamily: '"Playfair Display", serif',
            borderBottom: '3px double #8B4513',
            pb: 2,
            mb: 2
          }}
        >
          Welcome, {user?.firstName}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#654321',
            fontFamily: '"Old Standard TT", serif'
          }}
        >
          Select a section below to get started
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: card.color,
                border: '1px solid #DEB887',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 8px rgba(139, 69, 19, 0.2)'
                }
              }}
            >
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center',
                p: 4
              }}>
                <Box sx={{ mb: 3 }}>
                  {card.icon}
                </Box>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h2"
                  sx={{ 
                    color: '#8B4513',
                    fontFamily: '"Playfair Display", serif',
                    mb: 2
                  }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  sx={{ 
                    mb: 3,
                    color: '#654321',
                    fontFamily: '"Old Standard TT", serif'
                  }}
                >
                  {card.description}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(card.path)}
                  sx={{
                    color: '#8B4513',
                    borderColor: '#8B4513',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 69, 19, 0.1)',
                      borderColor: '#654321'
                    },
                    fontFamily: '"Old Standard TT", serif'
                  }}
                >
                  Access {card.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Homepage;