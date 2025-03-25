import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Navbar from './components/layout/Navbar.js';
import DocumentList from './components/documents/DocumentList.js';
import Login from './components/auth/Login.js';
import Footer from './components/layout/Footer.js';
import DocumentDetail from './components/documents/DocumentDetail.js';
import CreateAccount from './components/auth/CreateAccount.js';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/pages/LandingPage.js';
import ProtectedRoute from './components/auth/ProtectedRoute';  // Add this import
import AdminDashboard from './components/admin/AdminDashboard.js';
import TrainingDocs from './components/TrainingDocs';
import Homepage from './components/pages/Homepage.js';
import MultiPointLocks from './components/MultiPointLocks';
import LockGuide from './components/LockGuide';
import StormDoors from './components/StormDoors';
import StormGuide from './components/StormGuide';
import WebDepartment from './components/pages/WebDepartment.js';
import CustomerService from './components/services/CustomerService.js';
import Shipping from './components/services/Shipping.js';
import { EditableContentProvider } from './context/EditableContentContext';
import { GuideContentProvider } from './context/GuideContentContext';  // Add this import

const theme = createTheme({
  palette: {
    primary: {
      main: '#4bac52',  // Your green
      light: '#71c177',  // Lighter shade of green
      dark: '#348a3a',  // Darker shade of green
      contrastText: '#ffffff',  // White text on green
    },
    secondary: {
      main: '#000000',  // Black
      light: '#2c2c2c',  // Lighter black
      dark: '#000000',  // Pure black
      contrastText: '#ffffff',  // White text on black
    },
    background: {
      default: '#ffffff',  // White background
      paper: '#000000',    // Slightly off-white for cards/paper elements
    },
    text: {
      primary: '#000000',   // Black text
      secondary: '#4bac52', // Green text for secondary elements
    },
    divider: '#4bac52',     // Green dividers
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h4: {
      color: '#000000',
      fontWeight: 500,
    },
    h5: {
      color: '#000000',
      fontWeight: 500,
    },
    h6: {
      color: '#000000',
      fontWeight: 500,
    },
    subtitle1: {
      color: '#4bac52',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#4bac52',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#348a3a',
          },
        },
        outlined: {
          borderColor: '#4bac52',
          color: '#4bac52',
          '&:hover': {
            borderColor: '#348a3a',
            color: '#348a3a',
            backgroundColor: 'rgba(75, 172, 82, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid rgba(75, 172, 82, 0.2)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(75, 172, 82, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
        },
      },
    },
  },
});

function App() {
  return (
    <Router basename="/AllAboutLearning">
      <AuthProvider>
        <EditableContentProvider>
          <GuideContentProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            bgcolor: '#f1f8e9',
            backgroundImage: 'url("/vintage-paper-texture.png")',
          }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
              <Routes>
                <Route path="/archives" element={<DocumentList />} />
                <Route path="/archives/multipoint-locks/:guideId" element={<LockGuide />} />
                <Route path="/archives/multipoint-locks" element={<MultiPointLocks />} />
                <Route path="/archives/storm-doors-and-windows" element={<StormDoors />} />
                <Route path="/archives/storm-doors-and-windows/:guideId" element={<StormGuide />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/training" element={<TrainingDocs />} />
                <Route path="/training/web" element={<WebDepartment />} />
                <Route path="/training/customer-service" element={<CustomerService />} />
                <Route path="/training/shipping" element={<Shipping />} />
                
                              <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Homepage />
                    </ProtectedRoute>
                  } 
                />
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
                <Route 
                  path="/training" 
                  element={
                    <ProtectedRoute>
                      <TrainingDocs />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </ThemeProvider>
        </GuideContentProvider>
        </EditableContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;