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
    const [isTouched, setIsTouched] = useState(false);

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
        setIsTouched(false);
    };

    const sensors = useSensors(
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100, // Delay before drag starts
                tolerance: 8, // Small movement before it's recognized as drag
            },
        }),
        useSensor(PointerSensor)
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
            padding: { xs: '80px 16px 16px', sm: '100px 24px 24px' }, // Reduced bottom padding
            overflowY: 'auto', // Enable scrolling for entire page
            width: '100%',
            boxSizing: 'border-box',
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
                flexGrow: 1,
                overflowY: 'auto', // Scroll for list container
                paddingBottom: '64px', // Space for reset button
            }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={() => (document.body.style.overflow = 'hidden')}
                    onDragCancel={() => (document.body.style.overflow = 'auto')}
                    onDragEnd={(event) => {
                        document.body.style.overflow = 'auto';
                        handleDragEnd(event);
                    }}
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
                        onTouchStart={() => setIsTouched(true)}
                        onTouchEnd={() => setIsTouched(false)}
                        onTouchCancel={() => setIsTouched(false)}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            padding: '10px 16px',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            bgcolor: isTouched ? 'primary.main' : 'transparent',
                            transform: isTouched ? 'scale(1.02)' : 'none',
                            '@media (hover: hover)': {
                                '&:hover': {
                                    borderColor: 'primary.dark',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    // transform: 'scale(1.02)',
                                },
                            },
                            '@media (hover: none)': {
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    transform: 'none',
                                },
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