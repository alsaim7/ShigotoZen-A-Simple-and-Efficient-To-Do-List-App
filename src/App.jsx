import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import TodoList from './TodoList';
import Navbar from './Navbar';
import Watermark from './Watermark';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

const initialData = () => {
  const savedMode = JSON.parse(localStorage.getItem('darkmode'));
  return savedMode !== null ? savedMode : false;
}

function App() {
  const [darkMode, setDarkMode] = useState(initialData);

  const toDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#1E293B',
        paper: '#2D3748'
      },
      primary: {
        main: '#60A5FA',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }
        }
      }
    }
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#F8FAFC',
        paper: '#FFFFFF'
      },
      primary: {
        main: '#3B82F6',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }
        }
      }
    }
  });

  useEffect(() => {
    localStorage.setItem('darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="min-h-screen">
        <Navbar toDarkMode={toDarkMode} />
        <TodoList />
        <Watermark />
      </div>
    </ThemeProvider>
  );
}

export default App;