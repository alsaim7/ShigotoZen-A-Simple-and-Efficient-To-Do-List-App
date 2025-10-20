import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

export default function TodolistForm({ addTodo }) {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    const changeText = (e) => {
        setText(e.target.value);
        if (error && e.target.value.trim() !== '') {
            setError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            setError(true);
        } else {
            setError(false);
            addTodo(text);
            setText('');
        }
    };

    return (
        <ListItem sx={{ padding: '16px 8px' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    error={error}
                    helperText={error ? 'Task cannot be blank :(' : null}
                    label="Add new task"
                    variant="outlined"
                    value={text}
                    onChange={changeText}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    type="submit"
                                    edge="end"
                                    sx={{
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    <AddTaskRoundedIcon
                                        color={error ? 'error' : text === '' ? 'disabled' : 'primary'}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </ListItem>
    );
}