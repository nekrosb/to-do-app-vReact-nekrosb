import type { filterState, todoData } from './types';
import './App.css';
import { useEffect, useState } from 'react';
import {
  changeTodoInApi,
  deleteTodoFromApi,
  doneTodoInApi,
  fetchTodos,
} from './api';
import { Button } from './Buttons';
import { ErrorScrin } from './errorScrin';
import { FilterMenu } from './filterMenu';
import { LoaderScrin } from './loaderScrin';
import { MenuCreateTodo } from './MenuCreateTodo';
import { Todo } from './Todo';
import { useTodoStore } from './useTodoStore';

export default function App(): JSX.Element {
  const [switcher, setSwitcher] = useState('main');
  const funcToSwitch = (
    scrin: string,
    setSwitcher: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setSwitcher(scrin);
  };

  const {
    todos,
    loading,
    load,
    deleteTodo,
    doneTodo,
    changeingTodo,
    addTodo,
    deleteAllTodos,
  } = useTodoStore();
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

  useEffect(() => {
    load(errorDetect);
  }, []);

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
            onClick={() => deleteAllTodos(errorDetect)}
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
                onEdit={(): void => {
                  setActiveTodoId(t.id);
                  setSwitcher('edit');
                }}
                err={errorDetect}
              />
            );
          })}
        </div>
      )}
      {switcher === 'main' && loading && <LoaderScrin />}
      {switcher === 'create' && (
        <MenuCreateTodo
          onClose={() => funcToSwitch('main', setSwitcher)}
          err={errorDetect}
        />
      )}
      {switcher === 'edit' && activeTodoId !== null && (
        <MenuCreateTodo
          onClose={() => setSwitcher('main')}
          idTodo={activeTodoId}
          err={errorDetect}
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
