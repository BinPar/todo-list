import React from 'react';

type Priority = 'high' | 'middle' | 'low';

interface ToDoItemProps {
  priority: Priority;
  title: string;
  isDone?: boolean;
}

const ToDoIte: React.FC<ToDoItemProps> = ({
  priority,
  title,
  isDone
}) => {
  return (
    <li className={`item ${priority}${isDone ? ' done' : ''}`}>
      <div className="checkWrapper">
        <input type="checkbox" />
        <span />
      </div>
      <p className="title">{title}</p>
    </li>
  );
};

export default ToDoIte;