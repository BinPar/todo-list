export interface Task {
  id: string;
  title: string;
  priority: number;
  completed: boolean;
}

export interface ListState {
  onlyCompleted: boolean;
  tasks: Task[];
}

export type NewTask = Omit<Task, 'id', 'completed'>;

export interface BasicAction {
  type: string;
}

export interface Add extends BasicAction {
  type: 'add';
  task: NewTask;
}

export interface Remove extends BasicAction {
  type: 'remove';
  id: string;
}

export interface Edit extends BasicAction {
  type: 'edit';
  id: string;
  title: string;
}

export interface SetPriority extends BasicAction {
  type: 'setPriority';
  id: string;
  priority: number;
}

export interface ToggleTask extends BasicAction {
  type: 'toggleTask';
  id: string;
}

export type Action = Add | Remove | Edit | SetPriority | ToggleTask;

