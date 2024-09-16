import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Todolistitem({l, deleteTask, checkTask}){

        const labelId = `checkbox-list-label-${l.id}`;

                return (
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments" onClick={()=>deleteTask(l.id)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={()=>checkTask(l.id)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={l.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={l.task} />
                        </ListItemButton>
                    </ListItem>
                );
            }