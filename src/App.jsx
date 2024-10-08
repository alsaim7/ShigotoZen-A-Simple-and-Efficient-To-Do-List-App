import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import TodoList from './TodoList';
import TodolistForm from './TodolistForm';
import Navbar from './Navbar';
import Watermark from './Watermark';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useState, useEffect } from 'react';


const initialData = () => {
  const savedMode = JSON.parse(localStorage.getItem('darkmode'));
  return savedMode !== null ? savedMode : false;
}

function App() {
  const [darkMode, setDarkMode] = useState(initialData)
  const toDarkMode = () => {
    setDarkMode(!darkMode)
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });


  useEffect(() => {
    localStorage.setItem('darkmode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Navbar toDarkMode={toDarkMode} />
        <TodoList />
        <Watermark />
      </ThemeProvider>
    </>
  )
}

export default App
