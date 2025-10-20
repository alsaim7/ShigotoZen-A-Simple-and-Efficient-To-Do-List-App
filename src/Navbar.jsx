import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import logo from '/favicon.png'

export default function Navbar({ toDarkMode }) {
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
                        sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'rotate(180deg)',
                            },
                        }}
                    >
                        <DarkModeIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}