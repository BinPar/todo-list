import { Action, ListState } from '../model';

import addTask from './addTask';
import sortTasks from './sortTasks';

const taskReducer = (state: ListState, action: Action): ListState => {
  switch (action.type) {
    case 'add':
      return addTask(state, action.task);
    case 'setPriority': {
      const task = state.tasks.find((t) => t.id === action.id);
      if (task) {
        task.priority = action.priority;
        return sortTasks(state);
      }
      return state;
    }
    case 'edit': {
      const task = state.tasks.find((t) => t.id === action.id);
      if (task) {
        task.title = action.title;
      }
      return state;
    }
    case 'remove': {
      const newTasksList = state.tasks.filter((t) => t.id !== action.id);
      return {
        ...state,
        tasks: newTasksList,
      };
    }
    case 'toggleTask': {
      const newTasksList = state.tasks.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t,
      );
      return sortTasks({
        ...state,
        tasks: newTasksList,
      });
    }
    default:
      return state;
  }
};

export default taskReducer;
