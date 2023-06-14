
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useAppDispatch } from "../../app/store/hooks/storeHook";
import { addTask } from '@/app/store/thunks/app.thunk';
import { Grid, Box, Button } from '@mui/material';

export default function TaskCreator() {
    const dispatch = useAppDispatch();
    const [taskDescription, setTaskDescription] = useState('');


    const createTask = () => {
        if (taskDescription.length <= 0) return;

        dispatch(addTask(taskDescription));
        setTaskDescription("");
    }

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault();
                    createTask()
                }}
                sx={{ flexGrow: 1, marginBottom: "20px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField id="filled-basic" label="Task..." variant="filled"
                            fullWidth
                            value={taskDescription}
                            onChange={e => setTaskDescription(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" size="large" onClick={createTask}>
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
