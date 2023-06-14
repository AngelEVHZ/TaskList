
import { CompleteTask, EditionModeTask, Task, UpdateTask } from "@/interfaces/task.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAppState, StateThunk } from "../reducers/app";
import { cloneDeep } from "lodash";
import moment from "moment";


export const addTask = createAsyncThunk<Task, string>("app/addTask", (description: string) => {
  const newTask: Task = {
    id: Math.random() + "",
    description: description,
    completed: false,
    onEditionMode: false,
    date: moment.now()
  };
  return newTask;
});


export const completeTask = createAsyncThunk<CompleteTask, Task, StateThunk>("app/completeTask", (task: Task, thunkAPI) => {
  const state: IAppState = thunkAPI.getState().app;

  const taskList = [...state.taskList];
  const completedTaskList = [...state.completedTaskList];

  changeElementFromList(taskList, completedTaskList, true, task);
  return { taskList: calcelEditionMode(taskList), completedTaskList };
});

export const unCompleteTask = createAsyncThunk<CompleteTask, Task, StateThunk>("app/unCompleteTask", (task: Task, thunkAPI) => {
  const state: IAppState = thunkAPI.getState().app;

  const taskList = [...state.taskList];
  const completedTaskList = [...state.completedTaskList];

  changeElementFromList(completedTaskList, taskList, false, task);
  return { taskList: calcelEditionMode(taskList), completedTaskList };
});

export const editTask = createAsyncThunk<Task[], UpdateTask, StateThunk>("app/editTask", (updateData: UpdateTask, thunkAPI) => {
  const state: IAppState = thunkAPI.getState().app;
  const taskList = cloneDeep(state.taskList);

  const taskFound = taskList.find((item) => item.id === updateData.task.id);
  if (taskFound) {
    taskFound.description = updateData.description;
    taskFound.onEditionMode = false;
  }
  return taskList;
});

export const setEditionMode = createAsyncThunk<Task[], EditionModeTask, StateThunk>("app/setEditionMode", (data: EditionModeTask, thunkAPI) => {
  const state: IAppState = thunkAPI.getState().app;
  const taskList = cloneDeep(state.taskList);

  const taskFound = taskList.find((item) => item.id === data.task.id);
  if (taskFound)
    taskFound.onEditionMode = data.editionMode;
  return taskList;
});


export const deleteTask = createAsyncThunk<CompleteTask, Task, StateThunk>("app/deleteTask", (task: Task, thunkAPI) => {
  const state: IAppState = thunkAPI.getState().app;

  const taskList = [...state.taskList];
  const completedTaskList = [...state.completedTaskList];


  deleteTaskFromList(task.completed ? completedTaskList : taskList, task);

  return { taskList: calcelEditionMode(taskList), completedTaskList };
});

const changeElementFromList = (from: Task[], to: Task[], condition: boolean, task: Task) => {
  const index = from.indexOf(task);

  const item = { ...from[index] };
  if (item) {
    item.completed = !item.completed;
    item.onEditionMode = false;

    if (item.completed === condition) {
      to.push(item);
      from.splice(index, 1);
    }
  }
}

const deleteTaskFromList = (list: Task[], task: Task) => {
  const index = list.indexOf(task);

  const item = { ...list[index] };
  if (item) {
    list.splice(index, 1);
  }
}


const calcelEditionMode = (list: Task[]) => {
  return list.map(item => ({ ...item, onEditionMode: false }));
}