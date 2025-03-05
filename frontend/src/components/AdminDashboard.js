import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  MenuItem
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Upload as UploadIcon } from '@mui/icons-material';
import axios from 'axios';


function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [documents, setDocuments] = useState([]);
  const [documentForm, setDocumentForm] = useState({
    title: '',
    description: '',
    file: null,
    categoryId: ''
  });
  const [openDocumentDialog, setOpenDocumentDialog] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchDocuments();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/admin/users',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const DOCUMENT_CATEGORIES = [
    { id: 'multipoint-locks', name: 'Multi-Point Locks' },
    { id: 'door-closers', name: 'Door Closers' },
    { id: 'hinges', name: 'Door Hinges' },
    { id: 'sliding-hardware', name: 'Sliding Door Hardware' },
    { id: 'window-hardware', name: 'Window Hardware' },
    { id: 'door-hardware', name: 'Door Hardware' },
    { id: 'weatherstripping', name: 'Weatherstripping' },
    { id: 'thresholds', name: 'Thresholds' },
    { id: 'operators', name: 'Operators' }
  ];




  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token being used:', token); // Debug log
      
      const response = await axios.get(
        'https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/admin/documents',
        {
          headers: { 
            'Authorization': token,  // Don't add 'Bearer ' here if it's already in the token
            'Content-Type': 'application/json'
          }
        }
      );
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      if (error.response?.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };


  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/admin/documents/${documentId}`,
        {
          headers: { 
            'Authorization': token
          }
        }
      );
      
      // Remove the document from the state
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
      setSuccess('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      setError(error.response?.data?.detail || 'Failed to delete document');
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated. Please login again.');
        return;
      }
  
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      await axios.post(
        `${baseUrl}/api/admin/create-user`,
        userForm,
        {
          headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess('User created successfully');
      setOpenDialog(false);
      fetchUsers();
      setUserForm({ email: '', password: '', firstName: '', lastName: '' });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError(error.response?.data?.detail || 'Failed to create user');
      }
    }
  };

const handleDocumentUpload = async () => {
  try {
    const formData = new FormData();
    formData.append('title', documentForm.title);
    formData.append('description', documentForm.description);
    formData.append('file', documentForm.file);
    formData.append('categoryId', documentForm.categoryId);
  
    const token = localStorage.getItem('token');
    console.log('Token being used:', token); // Debug log
    
    await axios.post(
      'https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/admin/upload-document',
      formData,
      {
        headers: { 
          'Authorization': token, // Remove 'Bearer ' if it's already in the token
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    setSuccess('Document uploaded successfully');
    setOpenDocumentDialog(false);
    fetchDocuments();
    setDocumentForm({ title: '', description: '', file: null, categoryId: '' });
  } catch (error) {
    console.error('Upload error:', error);
    if (error.response?.status === 401) {
      setError('Session expired. Please login again.');
      // Optionally redirect to login
      window.location.href = '/login';
    } else {
      setError(error.response?.data?.detail || 'Failed to upload document');
    }
  }
};

  

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
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
          Admin Dashboard
        </Typography>

        <Paper 
          sx={{ 
            backgroundColor: '#FAF0E6',
            border: '1px solid #8B4513'
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: '1px solid #8B4513',
              '& .MuiTab-root': {
                fontFamily: '"Old Standard TT", serif',
                color: '#8B4513'
              }
            }}
          >
            <Tab label="User Management" />
            <Tab label="Document Management" />
            <Tab label="System Settings" />
          </Tabs>

          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', color: '#8B4513' }}>
                  Employee Accounts
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    backgroundColor: '#8B4513',
                    color: '#FAF0E6',
                    '&:hover': {
                      backgroundColor: '#654321'
                    }
                  }}
                >
                  Create New Employee
                </Button>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#8B4513' }}
                            onClick={() => {/* Handle edit */}}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#8B4513' }}
                            onClick={() => {/* Handle delete */}}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', color: '#8B4513' }}>
                  Document Management
                </Typography>
                <Button
                  startIcon={<UploadIcon />}
                  onClick={() => setOpenDocumentDialog(true)}
                  sx={{
                    backgroundColor: '#8B4513',
                    color: '#FAF0E6',
                    '&:hover': {
                      backgroundColor: '#654321'
                    }
                  }}
                >
                  Upload Document
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Upload Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.title}</TableCell>
                        <TableCell>{doc.description}</TableCell>
                        <TableCell>{doc.category_id}</TableCell>
                        <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#8B4513' }}
                            onClick={() => handleDeleteDocument(doc.id)}
                            aria-label="Delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Create User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', color: '#8B4513' }}>
          Create New Employee Account
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={userForm.firstName}
            onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={userForm.lastName}
            onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateUser}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Document Upload Dialog */}
      <Dialog open={openDocumentDialog} onClose={() => setOpenDocumentDialog(false)}>
        <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', color: '#8B4513' }}>
          Upload New Document
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={documentForm.categoryId}
            onChange={(e) => setDocumentForm({ ...documentForm, categoryId: e.target.value })}
            sx={{ mb: 2 }}
          >
            {DOCUMENT_CATEGORIES.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={documentForm.title}
            onChange={(e) => setDocumentForm({ ...documentForm, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={documentForm.description}
            onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
          />
          <input
            accept="application/pdf"
            type="file"
            onChange={(e) => setDocumentForm({ ...documentForm, file: e.target.files[0] })}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDocumentDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleDocumentUpload}
            disabled={!documentForm.categoryId || !documentForm.file}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;