export interface Task {
    id: string;
    description: string;
    completed: boolean;
    onEditionMode: boolean;
    date: number;
}

export interface CompleteTask {
    taskList: Task[];
    completedTaskList: Task[];
}

export interface UpdateTask{
    index: number;
    description: string;
    task: Task;
}

export interface EditionModeTask{
    editionMode: boolean;
    task: Task;
}
