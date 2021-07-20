import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Action, ListState } from "../model";

import tasksReducer from '../utils/tasksReducer';

const itemKey = 'todo-list-item';

const defaultState: ListState = {
  tasks: [],
  onlyCompleted: false,
};

let state: ListState;

const increaseVersion = (current: number): number => current + 1;

const updaters = new Array<Dispatch<SetStateAction<number>>>();

const getState = (): ListState => {
  if (!state) {
    if (typeof window === 'object') {
      const item = window.localStorage.getItem(itemKey);
      if (item) {
        try {
          const data = JSON.parse(item) as ListState;
          state = data;
          return state;
        } catch {
          // No need
        }
      }
    }
    return defaultState;
  }
  return state;
}

const save = (): void => {
  if (typeof window === 'object') {
    const data = JSON.stringify(state);
    // Normalmente será async
    window.localStorage.setItem(itemKey, data);
  }
};

const dispatch = (action: Action): void => {
  state = tasksReducer(getState(), action);
  save();
  updaters.forEach((updater) => {
    try {
      updater(increaseVersion);
    } catch {
      // Won't need it
    }
  })
};

const useTasks = (): [ListState, (action: Action) => void] => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    updaters.push(setVersion);
    return (): void => {
      updaters.splice(updaters.findIndex(updater => updater === setVersion), 1);
    };
  }, []);

  return [getState(), dispatch];
};

export default useTasks;
