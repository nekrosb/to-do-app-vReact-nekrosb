export interface todoData {
  id: number;
  title: string;
  content?: string;
  due_date: string;
  done: boolean;
}

export interface todoContent {
  title: string;
  content?: string;
  due_date: string;
  done: boolean;
}


export interface filterState {
  date: boolean;
  name: boolean;
  done: boolean;
  unDone: boolean;
}