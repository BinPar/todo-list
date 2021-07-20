/**
 * Orden:
 * - La pendientes siempre en la parte superior
 * - Más prioridad a menos
 */

import { ListState } from "../model";

const sortTasks = (state: ListState): ListState => {
  const { tasks } = state;
  tasks.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.priority - a.priority;
    }
    if (b.completed) {
      return -1;
    }
    return 1;
  });
  return {
    ...state,
    tasks,
  };
};

export default sortTasks;