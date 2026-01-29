import type { todoData, todoContent } from './types';

const apiUrlForTodos = 'https://api.todos.in.jt-lab.ch/todos';

export async function fetchTodos(): Promise<todoData[]> {
  try {
    const response = await fetch(apiUrlForTodos);
    if (!response.ok) {
      throw new Error(`Error fetching todos: ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Fetch Todos Error:', error);
    throw error;
  }
}

export async function postTodo(todo: todoContent): Promise<todoData> {
  try {
    const response = await fetch(apiUrlForTodos, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        prefer: 'return=representation',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error(`Error posting todo: ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Post Todo Error:', error);
    throw error;
  }
}

export async function deleteTodoFromApi(id: number): Promise<void> {
  try {
    const response = await fetch(`${apiUrlForTodos}?id=eq.${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Delete Todo Error:', error);
    throw error;
  }
}

export async function doneTodoInApi(todo: todoData): Promise<void> {
  try {
    const response = await fetch(`${apiUrlForTodos}?id=eq.${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: todo.done }),
    });
    if (!response.ok) {
      throw new Error(`Error updating todo: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Done Todo Error: ${error}`);
  }
}

export async function changeTodoInApi(todo: todoData): Promise<void> {
  try {
    const response = await fetch(`${apiUrlForTodos}?id=eq.${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todo.title,
        content: todo.content,
        due_date: todo.due_date,
        done: todo.done,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error updating todo: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Done Todo Error: ${error}`);
  }
}
