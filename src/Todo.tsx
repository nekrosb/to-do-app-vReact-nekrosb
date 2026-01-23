import { Button } from './Buttons';
import type { todoData } from './types';

type props = {
  todoData: todoData;
  deleteTodo: (id: number) => void;
};

export function Todo({ todoData, deleteTodo }: props): JSX.Element {
  return (
    <div className={!todoData.done ? 'todo-item' : 'todo-item completed'}>
      <ul>
        <li>
      <h3>{todoData.title}</h3>
      </li>
      <li>
      {todoData.content && <p>{todoData.content}</p>}
      </li>
      <li>
      {todoData.due_date && <span>{todoData.due_date}</span>}
      </li>
      </ul>
      <Button
      type='button'
        title={todoData.done ? 'undo' : 'done'}
        classss="btn btn-complete"
        onClick={() => console.log('todo done')}
      />
      <Button
      type='button'
        title="delete"
        classss="btn btn-delete"
        onClick={() => deleteTodo(todoData.id)}
      />
    </div>
  );
}
