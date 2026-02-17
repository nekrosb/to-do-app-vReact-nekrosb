import { create } from 'zustand';
import type { todoData, todoContent } from '../types';
import {
  fetchTodos,
  deleteTodoFromApi,
  doneTodoInApi,
  changeTodoInApi,
  postTodo,
} from './api';

interface TodoStore {
  todos: todoData[];
  loading: boolean;

  load: (errorHandler: (text: string, code?: number) => void) => Promise<void>;
  deleteTodo: (id: number, errorHandler: any) => Promise<void>;
  doneTodo: (id: number, errorHandler: any) => Promise<void>;
  changeingTodo: (
    id: number,
    title: string,
    content: string,
    date: string,
    errorHandler: any,
  ) => Promise<void>;
  addTodo: (
    title: string,
    content: string,
    date: string,
    errorHandler: any,
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
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));
    await deleteTodoFromApi(id, errorHandler);
  },

  doneTodo: async (id, errorHandler) => {
    const todos = [...get().todos];
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    todo.done = !todo.done;
    await doneTodoInApi(todo, errorHandler);

    set({ todos });
  },

  changeingTodo: async (id, title, content, date, errorHandler) => {
    const todos = [...get().todos];
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    todo.title = title;
    todo.content = content;
    todo.due_date = date;

    await changeTodoInApi(todo, errorHandler);
    set({ todos });
  },

  addTodo: async (
    title: string,
    content: string,
    date: string,
    errorHandler: any,
  ) => {
    const t: todoContent = {
      title: title,
      content: content,
      due_date: date,
      done: false,
    };
    const todo = await postTodo(t, errorHandler);

    set((state) => ({
      todos: [...state.todos, todo],
    }));
  },
}));
