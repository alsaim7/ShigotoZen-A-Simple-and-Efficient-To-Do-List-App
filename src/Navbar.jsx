import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkMode from '@mui/icons-material/DarkMode';
import { useState } from 'react';


export default function Navbar({toDarkMode}) {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent:'center',
            position: 'fixed',
            zIndex: 2000
        }}>
            <AppBar position="static"
            sx={{
                width: '450px',
                boxShadow: 'none'
            }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="span"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 4,
                            display: { xs: 'flex', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ShigotoZen
                    </Typography>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                        onClick={toDarkMode}
                    >
                        <DarkMode />
                    </IconButton>
                    {/* <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        ShigotoZen
                    </Typography> */}
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}