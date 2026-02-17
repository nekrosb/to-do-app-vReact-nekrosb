import './App.css';
import { useActionState, type Dispatch, type SetStateAction } from 'react';
import { Button } from './Buttons';
import { Input } from './Input';
import type { todoData } from './types';
import { useTodoStore } from './useTodoStore';

type Props = {
  onClose?: () => void;
  idTodo?: number;
  err: (text: string, code?: number) => void;
};

type FormState = {
  error?: string;
};

export function MenuCreateTodo({ onClose, idTodo, err }: Props) {
  const addTodo = useTodoStore((s) => s.addTodo);
  const changeingTodo = useTodoStore((s) => s.changeingTodo);

  const [state, createTodo, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const date = formData.get('date') as string;

      if (!title || !content || !date) {
        return { error: 'you must fill all fields' };
      }

      if (idTodo !== undefined) {
        await changeingTodo(idTodo, title, content, date, err);
      } else {
        await addTodo(title, content, date, err);
      }
      onClose?.();
      return {};
    },
    {},
  );

  return (
    <form className="create-menu-content" action={createTodo}>
      <h2>Create New Todo</h2>

      <Input
        nameInput="title"
        typeInput="text"
        classss="input-field"
        placeholderInput="Title input"
      />

      <Input
        nameInput="content"
        typeInput="text"
        classss="input-field"
        placeholderInput="Content input"
      />

      <Input
        nameInput="date"
        typeInput="date"
        classss="input-date"
        placeholderInput="date input"
      />

      {state.error && <p className="error">{state.error}</p>}

      <div className="create-menu-buttons">
        <Button
          type="submit"
          classss="btn btn-create"
          title={isPending ? 'Creating...' : 'Create Todo'}
          onClick={() => {}}
        />

        <Button
          classss="btn btn-close"
          type="button"
          onClick={onClose ?? (() => {})}
          title="Cancel"
        />
      </div>
    </form>
  );
}
