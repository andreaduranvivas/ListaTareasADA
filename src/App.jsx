import { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import Task from './components/Task';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Buy a new gaming laptop', completed: false },
        { id: 2, title: 'Complete a previous task', completed: true },
        { id: 3, title: 'Create video for YouTube', completed: false },
        { id: 4, title: 'Create a new portfolio site', completed: false },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleTaskToggle = (id) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    const handleTaskDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleTaskEdit = (id, updatedTitle, updatedDescription) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return { ...task, title: updatedTitle, description: updatedDescription };
            }
            return task;
        }));
    };

    const handleAddTask = (title) => {
        if (newTaskTitle.trim()) { // Ensure title is not empty
            setTasks([...tasks, { id: tasks.length + 1, title: newTaskTitle, completed: false }]);
            setNewTaskTitle(''); // Clear input field after adding task
        } else {
            alert('Please enter a task title.');
        }
    };

    const handleClearAllTasks = () => {
        if (window.confirm('Are you sure you want to delete all tasks?')) {
            setTasks([]);
        }
    };

    const handleNewTaskTitleChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="task-list-app">
            <Header title="My React Task List"/>
            <SearchBar onSearch={handleSearch}/>
            <div className="task-actions">
                <input
                    type="text"
                    placeholder="Add new task..."
                    value={newTaskTitle}
                    onChange={handleNewTaskTitleChange}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <TaskList tasks={filteredTasks} onTaskToggle={handleTaskToggle} onTaskDelete={handleTaskDelete}
                      onEditTask={handleTaskEdit}/>
            <div className="clear-all-button">
                <button onClick={handleClearAllTasks}>Clear All</button>
            </div>
        </div>
    );
};

export default App;
