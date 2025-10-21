import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import logo from '../public/favicon.png';

export default function Navbar({ toDarkMode }) {
    const [isTouched, setIsTouched] = useState(false);

    return (
        <Box sx={{
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 2000,
            px: { xs: 1, sm: 2 },
        }}>
            <AppBar
                position="static"
                sx={{
                    maxWidth: '100%',
                    borderRadius: '0 0 12px 12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)',
                }}
            >
                <Toolbar sx={{
                    justifyContent: 'space-between',
                    py: 1,
                    px: { xs: 2, sm: 3 },
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src={logo} alt="ShigotoZen" style={{ height: '32px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                            }}
                        >
                            ShigotoZen
                        </Typography>
                    </Box>
                    <IconButton
                        color="inherit"
                        onClick={toDarkMode}
                        onTouchStart={() => setIsTouched(true)}
                        onTouchEnd={() => setIsTouched(false)}
                        onTouchCancel={() => setIsTouched(false)}
                        sx={{
                            transition: 'all 0.3s ease',
                            padding: '12px',
                            bgcolor: isTouched ? 'rgba(255,255,255,0.1)' : 'transparent',
                            ...(isTouched && {
                                transform: 'rotate(180deg)',
                            }),
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                transform: 'rotate(180deg)',
                            },
                        }}
                    >
                        <DarkModeIcon sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}