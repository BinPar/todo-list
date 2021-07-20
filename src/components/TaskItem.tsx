import React, { useEffect, useRef, useState } from 'react';

import { Action } from '../model';

import { taskPriorities } from '../config';

interface TaskItemProps {
  taskId?: string;
  taskIndex: number;
  priority: number;
  title: string;
  completed?: boolean;
  onCancelNew?: () => void;
  dispatch: (action: Action) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  taskId,
  taskIndex,
  priority,
  title,
  onCancelNew,
  completed,
  dispatch,
}) => {
  const itemRef = useRef<HTMLLIElement>();
  const inputRef = useRef<HTMLInputElement>();
  const selectRef = useRef<HTMLSelectElement>();
  const [currentPriority, setCurrentPriority] = useState<number>(priority);

  const [isEditing, setIsEditing] = useState<boolean>(taskId === 'new');

  useEffect(() => {
    if (taskId === 'new' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.setProperty('--task-index', `${taskIndex}`);
    }
  }, [taskIndex]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef.current]);

  const onDelete = (): void => {
    if (onCancelNew) {
      onCancelNew();
    } else {
      dispatch({
        type: 'remove',
        id: taskId,
      });
    }
  };

  const onEdit = (): void => {
    setIsEditing(true);
  };

  const onCancel = (): void => {
    if (onCancelNew) {
      onCancelNew();
    } else {
      if (inputRef.current) {
        inputRef.current.value = title;
      }
      setIsEditing(false);
    }
  };

  const onSave = (): void => {
    if (inputRef.current) {
      if (taskId !== 'new') {
        dispatch({
          type: 'edit',
          id: taskId,
          title: inputRef.current.value,
        });
        setIsEditing(false);
      } else if (inputRef.current?.value.trim()) {
        dispatch({
          type: 'add',
          task: {
            title: inputRef.current.value.trim(),
            priority: parseInt(selectRef.current.value, 10),
          },
        });
        if (onCancelNew) {
          onCancelNew();
        }
      }
    }
  };

  const onChangePriority = (): void => {
    if (selectRef.current?.value) {
      const newPriority = parseInt(selectRef.current.value, 10);
      setCurrentPriority(newPriority);
      if (taskId !== 'new') {
        dispatch({
          type: 'setPriority',
          id: taskId,
          priority: newPriority,
        });
      }
    }
  };

  const onToggleTask = (): void => {
    dispatch({
      type: 'toggleTask',
      id: taskId,
    });
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave();
  };

  return (
    <li
      ref={itemRef}
      id={taskId}
      className={`taskItem ${taskPriorities[priority]}${completed ? ' done' : ''}`}
    >
      <form onSubmit={onSubmit}>
        <fieldset>
          <div className="info">
            <label className="checkbox" htmlFor="check">
              <input type="checkbox" name="check" checked={completed} onClick={onToggleTask} />
              <span />
            </label>
            {isEditing ? (
              <label htmlFor="title">
                <input
                  ref={inputRef}
                  type="text"
                  name="title"
                  defaultValue={title}
                  className="title editable"
                />
              </label>
            ) : (
              <p className="title">{title}</p>
            )}
          </div>
          <div className="actions">
            <div className="prioritySelector">
              <select
                ref={selectRef}
                onChange={onChangePriority}
                value={`${currentPriority}`}
              >
                <option value="2">Alta</option>
                <option value="1">Media</option>
                <option value="0">Baja</option>
              </select>
            </div>
            {isEditing ? (
              <>
                <button onClick={onSave} type="button" title="Guardar">
                  Guardar
                </button>
                <span className="divider vertical" />
                <button onClick={onCancel} type="button" title="Cancelar">
                  Cancelar
                </button>
              </>
            ) : (
              <button onClick={onEdit} type="button">
                Editar
              </button>
            )}
            {!isEditing && (
              <>
                <span className="divider vertical" />
                <button onClick={onDelete} type="button">
                  Eliminar
                </button>
              </>
            )}
          </div>
        </fieldset>
      </form>
    </li>
  );
};

export default TaskItem;
