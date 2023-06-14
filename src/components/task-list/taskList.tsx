import { Grid} from '@mui/material';
import TaskCardList from './taskCardList';
import { ListType } from '@/interfaces/listTypes.enum';
export default function TaskList() {

    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <TaskCardList listType={ListType.TODO} title="Tareas" cols={7} key="TODO_LIST"></TaskCardList>
                <TaskCardList listType={ListType.DONE} title="Completadas de Hoy" cols={5} key="DONE_LIST"></TaskCardList>
            </Grid>
        </>
    )
}
