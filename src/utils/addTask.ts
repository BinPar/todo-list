import getId from 'shortid';

import { ListState, NewTask, Task } from "../model";
import sortTasks from './sortTasks';

const addTask = (state: ListState, newTask: NewTask): ListState => {
  const task: Task = {
    id: getId(),
    completed: false,
    ...newTask,
  };
  state.tasks.push(task);
  return sortTasks(state);
};

export default addTask;
