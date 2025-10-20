import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import Todolistitem from "./Todolistitem";
import TodolistForm from "./TodolistForm";
import List from '@mui/material/List';
import Box from '@mui/material/Box';

const initialData = () => {
    const data = JSON.parse(localStorage.getItem('todo'));
    return data || [];
};

export default function TodoList() {
    const [todo, setTodo] = useState(initialData);

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo));
    }, [todo]);

    const addTodo = (text) => {
        setTodo((oldTodo) => [
            ...oldTodo,
            { id: uuid(), task: text, completed: false }
        ]);
    };

    const deleteTask = (id) => {
        setTodo((oldTodo) => oldTodo.filter((x) => x.id !== id));
    };

    const checkTask = (id) => {
        setTodo((oldTodo) => oldTodo.map((l) =>
            l.id === id ? { ...l, completed: !l.completed } : l
        ));
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px)',
            padding: { xs: '80px 16px 100px', md: '100px 24px 100px' },
        }}>
            <List sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 480, md: 600 },
                bgcolor: 'background.paper',
                borderRadius: '12px',
                padding: '16px',
            }}>
                {todo.map((l) => (
                    <Todolistitem
                        l={l}
                        key={l.id}
                        deleteTask={deleteTask}
                        checkTask={checkTask}
                    />
                ))}
                <TodolistForm addTodo={addTodo} />
            </List>
        </Box>
    );
}