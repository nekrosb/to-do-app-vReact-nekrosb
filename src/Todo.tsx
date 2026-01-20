import { Button } from './Buttons';
import type { todoData } from './types';

type props = {
  todoData: todoData;
  deleteTodo: (id: number) => void;
};

export function Todo({ todoData, deleteTodo }: props): JSX.Element {
  return (
    <div className={!todoData.done ? 'todo-item' : 'todo-item completed'}>
      <h3>{todoData.title}</h3>
      {todoData.content && <p>{todoData.content}</p>}
      {todoData.date && <span>{todoData.date}</span>}
      <Button
        title={todoData.done ? 'undo' : 'done'}
        classss="btn btn-complete"
        onClick={() => console.log('todo done')}
      />
      <Button
        title="delete"
        classss="btn btn-delete"
        onClick={() => deleteTodo(todoData.id)}
      />
    </div>
  );
}
