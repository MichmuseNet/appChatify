import { useState } from "react";

const UsernamePrompt = ({room, onSave}) =>{
    const [inputValue, setInputValue]= useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        if (inputValue.trim()){
            onSave(inputValue.trim())
        }
    }
    return (
    <div className="modal-backdrop">
        <div className="modal-content">
            <h2>Welcome to #{room}</h2>
            <p>Enter your cool nickname: </p>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="your cool nickname "
                value={inputValue} 
                onChange={(e)=> setInputValue(e.target.value)}
                autoFocus
                />  
                <button type="submit"> Join Room</button>                    
            </form>
        </div>
    </div>
    );
};


export default UsernamePrompt;