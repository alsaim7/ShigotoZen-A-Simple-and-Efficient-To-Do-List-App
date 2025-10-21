import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export default function Todolistitem({ l, deleteTask, checkTask }) {
    const labelId = `checkbox-list-label-${l.id}`;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: l.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <ListItem
            ref={setNodeRef}
            style={style}
            secondaryAction={
                <IconButton
                    edge="end"
                    onClick={() => deleteTask(l.id)}
                    sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: '#EF4444',
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            }
            disablePadding
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': {
                    borderBottom: 'none',
                },
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <ListItemButton
                onClick={() => checkTask(l.id)}
                dense
                sx={{ padding: '12px 8px' }}
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={l.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        sx={{
                            '&.Mui-checked': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    id={labelId}
                    primary={l.task}
                    sx={{
                        textDecoration: l.completed ? 'line-through' : 'none',
                        color: l.completed ? 'text.secondary' : 'text.primary',
                        transition: 'all 0.3s ease',
                    }}
                />
                <IconButton
                    {...attributes}
                    {...listeners}
                    sx={{
                        cursor: 'grab',
                        '&:active': {
                            cursor: 'grabbing',
                        },
                    }}
                >
                    <DragHandleIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    );
}