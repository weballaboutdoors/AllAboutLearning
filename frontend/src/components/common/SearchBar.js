import React, { useState } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ onSearch, sx }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '50px',
        padding: '8px 14px',
        ...sx
      }}
    >
      <SearchIcon 
        sx={{ 
          position: 'absolute',
          left: '14px',
          color: 'rgba(0, 0, 0, 0.54)',
          fontSize: '1.5rem'
        }} 
      />
      <InputBase
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search guides, videos, etc.."
        sx={{
          pl: '40px',
          pr: '40px',
          width: '100%',
          fontSize: '1rem',
          '& input': {
            padding: '4px 0',
            ...sx['& input']
          }
        }}
      />
      {searchTerm && (
        <IconButton
          onClick={handleClear}
          sx={{
            position: 'absolute',
            right: '8px',
            padding: '4px',
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': {
              color: 'rgba(0, 0, 0, 0.87)',
            }
          }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default SearchBar;
