import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Typography from '@mui/material/Typography';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export default function Todolistitem({ l, deleteTask, checkTask }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: l.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.2s ease',
        opacity: isDragging ? 0.6 : 1,
        touchAction: 'manipulation',
        boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
        transformOrigin: 'center',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    };

    return (
        <Card
            ref={setNodeRef}
            sx={{
                ...style,
                borderRadius: '12px',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                },
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    '&:last-child': { pb: '12px' },
                }}
            >
                <Checkbox
                    checked={l.completed}
                    onChange={() => checkTask(l.id)}
                    sx={{
                        color: 'text.secondary',
                        '&.Mui-checked': { color: 'primary.main' },
                        padding: '8px',
                    }}
                />
                <Typography
                    sx={{
                        flexGrow: 1,
                        textDecoration: l.completed ? 'line-through' : 'none',
                        color: l.completed ? 'text.secondary' : 'text.primary',
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontFamily: '"Inter", "Roboto", sans-serif',
                    }}
                >
                    {l.task}
                </Typography>
                <IconButton
                    {...attributes}
                    {...listeners}
                    sx={{
                        cursor: 'grab',
                        '&:active': { cursor: 'grabbing' },
                        padding: '12px',
                        '& svg': { fontSize: '1.5rem' },
                    }}
                >
                    <DragHandleIcon />
                </IconButton>
                <IconButton
                    onClick={() => deleteTask(l.id)}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: '#EF4444',
                            transform: 'scale(1.1)',
                        },
                        padding: '12px',
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
}