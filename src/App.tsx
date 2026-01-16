import type { todoData } from './types';
import './App.css';
import { Button } from './Buttons';
import { MenuCreateTodo } from './MenuCreateTodo';
import { Todo } from './Todo';
import { useState } from 'react';

export default function App(): JSX.Element {
  const [switcher, setSwitcher] = useState("main")
const funcToSwitch = (scrin: string, setSwitcher: React.Dispatch<React.SetStateAction<string>>) => {
  setSwitcher(scrin)
}

const [todos, setTodos] = useState<todoData[]>([{id: 11, title: 'sample todo', content: "this is a sample todo", date: "2024-10-10", done: false}, {id: 12, title: 'sample todo', content: "this is a sample todo", date: "2024-10-10", done: false}])

  return (
    <div className="main-container">
      <header>
        <h1>Todo App</h1>
{switcher === "main" && (
        <Button
        type="button"
          classss="btn btn-open"
          onClick={() => funcToSwitch("create", setSwitcher)}
          title="add todo"
        />
)}

{switcher === "main" && (
        <Button
          classss="btn btn-delete-all"
          onClick={() => console.log('clear todos')}
          title="clear todos"
        />
)}
      </header>
{switcher === "main" && (
      <div className="todos-container">
        <Todo
          todoData={{
            id: 12,
            title: 'first todo',
            content: 'this is my first todo',
            date: '2024-10-10',
            done: false,
          }}
        />
        <Todo
          todoData={{
            id: 13,
            title: 'second todo',
            content: 'this is my second todo',
            date: '2024-11-11',
            done: true,
          }}
        />
        {todos.map(t => {return (
          <Todo key={t.id} todoData={t} />
        )})}
      </div>
)}

{switcher === "create" && (
      <MenuCreateTodo onClose={() => funcToSwitch("main", setSwitcher)} setTodos={setTodos} />
)}
    </div>
  );
}
