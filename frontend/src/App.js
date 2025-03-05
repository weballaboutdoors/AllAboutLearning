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
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';  // Add this import
import AdminDashboard from './components/AdminDashboard';
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Vintage brown
      light: '#D2691E',
      dark: '#654321',
    },
    secondary: {
      main: '#DEB887', // Burlywood
      light: '#F5DEB3',
      dark: '#A0522D',
    },
    background: {
      default: '#FDF5E6', // Old lace
      paper: '#FAF0E6',  // Linen
    },
  },
  typography: {
    fontFamily: '"Old Standard TT", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      borderBottom: '2px solid #8B4513',
    },
    body1: {
      fontFamily: '"Courier Prime", monospace',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FAF0E6',
          borderRadius: 0,
          border: '1px solid #8B4513',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontFamily: '"Old Standard TT", serif',
          border: '2px solid #8B4513',
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
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            bgcolor: '#FDF5E6',
            backgroundImage: 'url("/vintage-paper-texture.png")',
          }}>
            <Router basename="/AllAboutLearning">
              <Navbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route 
                    path="/documents" 
                    element={
                      <ProtectedRoute>
                        <DocumentList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/documents/:id" element={
                    <ProtectedRoute>
                      <DocumentDetail />
                    </ProtectedRoute>
                  } />
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