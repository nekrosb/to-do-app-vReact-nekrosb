import { Button } from './Buttons';
import type { todoData } from './types';
import { useTodoStore } from './useTodoStore';

type props = {
  todoData: todoData;
  onEdit: () => void;
  err: (text: string, code: number) => void;
};

export function Todo({ todoData, onEdit, err }: props): JSX.Element {
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const doneTodo = useTodoStore((s) => s.doneTodo);

  return (
    <div className={!todoData.done ? 'todo-item' : 'todo-item completed'}>
      <ul>
        <li>
          <h3>{todoData.title}</h3>
        </li>
        <li>{todoData.content && <p>{todoData.content}</p>}</li>
        <li>{todoData.due_date && <span>{todoData.due_date}</span>}</li>
      </ul>
      <Button
        type="button"
        title={todoData.done ? 'undo' : 'done'}
        classss="btn btn-complete"
        onClick={() => doneTodo(todoData.id, err)}
      />
      <Button
        type="button"
        title="delete"
        classss="btn btn-delete"
        onClick={() => deleteTodo(todoData.id, err)}
      />

      <Button
        type="button"
        title={'edit'}
        classss="btn btn-complete"
        onClick={() => onEdit()}
      />
    </div>
  );
}
