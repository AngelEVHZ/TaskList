

import List from '@mui/material/List';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/storeHook';
import { completeTask, unCompleteTask } from '@/app/store/thunks/app.thunk';
import {  Card, CardHeader, Divider, Grid } from '@mui/material';
import { Task } from '@/interfaces/task.interface';
import TaskListItem from './taskListItem';
import { ListType } from '@/interfaces/listTypes.enum';


interface TaskCardListProps {
    listType: ListType;
    title: string;
    cols: number;
}
export default function TaskCardList(props: TaskCardListProps) {

    const { listType, title, cols } = props;
    const dispatch = useAppDispatch();
    const { taskList, completedTaskList } = useAppSelector((state) => ({
        ...state.app,
    }));


    const isTodoList = listType === ListType.TODO;
    const list = isTodoList ? taskList : completedTaskList;
    const onCheckFunction = isTodoList ? completeTask : unCompleteTask;
    const label = isTodoList ? "todo-checkbox-list" : "done-checkbox-list";

    return (

        <Grid item md={cols} xs={12}>
            <Card sx={{ height: 540, paddingBottom: "50px" }}>
                <CardHeader
                    sx={{ px: 2, py: 1 }}
                    avatar={
                        <></>
                    }
                    title={title}
                    subheader=""
                />
                <Divider />
                <List
                    dense={false}
                    sx={{
                        width: '100%',
                        height: "100%",
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                    }}
                >
                    {list.map((task: Task, index) => {
                        return (
                            <TaskListItem
                                listType={listType}
                                disableEdition={!isTodoList}
                                key={listType + index}
                                task={task}
                                index={index}
                                label={label}
                                onClick={() => dispatch(onCheckFunction(task))}></TaskListItem>
                        );
                    })}
                </List>
            </Card>
        </Grid>
    )
}
