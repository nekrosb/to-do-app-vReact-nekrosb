import type { todoData } from './types';
import './App.css';
import { Button } from './Buttons';
import { MenuCreateTodo } from './MenuCreateTodo';
import { Todo } from './Todo';
import { useState, useEffect } from 'react';
import {
  fetchTodos,
  deleteTodoFromApi,
  doneTodoInApi,
  changeTodoInApi,
} from './api';
import { LoaderScrin } from './loaderScrin';

export default function App(): JSX.Element {
  const [switcher, setSwitcher] = useState('main');
  const funcToSwitch = (
    scrin: string,
    setSwitcher: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setSwitcher(scrin);
  };

  const [todos, setTodos] = useState<todoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

  const load = async () => {
    try {
      setLoading(true);

      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
    deleteTodoFromApi(id);
  };

  useEffect(() => {
    load();
  }, []);

  const doneTodo = async (id: number) => {
    const t: todoData[] = [...todos];
    const todo = t.find((todo) => todo.id === id);
    if (!todo) {
      return;
    }
    todo.done = !todo.done;
    await doneTodoInApi(todo);

    setTodos(t);
  };

  const changeingTodo = async (
    id: number,
    title: string,
    content: string,
    date: string,
  ) => {
    const t = [...todos];
    const aldTodo = t.find((t) => t.id === id);
    if (!aldTodo) {
      return;
    }
    aldTodo.title = title;
    aldTodo.content = content;
    aldTodo.due_date = date;

    await changeTodoInApi(aldTodo);
    setTodos(t);
  };

  return (
    <div className="main-container">
      <header>
        <h1>Todo App</h1>
        {switcher === 'main' && (
          <Button
            type="button"
            classss="btn btn-open"
            onClick={() => funcToSwitch('create', setSwitcher)}
            title="add todo"
          />
        )}

        {switcher === 'main' && !loading && (
          <Button
            type="button"
            classss="btn btn-delete-all"
            onClick={() => console.log('clear todos')}
            title="clear todos"
          />
        )}
      </header>
      {switcher === 'main' && !loading && (
        <div className="todos-container">
          {todos.map((t) => {
            return (
              <Todo
                key={t.id}
                todoData={t}
                deleteTodo={deleteTodo}
                doneTodo={doneTodo}
                onEdit={(): void => {
                  setActiveTodoId(t.id);
                  setSwitcher('edit');
                }}
              />
            );
          })}
        </div>
      )}

      {switcher === 'main' && loading && <LoaderScrin />}

      {switcher === 'create' && (
        <MenuCreateTodo
          onClose={() => funcToSwitch('main', setSwitcher)}
          setTodos={setTodos}
        />
      )}

      {switcher === 'edit' && activeTodoId !== null && (
        <MenuCreateTodo
          onClose={() => setSwitcher('main')}
          setTodos={setTodos}
          idTodo={activeTodoId}
          submit={changeingTodo}
        />
      )}
    </div>
  );
}
