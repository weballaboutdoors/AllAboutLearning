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
  FormControl,
  InputLabel,
  Select,
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
import { useTheme } from '@mui/material/styles';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RouterIcon from '@mui/icons-material/Router';
import Tooltip from '@mui/material/Tooltip';


function AdminDashboard() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
  const [auditLogs, setAuditLogs] = useState([]);
  const [trainingDocs, setTrainingDocs] = useState([]);
  const [openTrainingDocDialog, setOpenTrainingDocDialog] = useState(false);
  const [trainingDocFormData, setTrainingDocFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null
  });
  // New state for editing users
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchDocuments();
    fetchTrainingDocs();
  }, []);

  useEffect(() => {
    if (tabValue === 2) {  // Only fetch when on System Settings tab
      fetchAuditLogs();
    }
  }, [tabValue, page, rowsPerPage]);


  const handleClearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear all activity logs? This cannot be undone.')) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;
  
      await axios.delete(
        `${apiUrl}/api/admin/audit-logs`,
        {
          headers: { 
            'Authorization': token
          }
        }
      );
  
      setAuditLogs([]); // Clear logs from state
      setSuccess('Activity logs cleared successfully');
    } catch (error) {
      console.error('Error clearing logs:', error);
      setError('Failed to clear activity logs');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      password: ''  // Empty by default
    });
    setEditDialog(true);
  };

  
  const handleOpenTrainingDocDialog = () => {
    setOpenTrainingDocDialog(true);
  };
  
  const handleCloseTrainingDocDialog = () => {
    setOpenTrainingDocDialog(false);
    setTrainingDocFormData({ title: '', description: '', category: '', file: null });
  };

  const handleUploadTrainingDoc = async () => {
    try {
      const formData = new FormData();
      formData.append('title', trainingDocFormData.title);
      formData.append('description', trainingDocFormData.description);
      formData.append('category', trainingDocFormData.category);
      formData.append('file', trainingDocFormData.file);
  
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      
      await axios.post(
        `${baseUrl}/api/admin/training-documents`,
        formData,
        {
          headers: { 
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      handleCloseTrainingDocDialog();
      fetchTrainingDocs();
      setSuccess('Training document uploaded successfully');
    } catch (error) {
      console.error('Error uploading training document:', error);
      setError('Failed to upload training document');
    }
  };
  
  // Also make sure you have this function
  const handleViewTrainingDoc = async (docId) => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      
      const viewerUrl = `/AllAboutLearning/pdf-viewer.html?file=${encodeURIComponent(
        `${baseUrl}/api/training-documents/${docId}`
      )}&token=${encodeURIComponent(token)}`;
      
      // Open in custom viewer
      window.open(viewerUrl, '_blank', 
        'width=1000,height=800,toolbar=0,menubar=0,location=0'
      );
    } catch (error) {
      console.error('Error viewing training document:', error);
      setError('Failed to view training document');
    }
  };
  
  // And this function for deleting
  const handleDeleteTrainingDoc = async (docId) => {
    if (window.confirm('Are you sure you want to delete this training document?')) {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        
        await axios.delete(
          `${baseUrl}/api/admin/training-documents/${docId}`,
          {
            headers: { Authorization: token }
          }
        );
  
        fetchTrainingDocs();
        setSuccess('Training document deleted successfully');
      } catch (error) {
        console.error('Error deleting training document:', error);
        setError('Failed to delete training document');
      }
    }
  };


  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      
      await axios.put(
        `${baseUrl}/api/admin/users/${selectedUser.id}`,
        editForm,
        {
          headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSuccess('User updated successfully');
      setEditDialog(false);
      fetchUsers();  // Refresh the list
      setEditForm({ email: '', firstName: '', lastName: '', password: '' });
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.detail || 'Failed to update user');
    }
  };



  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.get(
        `${baseUrl}/api/admin/users`,
        {
          headers: { Authorization: token }
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to fetch users');
      }
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
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;
      
      console.log('Fetching documents...'); // Debug log
      
      const response = await axios.get(
        `${apiUrl}/api/admin/documents`,
        {
          headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          withCredentials: true  // Add this
        }
      );
      
      console.log('Documents received:', response.data); // Debug log
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };


  const handleDeleteDocument = async (documentId) => {
  if (!window.confirm('Are you sure you want to delete this document?')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    
    await axios.delete(
      `${apiUrl}/api/admin/documents/${documentId}`,
      {
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        withCredentials: false
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


  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;
  
      await axios.delete(
        `${apiUrl}/api/admin/users/${userId}`,
        {
          headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      setSuccess('User deleted successfully');
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        // Redirect to login if needed
        window.location.href = '/AllAboutLearning/login';
      } else {
        setError(error.response?.data?.detail || 'Failed to delete user');
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
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;
  
      console.log('Starting document upload...'); // Debug log
  
      try {
        const response = await axios.post(
          `${apiUrl}/api/admin/upload-document`,
          formData,
          {
            headers: { 
              'Authorization': token,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        console.log('Upload successful:', response.data); // Debug log
        
        setSuccess('Document uploaded successfully');
        setOpenDocumentDialog(false);
        await fetchDocuments();  // Add await here
        setDocumentForm({ title: '', description: '', file: null, categoryId: '' });
        
      } catch (error) {
        console.log('Upload error response:', error.response?.data);
        
        if (error.response?.status === 401 && error.response.data.detail?.auth_url) {
          const authWindow = window.open(error.response.data.detail.auth_url, '_blank');
          setError('Please complete Google authentication in the new window and try uploading again');
          
          if (authWindow) {
            const checkWindow = setInterval(() => {
              if (authWindow.closed) {
                clearInterval(checkWindow);
                setError('Google authentication window closed. Please try uploading again.');
              }
            }, 1000);
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.detail?.message || 'Failed to upload document');
    }
  };


  const handleViewDocument = async (docId, categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;
      
      // Add the basename to the viewer URL
      const viewerUrl = `/AllAboutLearning/pdf-viewer.html?file=${encodeURIComponent(
        `${apiUrl}/api/documents/${categoryId}/${docId}/file`
      )}&token=${encodeURIComponent(token)}`;
      
      // Open in custom viewer
      window.open(viewerUrl, '_blank', 
        'width=1000,height=800,toolbar=0,menubar=0,location=0'
      );
    } catch (error) {
      console.error('Error viewing document:', error);
      setError('Failed to view document');
    }
  };
  
  const fetchAuditLogs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;
  
      const response = await axios.get(
        `${baseUrl}/api/admin/audit-logs?skip=${page * rowsPerPage}&limit=${rowsPerPage}`,
        {
          headers: { Authorization: token }
        }
      );
      
      setAuditLogs(response.data.logs);
      setTotalLogs(response.data.total);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      setError('Failed to fetch audit logs');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add the action config helper
  const getActionConfig = (actionType) => {
    const configs = {
      'LOGIN': {
        color: '#4caf50',
        icon: <LoginIcon fontSize="small" />,
        label: 'Login'
      },
      'LOGOUT': {
        color: '#757575',
        icon: <LogoutIcon fontSize="small" />,
        label: 'Logout'
      },
      'CREATE_USER': {
        color: '#2196f3',
        icon: <PersonAddIcon fontSize="small" />,
        label: 'Create User'
      },
      'UPDATE_USER': {
        color: '#ff9800',
        icon: <EditIcon fontSize="small" />,
        label: 'Update User'
      },
      'DELETE_USER': {
        color: '#f44336',
        icon: <DeleteIcon fontSize="small" />,
        label: 'Delete User'
      },
      'UPLOAD_DOC': {
        color: '#9c27b0',
        icon: <UploadFileIcon fontSize="small" />,
        label: 'Upload Document'
      },
      'DEFAULT': {
        color: '#607d8b',
        icon: <InfoIcon fontSize="small" />,
        label: 'Action'
      }
    };
    return configs[actionType] || configs.DEFAULT;
  };


  const fetchTrainingDocs = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.get(
        `${baseUrl}/api/admin/training-documents`,
        {
          headers: { Authorization: token }
        }
      );
      setTrainingDocs(response.data);
    } catch (error) {
      console.error('Error fetching training documents:', error);
      setError('Failed to fetch training documents');
    }
  };


  const TrainingDocDialog = () => (
    <Dialog open={openTrainingDocDialog} onClose={handleCloseTrainingDocDialog}>
      <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
        Upload Training Document
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          value={trainingDocFormData.title}
          onChange={(e) => setTrainingDocFormData({...trainingDocFormData, title: e.target.value})}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={trainingDocFormData.description}
          onChange={(e) => setTrainingDocFormData({...trainingDocFormData, description: e.target.value})}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={trainingDocFormData.category}
            onChange={(e) => setTrainingDocFormData({...trainingDocFormData, category: e.target.value})}
          >
            <MenuItem value="sop">Standard Operating Procedures</MenuItem>
            <MenuItem value="onboarding">Onboarding</MenuItem>
            <MenuItem value="training">Training Materials</MenuItem>
          </Select>
        </FormControl>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setTrainingDocFormData({...trainingDocFormData, file: e.target.files[0]})}
          style={{ marginTop: '20px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseTrainingDocDialog}>Cancel</Button>
        <Button onClick={handleUploadTrainingDoc}>Upload</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            color: 'secondary.main',
            fontFamily: 'Roboto, sans-serif',
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            pb: 2
          }}
        >
          Admin Dashboard
        </Typography>

        <Paper 
          sx={{ 
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.primary.main}`
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: `1px solid ${theme.palette.primary.main}`,
              '& .MuiTab-root': {
                fontFamily: 'Roboto, sans-serif',
                color: 'white',
                '&.Mui-selected': {
                  color: theme.palette.primary.main  // Green when selected
                }
              }
            }}
          >
            <Tab label="User Management" />
            <Tab label="Document Management" />
            <Tab label="System Settings" />
            {/*<Tab label="Training Documents" />*/}
          </Tabs>

          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
                  Employee Accounts
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
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
                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                      <TableCell sx={{ color: 'white' }}>Email</TableCell>
                      <TableCell sx={{ color: 'white' }}>Created Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell sx={{ color: 'white' }}>{`${user.first_name} ${user.last_name}`}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                        <IconButton 
                          size="small" 
                          sx={{ color: theme.palette.primary.main, '&:hover': {
                        color: theme.palette.primary.dark  // Darker green on hover
                    } }}
                          onClick={() => handleEditUser(user)}  // This connects to the edit functionality
                        >
                          <EditIcon />
                        </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ color: theme.palette.primary.main, '&:hover': {
                            color: theme.palette.primary.dark  // Darker green on hover
                        } }}
                            onClick={() => handleDeleteUser(user.id)}
                            aria-label="Delete user"
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
                <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
                  Document Management
                </Typography>
                <Button
                  startIcon={<UploadIcon />}
                  onClick={() => setOpenDocumentDialog(true)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                >
                  Upload Document
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(75, 172, 82, 0.1)' }}>
                      <TableCell sx={{ color: 'white' }}>Title</TableCell>
                      <TableCell sx={{ color: 'white' }}>Description</TableCell>
                      <TableCell sx={{ color: 'white' }}>Category</TableCell>
                      <TableCell sx={{ color: 'white' }}>Upload Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents && documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Button
                            onClick={() => handleViewDocument(doc.file_path, doc.category_id)}
                            sx={{ 
                              textAlign: 'left', 
                              textTransform: 'none',
                              color: theme.palette.primary.main,
                              '&:hover': {
                                color: theme.palette.primary.dark
                              }
                            }}
                            variant="text"
                          >
                            {doc.title}
                          </Button>
                        </TableCell>
                        <TableCell>{doc.description}</TableCell>
                        <TableCell>
                          {DOCUMENT_CATEGORIES.find(cat => cat.id === doc.category_id)?.name || doc.category_id}
                        </TableCell>
                        <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.primary.main,
                              '&:hover': {
                                color: theme.palette.primary.dark
                              }
                            }}
                            onClick={() => handleDeleteDocument(doc.id)}
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

            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
                    System Activity Logs
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography sx={{ color: 'white' }}>
                      Total Logs: {totalLogs}
                    </Typography>
                    <Button
                      startIcon={<DeleteSweepIcon />}
                      onClick={handleClearLogs}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark
                        }
                      }}
                    >
                      Clear Logs
                    </Button>
                  </Box>
                </Box>
                  <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Timestamp</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Details</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>IP Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <CircularProgress sx={{ color: theme.palette.primary.main }} />
                        </TableCell>
                      </TableRow>
                    ) : auditLogs && auditLogs.length > 0 ? (
                      auditLogs.map((log) => (
                        <TableRow 
                          key={log.id}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(75, 172, 82, 0.1)',
                            },
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <TableCell sx={{ color: 'white' }}>
                            {new Date(log.timestamp).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </TableCell>
                          <TableCell sx={{ color: 'white' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <AccountCircleIcon sx={{ color: theme.palette.primary.main }} />
                              {log.user_email}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              icon={getActionConfig(log.action_type).icon}
                              label={getActionConfig(log.action_type).label}
                              sx={{
                                backgroundColor: getActionConfig(log.action_type).color,
                                color: 'white',
                                '& .MuiChip-icon': {
                                  color: 'white'
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: 'white' }}>{log.action_detail}</TableCell>
                          <TableCell>
                            <Tooltip title="IP Address" placement="left">
                              <Chip
                                icon={<RouterIcon fontSize="small" />}
                                label={log.ip_address}
                                variant="outlined"
                                sx={{
                                  color: 'white',
                                  borderColor: 'rgba(255,255,255,0.3)',
                                  '& .MuiChip-icon': {
                                    color: 'white'
                                  }
                                }}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ color: 'white' }}>
                          No logs found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

                  <TablePagination
                    component="div"
                    count={totalLogs}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                    labelDisplayedRows={({ from, to, count }) => 
                      `${from}-${to} of ${count !== -1 ? count : 'more than ' + to}`
                    }
                    sx={{
                      color: 'white',
                      '.MuiTablePagination-selectIcon': {
                        color: 'white'
                      },
                      '.MuiTablePagination-select': {
                        color: 'white'
                      }
                    }}
                  />
                </Box>
              )}

          
          {tabValue === 3 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
                  Training Documents
                </Typography>
                <Button
                  startIcon={<UploadIcon />}
                  onClick={() => handleOpenTrainingDocDialog(true)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                >
                  Upload Training Document
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(75, 172, 82, 0.1)' }}>
                      <TableCell sx={{ color: 'white' }}>Title</TableCell>
                      <TableCell sx={{ color: 'white' }}>Description</TableCell>
                      <TableCell sx={{ color: 'white' }}>Category</TableCell>
                      <TableCell sx={{ color: 'white' }}>Upload Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainingDocs && trainingDocs.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Button
                            onClick={() => handleViewTrainingDoc(doc.id)}
                            sx={{ 
                              textAlign: 'left', 
                              textTransform: 'none',
                              color: theme.palette.primary.main,
                              '&:hover': {
                                color: theme.palette.primary.dark
                              }
                            }}
                            variant="text"
                          >
                            {doc.title}
                          </Button>
                        </TableCell>
                        <TableCell>{doc.description}</TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{new Date(doc.upload_date).toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.primary.main,
                              '&:hover': {
                                color: theme.palette.primary.dark
                              }
                            }}
                            onClick={() => handleDeleteTrainingDoc(doc.id)}
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
          
      


      {/* Create User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
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
              <Button 
                onClick={() => setOpenDialog(false)}
                sx={{ 
                  color: theme.palette.primary.main,  // Changed to green
                  '&:hover': {
                    backgroundColor: 'rgba(75, 172, 82, 0.1)'  // Light green background
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateUser}
                sx={{
                  backgroundColor: theme.palette.primary.main,  // Changed to green
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark  // Darker green
                  }
                }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>


      {/* Edit User Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
          Edit Employee Account
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={editForm.firstName}
            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editForm.lastName}
            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="New Password (leave blank to keep current)"
            type="password"
            fullWidth
            value={editForm.password}
            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateUser}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Document Upload Dialog */}
      <Dialog 
  open={openDocumentDialog} 
  onClose={() => setOpenDocumentDialog(false)}
  PaperProps={{
    sx: {
      backgroundColor: 'white',  // Changed from dark to white background
      p: 3,
      borderRadius: 2
    }
  }}
>
  <DialogTitle 
    sx={{ 
      color: 'black',  // Changed from white to black
      fontSize: '1.5rem',
      pb: 2,
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }}
  >
    Upload New Document
  </DialogTitle>
  <DialogContent sx={{ mt: 2 }}>
    <Typography 
      variant="subtitle1" 
      sx={{ 
        color: theme.palette.primary.main,
        mb: 1 
      }}
    >
      Category
    </Typography>
    <TextField
      select
      fullWidth
      value={documentForm.categoryId}
      onChange={(e) => setDocumentForm({ ...documentForm, categoryId: e.target.value })}
      sx={{ 
        mb: 2,
        backgroundColor: 'white',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',  // Added this
          '& fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
        '& .MuiSelect-select': {  // Added this
          backgroundColor: 'white',
        },
        '& .MuiMenu-paper': {  // Added this
          backgroundColor: 'white',
        }
      }}
    >
      {DOCUMENT_CATEGORIES.map((category) => (
        <MenuItem 
          key={category.id} 
          value={category.id}
          sx={{ 
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: '#4bAC52'
            }
          }}
        >
          {category.name}
        </MenuItem>
      ))}
    </TextField>

    <Typography 
      variant="subtitle1" 
      sx={{ 
        color: theme.palette.primary.main,
        mb: 1 
      }}
    >
      Title
    </Typography>
    <TextField
      fullWidth
      value={documentForm.title}
      onChange={(e) => setDocumentForm({ ...documentForm, title: e.target.value })}
      sx={{ 
        mb: 2,
        backgroundColor: 'white',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
    />

    <Typography 
      variant="subtitle1" 
      sx={{ 
        color: theme.palette.primary.main,
        mb: 1 
      }}
    >
      Description
    </Typography>
    <TextField
      fullWidth
      multiline
      rows={4}
      value={documentForm.description}
      onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
      sx={{ 
        mb: 2,
        backgroundColor: 'white',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
    />

    <Button
      variant="contained"
      component="label"
      sx={{
        mt: 2,
        backgroundColor: 'white',
        color: 'black',
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: 'white'
        }
      }}
    >
      Choose File
      <input
        type="file"
        accept="application/pdf, .doc, .docx"
        hidden
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setDocumentForm(prev => ({
              ...prev,
              file: file
            }));
          }
        }}
      />
    </Button>
  </DialogContent>

  <DialogActions sx={{ mt: 2, p: 2 }}>
    <Button 
      onClick={() => setOpenDocumentDialog(false)}
      sx={{ 
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: 'rgba(75, 172, 82, 0.1)'
        }
      }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleDocumentUpload}
      disabled={!documentForm.categoryId || !documentForm.file}
      variant="contained"
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }}
    >
      Upload
    </Button>
  </DialogActions>
</Dialog>

      <Dialog open={openTrainingDocDialog} onClose={handleCloseTrainingDocDialog}>
        <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
          Upload Training Document
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={trainingDocFormData.title}
            onChange={(e) => setTrainingDocFormData({...trainingDocFormData, title: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={trainingDocFormData.description}
            onChange={(e) => setTrainingDocFormData({...trainingDocFormData, description: e.target.value})}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={trainingDocFormData.category}
              onChange={(e) => setTrainingDocFormData({...trainingDocFormData, category: e.target.value})}
            >
              <MenuItem value="sop">Standard Operating Procedures</MenuItem>
              <MenuItem value="onboarding">Onboarding</MenuItem>
              <MenuItem value="training">Training Materials</MenuItem>
            </Select>
          </FormControl>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setTrainingDocFormData({...trainingDocFormData, file: e.target.files[0]})}
            style={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTrainingDocDialog}>Cancel</Button>
          <Button onClick={handleUploadTrainingDoc}>Upload</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Container>
  );
}

export default AdminDashboard;