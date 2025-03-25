import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEditableContent } from '../../context/EditableContentContext';
import { useTheme } from '@mui/material/styles';
import { useGuideContent } from '../../context/GuideContentContext';

const EditableText = ({ id, defaultContent, onSave, variant, sx = {}, getContent, section }) => {
  const theme = useTheme();
  const { isAdmin } = useEditableContent();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [tempContent, setTempContent] = useState(content);
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadContent = async () => {
      if (getContent && !contentRef.current) {
        setIsLoading(true);
        try {
          const cacheKey = section ? `guide-content-${id}-${section}` : `guide-content-${id}`;
          console.log('Checking cache for:', cacheKey);
          const cachedData = sessionStorage.getItem(cacheKey);
          
          if (cachedData && cachedData !== 'undefined') {  // Add check for 'undefined'
            try {
              const parsed = JSON.parse(cachedData);
              console.log('Found in cache:', id);
              setContent(parsed);
              setTempContent(parsed);
              setError(null);
              contentRef.current = true;
              return;
            } catch (parseError) {
              console.log('Invalid cache data, removing:', cacheKey);
              sessionStorage.removeItem(cacheKey);  // Clear invalid cache
            }
          }
          
          const savedContent = await getContent();
          if (savedContent !== null) {
            setContent(savedContent);
            setTempContent(savedContent);
            // Only cache valid content
            if (savedContent !== undefined) {
              sessionStorage.setItem(cacheKey, JSON.stringify(savedContent));
            }
            setError(null);
          }
          contentRef.current = true;
        } catch (error) {
          console.error('Error loading content:', error);
          setError('Failed to load content');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadContent();
  }, [getContent, id, section]);

  const handleSave = async (newContent) => {
    setIsLoading(true);
    try {
      await onSave(newContent);
      
      const cacheKey = section ? `guide-content-${id}-${section}` : `guide-content-${id}`;
      sessionStorage.setItem(cacheKey, JSON.stringify(newContent));
      
      setContent(newContent);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Save failed:', error);
      setError('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  const retryLoad = () => {
    contentRef.current = false;
  };

  const renderContent = () => {
    // Non-admin view
    if (!isAdmin) {
      return (
        <Typography variant={variant} sx={sx}>
          {content || defaultContent}
        </Typography>
      );
    }

    // Admin loading state
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={16} />
          <Typography variant={variant} sx={{ ...sx, color: 'text.secondary' }}>
            {content || defaultContent}
          </Typography>
        </Box>
      );
    }

    // Admin error state
    if (error) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 16 }} />
          <Typography variant={variant} sx={{ ...sx, color: 'error.main' }}>
            {content || defaultContent}
          </Typography>
          <IconButton size="small" onClick={retryLoad} sx={{ ml: 1 }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      );
    }

    // Admin editing view
    if (isEditing) {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          width: '100%'
        }}>
          <TextField
            multiline
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'inherit',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <IconButton 
              size="small"
              onClick={() => handleSave(content)}
              disabled={isLoading}
              sx={{ 
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton 
              size="small"
              onClick={() => {
                setContent(tempContent);
                setIsEditing(false);
              }}
              disabled={isLoading}
              sx={{ 
                color: 'error.main',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      );
    }

    // Admin default view
    return (
      <Box sx={{ 
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        width: '100%',
        '& .edit-button': { 
          opacity: 0.6,
          '&:hover': {
            opacity: 1
          }
        },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 1
        }
      }}>
        <Typography 
          variant={variant} 
          sx={{
            ...sx,
            flex: 1,
            minHeight: '1.5em',
            p: 1,
          }}
        >
          {content || defaultContent}
        </Typography>
        <IconButton
          className="edit-button"
          size="small"
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
          sx={{
            flexShrink: 0,
            mt: 1,
            color: theme.palette.primary.main,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: 2,
            }
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  return renderContent();
};

export default EditableText;