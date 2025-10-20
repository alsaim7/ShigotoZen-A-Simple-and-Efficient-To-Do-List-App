import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function Watermark() {
  const theme = useTheme();
  return (
    <Typography
      variant="caption"
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        color: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.05rem',
        transition: 'all 0.3s ease',
      }}
    >
      Developed by Al Saim Skakeel
    </Typography>
  );
}