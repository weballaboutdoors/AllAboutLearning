import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Navbar from './components/Navbar';
import DocumentList from './components/DocumentList';
import Login from './components/Login';
import Footer from './components/Footer';
import DocumentDetail from './components/DocumentDetail';
import CreateAccount from './components/CreateAccount';
import { AuthProvider } from './context/AuthContext';
const theme = createTheme({
  palette: {
    primary: {
      main: '#48ad4d', // A modern blue color
      light: '#6fc174',
      dark: '#327834',
    },
    secondary: {
      main: '#00bcd4',
    },
    background: {
      default: '#e8f5e9',
      paper: '#ffffff',
      navbar: '#000000',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

function App() {
    return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Router>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/documents/:id" element={<DocumentDetail />} />
                <Route path="/" element={<DocumentList />} />
                <Route path="/create-account" element={<CreateAccount />} />
              </Routes>
            </Container>
            <Footer />
          </Router>
        </Box>
      </ThemeProvider>
    </AuthProvider>
    );
  }

export default App; 