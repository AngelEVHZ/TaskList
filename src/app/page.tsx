"use client";
import TaskCreator from '@/components/task-creator/taskCreator';
import TaskList from '@/components/task-list/taskList';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function Home() {



  return (
    <>
      <Provider store={store}>
        <TaskCreator></TaskCreator>
        <TaskList></TaskList>
      </Provider>
    </>
  )
}
