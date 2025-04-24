import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const VideoCard = ({ title, description, videoId }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            mb: 2,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: '#faf9f6',
            height: '100%',  // Added to ensure equal height cards
            '&:hover': {
                boxShadow: 2,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease'
            }
        }}>
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    mb: 1.5 
                }}>
                    <PlayCircleOutlineIcon sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: '1.5rem'
                    }} />
                    <Typography variant="h6" sx={{ 
                        color: 'black',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '1.1rem'
                    }}>
                        {title}
                    </Typography>
                </Box>

                {description && (
                    <Typography 
                        sx={{ 
                            mb: 2,
                            color: 'black',
                            fontFamily: 'Roboto, sans-serif',
                            lineHeight: 1.4,
                            fontSize: '0.9rem'
                        }}
                    >
                        {description}
                    </Typography>
                )}
                
                <Paper 
                    elevation={2}
                    sx={{ 
                        p: 0.5,
                        border: `1px solid ${theme.palette.primary.main}`,
                        backgroundColor: '#faf9f6',
                    }}
                >
                    <Box sx={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        width: '100%',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: '4px',
                        overflow: 'hidden',
                        minHeight: '250px',
                        maxHeight: '250px',
                    }}>
                        <iframe
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                                objectFit: 'cover'
                            }}
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </Paper>
            </CardContent>
        </Card>
    );
};

export default VideoCard; 