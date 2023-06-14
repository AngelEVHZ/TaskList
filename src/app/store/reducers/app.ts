import { Task } from "@/interfaces/task.interface";
import { createSlice } from "@reduxjs/toolkit";
import { addTask, completeTask, unCompleteTask, editTask, setEditionMode, deleteTask } from "../thunks/app.thunk";

export interface StateThunk {
  state: { app: IAppState }
}
export interface IAppState {
  taskList: Task[];
  completedTaskList: Task[];
}

export const initialState: IAppState = {
  taskList: [],
  completedTaskList: []
};

export const appSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => { })
      .addCase(addTask.fulfilled, (state, action) => {
        state.taskList.push(action.payload);
      })
      .addCase(addTask.rejected, (state) => { });
    builder
      .addCase(completeTask.fulfilled, (state, action) => {
        state.taskList = action.payload.taskList;
        state.completedTaskList = action.payload.completedTaskList;
      });
    builder
      .addCase(unCompleteTask.fulfilled, (state, action) => {
        state.taskList = action.payload.taskList;
        state.completedTaskList = action.payload.completedTaskList;
      });
    builder
      .addCase(editTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      });
    builder
      .addCase(setEditionMode.fulfilled, (state, action) => {
        state.taskList = action.payload;
      });
    builder
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.taskList = action.payload.taskList;
        state.completedTaskList = action.payload.completedTaskList;
      });
  },
  initialState,
  name: "app",
  reducers: {},
});

export default appSlice.reducer;
