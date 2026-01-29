import type { todoData, filterState } from './types';
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
import { FilterMenu } from './filterMenu';
import { ErrorScrin } from './errorScrin';

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
  const [filter, setfilter] = useState<filterState>({
    date: false,
    name: false,
    done: false,
    unDone: false,
  });

  const changeFilter = (filterName: string) => {
    setfilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: !prevFilter[filterName as keyof filterState],
    }));
  };

  const load = async () => {
    try {
      setLoading(true);

      const data = await fetchTodos(errorDetect);
      setTodos(data);
    } catch (error) {
      errorDetect(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
    try {
      deleteTodoFromApi(id, errorDetect);
    } catch (error) {
      errorDetect(`${error}`);
    }
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

    try {
      await doneTodoInApi(todo, errorDetect);
    } catch (error) {
      errorDetect(`${error}`);
    }

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

    try {
      await changeTodoInApi(aldTodo, errorDetect);
      setTodos(t);
    } catch (error) {
      errorDetect(`${error}`);
    }
  };

  const filteredTodos: todoData[] = todos
    .filter((todo) => {
      if (filter.done && todo.done) return true;
      if (filter.unDone && !todo.done) return true;

      if (!filter.done && !filter.unDone) return true;

      return false;
    })
    .sort((a, b) => {
      if (filter.date) {
        const aHasDate = Boolean(a.due_date);
        const bHasDate = Boolean(b.due_date);

        if (!aHasDate && bHasDate) return 1;
        if (aHasDate && !bHasDate) return -1;

        if (!aHasDate && !bHasDate) return 0;

        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }

      if (filter.name) {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  const [errorText, setErrorText] = useState<string>('');

  const errorDetect = (text: string, code?: number) => {
    if (code) {
      setErrorText(`${code} - ${text}`);
    } else {
      setErrorText(`${text}`);
    }

    funcToSwitch('error', setSwitcher);
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

        {switcher === 'main' && (
          <Button
            type="button"
            classss="btn btn-open"
            onClick={() => funcToSwitch('filter', setSwitcher)}
            title="filter"
          />
        )}
      </header>
      {switcher === 'main' && !loading && (
        <div className="todos-container">
          {filteredTodos.map((t) => {
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
      {switcher === 'filter' && (
        <FilterMenu
          click={changeFilter}
          filter={filter}
          onClose={() => setSwitcher('main')}
        />
      )}
      {}{' '}
      {switcher === 'error' && (
        <ErrorScrin errorMsg={errorText} onClose={() => setSwitcher('main')} />
      )}
    </div>
  );
}
