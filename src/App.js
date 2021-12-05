import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const firstRender = useRef(true)
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  const handleSubmit = e => {
    if (inputValue.trim() === '') {
      
    } else {
      setTodos([...todos, {
        text: inputValue,
        id: uuidv4(),
      }])
    }
    e.preventDefault()
    setInputValue('')
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      localStorage.setItem('TODO', JSON.stringify([...todos]))
    }
  }, [todos])

  useEffect(() => {
    if (localStorage.getItem('TODO') !== null) {
      const newTodos = localStorage.getItem('TODO')
      setTodos(JSON.parse([...todos, newTodos]))
    }
  }, [])

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Next task"
            value={inputValue}
            onChange={handleChange}
          />

          <button type='submit'>Add</button>

        </form>
        
        {todos.map((todo) => {
          return (
            <div key={todo.id} className='todo'>
              <p>{todo.text}</p>
              <i onClick={() => removeTodo(todo.id)} className="far fa-trash-alt"></i>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default App;
