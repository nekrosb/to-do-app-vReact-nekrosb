import type { todoData, todoContent } from './types';

const apiUrlForTodos = 'https://api.todos.in.jt-lab.ch/todos';

export async function fetchTodos(
  errorDet: (error: string, code?: number) => void,
): Promise<todoData[]> {
  try {
    const response = await fetch(apiUrlForTodos);
    if (!response.ok) {
      errorDet(response.statusText, response.status);
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    errorDet(`${error}`);
    console.error('Fetch Todos Error:', error);
    return [];
  }
}

export async function postTodo(
  todo: todoContent,
  errorDet: (error: string, code?: number) => void,
): Promise<todoData> {
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
      errorDet(response.statusText, response.status);
      throw new Error(`Post Todo Failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    errorDet(`${error}`);
    console.error('Post Todo Error:', error);
    throw new Error(`Post Todo Error: ${error}`);
  }
}

export async function deleteTodoFromApi(
  id: number,
  errorDet: (error: string, code?: number) => void,
): Promise<void> {
  try {
    const response = await fetch(`${apiUrlForTodos}?id=eq.${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      errorDet(response.statusText, response.status);
      return;
    }
  } catch (error) {
    errorDet(`${error}`);
    console.error('Delete Todo Error:', error);
    return;
  }
}

export async function doneTodoInApi(
  todo: todoData,
  errorDet: (error: string, code?: number) => void,
): Promise<void> {
  try {
    const response = await fetch(`${apiUrlForTodos}?id=eq.${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: todo.done }),
    });
    if (!response.ok) {
      errorDet(response.statusText, response.status);
      return;
    }
  } catch (error) {
    errorDet(`${error}`);
    return;
  }
}

export async function changeTodoInApi(
  todo: todoData,
  errorDet: (error: string, code?: number) => void,
): Promise<void> {
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
      errorDet(response.statusText, response.status);
      throw new Error(`Change Todo Failed: ${response.statusText}`);
    }
  } catch (error) {
    errorDet(`${error}`);
    throw new Error(`Change Todo Error: ${error}`);
  }
}
