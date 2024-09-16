import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import AddTaskIcon from '@mui/icons-material/AddTask';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import AddTaskRounded from '@mui/icons-material/AddTaskRounded';
export default function TodolistForm({ addTodo }) {
    const [text, setText] = useState('')
    const [error, setError]= useState(false)
    const changeText = (e) => {
        setText(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if (text.trim()===''){
            setError(true)
        } else {
            setError(false)
            addTodo(text)
        }
        setText('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <ListItem>
                <TextField
                    // required
                    error={error}
                    helperText={error? 'Task cannot be blank :(': null}
                    id="outlined-basic"
                    label="Add to ShigotoZen"
                    variant="outlined"
                    value={text}
                    onChange={changeText}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="createTodo"
                                    // onClick={(e) => {
                                    //     addTodo(text, e)
                                    //     setText('')
                                    // }
                                    // }
                                    // onMouseDown={handleMouseDownPassword}
                                    // onMouseUp={handleMouseUpPassword}
                                    type='submit'
                                    edge="end"
                                >
                                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                    <AddTaskRounded color={error ? 'error' : text === '' ? '' : 'primary'} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </ListItem>
        </form>
    )
}