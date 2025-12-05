import './App.css';
import { ButtonComplete, ButtonOpenCreateTodo, ButtonCreateTodo, ButtonDeleteAll, ButtonDeleteTodo, ButtonCloseTodo } from './button';
import { InputTitle, InputDate } from './input';

function Todo() {
    return <div className='todo-item'>
        <ul>
            <li><h3>title</h3></li>
            <li>date</li>
            <li><ButtonComplete /></li>
            <li><ButtonDeleteTodo /></li>
        </ul>
    </div>
}

export default function App() {
    return (
        <div className='main-container'>
            <header>
                <h1>todo app</h1>
                <ButtonOpenCreateTodo />
                <ButtonDeleteAll />
            </header>
            <div className='todos-container'>
                <Todo />
                <Todo />
                <Todo />
            </div>

<div className='create-menu-content'>
    <h2>Create New Todo</h2>
    <InputTitle />
    <InputDate />
    
    <ButtonCreateTodo />
    <ButtonCloseTodo />
</div>


        </div>
    )

}