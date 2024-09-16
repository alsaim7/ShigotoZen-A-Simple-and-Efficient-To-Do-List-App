import { useState, useEffect } from "react"
import { v4 as uuid } from 'uuid'
import Todolistitem from "./Todolistitem";
import List from '@mui/material/List';
import TodolistForm from "./TodolistForm";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// const initialList = [
//     { id: uuid(), task: 'do coding practice', completed: false },
//     { id: uuid(), task: 'do coding practice', completed: false },
//     { id: uuid(), task: 'do coding practice', completed: true },
//     { id: uuid(), task: 'do coding practice', completed: false }
// ]

const initialData = () => {
    const data = JSON.parse(localStorage.getItem('todo'))
    if (!data) {
        return []
    } else {
        return data
    }
}


export default function TodoList() {
    const [todo, setTodo] = useState(initialData)



    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo))
    }, [todo])


    const addTodo = (text) => {
        setTodo((oldTodo) => {
            return [...oldTodo, { id: uuid(), task: text, completed: false }]
        })
    }

    const deleteTask = (id) => {
        // console.log(id)
        setTodo((oldTodo) => {
            return oldTodo.filter((x) => {
                return x.id !== id
            })
        })
    }

    const checkTask = (id) => {
        // console.log(id)
        setTodo((oldTodo) => {
            return oldTodo.map((l) => {
                if (id === l.id) {
                    return { ...l, completed: !l.completed }
                }
                else {
                    return l
                }
            })
        })

    }
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',

        }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todo.map((l) => (
                    <Todolistitem l={l} key={l.id} deleteTask={deleteTask} checkTask={checkTask} />
                ))}
                <TodolistForm addTodo={addTodo} />
            </List>
        </Box>
    );
}
