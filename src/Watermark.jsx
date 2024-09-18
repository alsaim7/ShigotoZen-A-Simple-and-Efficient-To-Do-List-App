import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles'; 


export default function Watermark() {
    const theme = useTheme()
    return (
        <Typography 
          variant="overline" 
          gutterBottom 
          sx={{ 
            display: 'block',
            // backgroundColor: 'white',
            padding: '10px',
            position: 'fixed',
            bottom: '10px', 
            left: '50%',             
            transform: 'translateX(-50%)',  
            color: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.3)'  
              // : 'rgba(255, 255, 255, 0.3)',       
              : 'rgba(0, 0, 0, 0.3)',       
            // backgroundColor: theme.palette.mode === 'dark' 
            //   ? 'black'  
            //   : 'white',       
            zIndex: 1000, 
            whiteSpace: 'nowrap',      
            textAlign: 'center',
          }}
        >
            Developed by: Al Saim Skakeel
        </Typography>
    )
}