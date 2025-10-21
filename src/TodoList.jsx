import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import Todolistitem from "./Todolistitem";
import TodolistForm from "./TodolistForm";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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

    const resetTodos = () => {
        setTodo((oldTodo) => oldTodo.map((l) => ({ ...l, completed: false })));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTodo((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)',
            padding: { xs: '80px 16px 100px', sm: '100px 24px 100px' },
            touchAction: 'none',
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 480, md: 600 },
                mb: 2,
            }}>
                <TodolistForm addTodo={addTodo} />
            </Box>
            <Box sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 480, md: 600 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={todo.map((item) => item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {todo.map((l) => (
                            <Todolistitem
                                l={l}
                                key={l.id}
                                deleteTask={deleteTask}
                                checkTask={checkTask}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
                {todo.length > 0 && (
                    <Button
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={resetTodos}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            padding: '10px 16px',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.dark',
                                bgcolor: 'primary.main',
                                color: 'white',
                                transform: 'scale(1.02)',
                            },
                            transition: 'all 0.3s ease',
                            mt: 2,
                        }}
                    >
                        Reset All Tasks
                    </Button>
                )}
            </Box>
        </Box>
    );
}