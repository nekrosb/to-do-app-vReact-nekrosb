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
