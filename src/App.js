import React, { useState, useEffect } from 'react';
import './style.css';

// function fetchTodosAPI() {
//   return fetch('https://jsonplaceholder.typicode.com/todos')
//     .then((res) => res.json())
//     .then((data) => data.slice(0, 10));
// }

const initialTodos = [
  {
    id: 1,
    title: 'Worked on the domain tools',
    completed: false,
  },
];

function randomInt() {
  return Math.floor(Math.random() * 99) + 2;
}

export default function App() {
  const [todoitem, setTodoitem] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const [status, setStatus] = useState('All');
  const [completedTodos, setcompletedTodos] = useState([]);

  const addTodoHandler = () => {
    const todo = {
      id: randomInt(),
      title: todoitem,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    setTodoitem('');
  };
  const updateTodoStatus = (id) => {
    let mappedItems = todos.map((item) => {
      return item.id === id
        ? { ...item, completed: !item.completed }
        : { ...item };
    });
    console.log(mappedItems);
    setTodos(mappedItems);
  };
  const changeTodoHandler = (status) => {
    setStatus(status);
    let completedItems =
      status === 'Completed'
        ? todos.filter((item) => item.completed === true)
        : todos;
    setcompletedTodos(completedItems);
  };
  return (
    <div>
      <h1>Todos List </h1>
      <p>
        <ul>
          {status === 'Completed'
            ? completedTodos.map((item, index) => (
                <Todo todo={item} index={index} />
              ))
            : todos.map((item, index) => (
                <Todo
                  todo={item}
                  index={index}
                  updateTodoStatus={updateTodoStatus}
                />
              ))}
        </ul>
      </p>
      <p className="navActions">
        <a href="#" onClick={() => changeTodoHandler('Completed')}>
          Completed
        </a>
        <a href="#" onClick={() => changeTodoHandler('All')}>
          All
        </a>
      </p>
      <p>
        <input
          type="text"
          value={todoitem}
          placeholder="Please enter something todos"
          onChange={(e) => setTodoitem(e.target.value)}
        />
        <button onClick={addTodoHandler}>Add Todos</button>
      </p>
    </div>
  );
}

function Todo({ todo, index, updateTodoStatus }) {
  return (
    <li onClick={() => updateTodoStatus(todo.id)}>
      #{index + 1}.
      <span
        style={{
          textDecoration: `${todo.completed ? 'line-through' : 'none'}`,
        }}
      >
        {todo.title}
      </span>
    </li>
  );
}
