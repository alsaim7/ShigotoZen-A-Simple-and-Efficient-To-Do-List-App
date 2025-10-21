import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import Todolistitem from "./Todolistitem";
import TodolistForm from "./TodolistForm";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100, // Brief delay to distinguish from scroll
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
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px)',
            padding: { xs: '80px 16px 100px', md: '100px 24px 100px' },
            touchAction: 'none', // Prevent browser scrolling during drag
        }}>
            <List sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 480, md: 600 },
                bgcolor: 'background.paper',
                borderRadius: '12px',
                padding: '16px',
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
                <TodolistForm addTodo={addTodo} />
            </List>
        </Box>
    );
}