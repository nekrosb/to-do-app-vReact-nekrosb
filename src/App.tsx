import './App.css';
import { Button } from './button';
import { MenuCreateTodo } from './create-todo-menu';
import { Todo } from './todo';
import type {todoData} from './types';


export default function app(): JSX.Element {
    return (
        <div className='main-container'>
            <header>
                <h1>Todo App</h1>

                <Button classss='btn btn-open' onClick={() => console.log("add todo")} title='add todo' />
                    <Button classss='btn btn-delete-all' onClick={() => console.log("clear todos")} title='clear todos' />
            </header>

<div className='todos-container'>
    <Todo todoData={{id: 12, title: "first todo", content: "this is my first todo", date: "2024-10-10", done: false}} />
    <Todo todoData={{id: 13, title: "second todo", content: "this is my second todo", date: "2024-11-11", done: true}} />
</div>

            <MenuCreateTodo />


        </div>
    )
}