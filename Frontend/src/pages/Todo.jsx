import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './todo.css';

const Todo = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  const [inputInProgress, setInputInProgress] = useState('');
  const [inputDone, setInputDone] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      const tasks = res.data;
      setTodoTasks(tasks.filter(task => task.status === 'todo'));
      setInProgressTasks(tasks.filter(task => task.status === 'inprogress'));
      setDoneTasks(tasks.filter(task => task.status === 'done'));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (column) => {
    let text = '';
    let status = '';

    if (column === 'todo' && inputTodo.trim()) {
      text = inputTodo;
      status = 'todo';
      setInputTodo('');
    }
    if (column === 'inprogress' && inputInProgress.trim()) {
      text = inputInProgress;
      status = 'inprogress';
      setInputInProgress('');
    }
    if (column === 'done' && inputDone.trim()) {
      text = inputDone;
      status = 'done';
      setInputDone('');
    }

    if (text) {
      try {
        await axios.post('http://localhost:5000/tasks', { text, status });
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = async (columnStatus) => {
    if (!draggedTask) return;

    try {
      await axios.put(`http://localhost:5000/tasks/${draggedTask._id}`, { status: columnStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }

    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="board">
        {/* To Do Column */}
        <div className="column todo" onDragOver={handleDragOver} onDrop={() => handleDrop('todo')}>
          <h2>To Do</h2>
          <div className="task-input">
            <input
              type="text"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
              placeholder="Add new task"
            />
            <button onClick={() => addTask('todo')}>+</button>
          </div>
          {todoTasks.map((task) => (
            <div
              key={task._id}
              className="card"
              draggable
              onDragStart={() => handleDragStart(task)}
            >
              <div className="task-content">
                {task.text}
                <button className="delete-button" onClick={() => handleDelete(task._id)}>❌</button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="column inprogress" onDragOver={handleDragOver} onDrop={() => handleDrop('inprogress')}>
          <h2>In Progress</h2>
          <div className="task-input">
            <input
              type="text"
              value={inputInProgress}
              onChange={(e) => setInputInProgress(e.target.value)}
              placeholder="Add new task"
            />
            <button onClick={() => addTask('inprogress')}>+</button>
          </div>
          {inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="card"
              draggable
              onDragStart={() => handleDragStart(task)}
            >
              <div className="task-content">
                {task.text}
                <button className="delete-button" onClick={() => handleDelete(task._id)}>❌</button>
              </div>
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div className="column done" onDragOver={handleDragOver} onDrop={() => handleDrop('done')}>
          <h2>Done</h2>
          <div className="task-input">
            <input
              type="text"
              value={inputDone}
              onChange={(e) => setInputDone(e.target.value)}
              placeholder="Add new task"
            />
            <button onClick={() => addTask('done')}>+</button>
          </div>
          {doneTasks.map((task) => (
            <div
              key={task._id}
              className="card"
              draggable
              onDragStart={() => handleDragStart(task)}
            >
              <div className="task-content">
                {task.text}
                <button className="delete-button" onClick={() => handleDelete(task._id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;





