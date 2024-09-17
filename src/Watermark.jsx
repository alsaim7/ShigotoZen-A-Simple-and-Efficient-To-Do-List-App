import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Watermark() {
    return (
        <Typography variant="overline" gutterBottom sx={{ display: 'block', position: 'fixed',bottom: '10px', color: 'rgba(0, 0, 0, 0.5)', allignitems: 'center', zIndex: 1000, left: '20%'}}>
            Developed by: Al Saim Skakeel
        </Typography>
    )
}