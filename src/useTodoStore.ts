import { create } from 'zustand';
import {
  changeTodoInApi,
  deleteTodoFromApi,
  doneTodoInApi,
  fetchTodos,
  postTodo,
  deleteAllTodoFromApi,
} from './api';
import type { todoContent, todoData } from './types';

interface TodoStore {
  todos: todoData[];
  loading: boolean;

  load: (errorHandler: (text: string, code?: number) => void) => Promise<void>;
  deleteTodo: (
    id: number,
    errorHandler: (text: string, code?: number) => void,
  ) => Promise<void>;
  doneTodo: (
    id: number,
    errorHandler: (text: string, code?: number) => void,
  ) => Promise<void>;
  changeingTodo: (
    id: number,
    title: string,
    content: string,
    date: string,
    errorHandler: (text: string, code?: number) => void,
  ) => Promise<void>;
  addTodo: (
    title: string,
    content: string,
    date: string,
    errorHandler: (text: string, code?: number) => void,
  ) => Promise<void>;
  deleteAllTodos: (
    errorHandler: (text: string, code?: number) => void,
  ) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: true,

  load: async (errorHandler) => {
    try {
      set({ loading: true });
      const data = await fetchTodos(errorHandler);
      set({ todos: data });
    } catch (e) {
      errorHandler(`${e}`);
    } finally {
      set({ loading: false });
    }
  },

  deleteTodo: async (id, errorHandler) => {
    try {
      await deleteTodoFromApi(id, errorHandler);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    } catch (e) {
      errorHandler(`${e}`);
      throw new Error(`Delete Todo Error: ${e}`);
    }
  },

  doneTodo: async (id, errorHandler) => {
    try {
      const todos = [...get().todos];
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      todo.done = !todo.done;
      await doneTodoInApi(todo, errorHandler);

      set({ todos });
    } catch (e) {
      errorHandler(`${e}`);
    }
  },

  changeingTodo: async (id, title, content, date, errorHandler) => {
    const todos = [...get().todos];
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    todo.title = title;
    todo.content = content;
    todo.due_date = date;
    try {
      await changeTodoInApi(todo, errorHandler);
      set({ todos });
    } catch (e) {
      errorHandler(`${e}`);
    }
  },

  addTodo: async (
    title: string,
    content: string,
    date: string,
    errorHandler: (text: string, code?: number) => void,
  ) => {
    const t: todoContent = {
      title: title,
      content: content,
      due_date: date,
      done: false,
    };
    try {
      const todo = await postTodo(t, errorHandler);
      set((state) => ({
        todos: [...state.todos, todo],
      }));
    } catch (e) {
      errorHandler(`${e}`);
    }
  },

  deleteAllTodos: async (errorHandler) => {
    try {
      await deleteAllTodoFromApi(errorHandler);
      set({ todos: [] });
    } catch (e) {
      errorHandler(`${e}`);
    }
  },
}));
