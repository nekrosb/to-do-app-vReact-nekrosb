import type { todoData } from './types';
import './App.css';
import { Button } from './Buttons';
import { MenuCreateTodo } from './MenuCreateTodo';
import { Todo } from './Todo';
import { useState, useEffect } from 'react';
import { fetchTodos, deleteTodoFromApi } from './api';

export default function App(): JSX.Element {
  const [switcher, setSwitcher] = useState("main")
const funcToSwitch = (scrin: string, setSwitcher: React.Dispatch<React.SetStateAction<string>>) => {
  setSwitcher(scrin)
}

const [todos, setTodos] = useState<todoData[]>([])
const [loading, setLoading] = useState<boolean>(true)

const load = async () => {
  try {
    setLoading(true)
    const data = await fetchTodos()
    setTodos(data)
  } catch (error) {
    throw new Error(`you have an error: ${error}`)
  }
  finally {
    setLoading(false)
  }

}

const deleteTodo = (id: number) => {
  setTodos((t) => t.filter(todo => todo.id !== id))
  deleteTodoFromApi(id)
}

useEffect(() => {load()}, [])

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
        type="button"
          classss="btn btn-delete-all"
          onClick={() => console.log('clear todos')}
          title="clear todos"
        />
)}
      </header>
{switcher === "main" && (
      <div className="todos-container">
        {todos.map(t => {return (
          <Todo key={t.id} todoData={t} deleteTodo={deleteTodo} />
        )})}
      </div>
)}

{switcher === "create" && (
      <MenuCreateTodo onClose={() => funcToSwitch("main", setSwitcher)} setTodos={setTodos} />
)}
    </div>
  );
}

