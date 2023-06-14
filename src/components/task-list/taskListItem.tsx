import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Task } from '@/interfaces/task.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { editTask, setEditionMode, deleteTask } from '@/app/store/thunks/app.thunk';
import { useAppDispatch } from '@/app/store/hooks/storeHook';
import SaveIcon from '@mui/icons-material/Save';
import { ListType } from '@/interfaces/listTypes.enum';
import moment from 'moment';

export interface TaskListItemProps {
    task: Task;
    index: number;
    label: string;
    listType: ListType;
    disableEdition?: boolean;
    onClick: () => void;
}

export default function TaskListItem(props: TaskListItemProps) {
    const dispatch = useAppDispatch();
    const inputRef: any = useRef();

    const [editionDescription, setEditionDescription] = useState('');
    const { task, label, disableEdition, index } = props;

    const labelId = `${label}-${task.id}`;


    const onClickTest = (event: { detail: number }) => {
        if (disableEdition || event.detail != 2) return;

        setEditionDescription(task.description);
        dispatch(setEditionMode({ task, editionMode: true }));

    }

    useEffect(() => {
        if (!task.onEditionMode) return;

        if (inputRef?.current) {
            inputRef.current.focus();
        }

    }, [task.onEditionMode])

    const saveEditTask = () => {
        dispatch(editTask({ index, task, description: editionDescription }));
    }

    const renderText = () => {
        if (task.onEditionMode)
            return (
                <Box
                    component="form"
                    sx={{
                        width: "100%",
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveEditTask();
                    }}
                >
                    <TextField id="filled-basic"
                        variant="filled"
                        value={editionDescription}
                        fullWidth
                        onChange={e => setEditionDescription(e.target.value)}
                        inputRef={inputRef} />
                </ Box>
            );

        return <ListItemText id={labelId} primary={`${task.description}`} secondary={moment(task.date).format('MMMM Do YYYY, h:mm:ss a')} onClick={onClickTest} />
    }

    const renderActions = () => {
        if (task.onEditionMode)
            return (<IconButton edge="end" aria-label="save" onClick={saveEditTask}> <SaveIcon />   </IconButton>);
        return (<IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTask(task))}> <DeleteIcon />   </IconButton>);
    }
    return (
        <ListItem
            key={task.id}

            secondaryAction={renderActions()}
            onSubmit={(e) => {
                e.preventDefault();
                saveEditTask()
            }}
        >

            <ListItemIcon>
                <Checkbox
                    onClick={() => props.onClick()}
                    edge="start"
                    checked={task.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            </ListItemIcon>
            {renderText()}

        </ListItem>
    )
}
