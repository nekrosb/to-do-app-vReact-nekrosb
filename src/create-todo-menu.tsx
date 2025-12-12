import './App.css';
import { Input } from './input';
import { Button } from './button';
import React, { useRef } from 'react';



export function MenuCreateTodo(): JSX.Element {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

return (
    <div className="create-menu-content">
    <h2>Create New Todo</h2>
    <Input typeInput='text' classss="input-field" onClick={() => console.log("down")} refInput={titleRef} plaseholderInput='title input' />
    <Input typeInput='text' classss="input-field" onClick={() => console.log("down")} refInput={contentRef} plaseholderInput='content input' />
    <Input typeInput='date' classss="input-date" onClick={() => console.log("down")} refInput={dateRef} plaseholderInput='date input' />

    <div className='create-menu-buttons'>
        <Button classss="btn btn-create" onClick={() => console.log("create")} title='create todo' />
        <Button classss="btn btn-close" onClick={() => console.log("cancel")} title='cancel' />
    </div>
    </div>
)

}