import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const storedTasks = localStorage.getItem('tasks');


    useEffect(() => {
        if (storedTasks && storedTasks !== '[]') {
            try {
                const parsedTasks = JSON.parse(storedTasks);
                setTasks(parsedTasks);
            } catch (error) {
                console.error("Error parsing stored tasks:", error);
            }
        } else {
            // Use default tasks if localStorage is empty
            setTasks([
                { id: 1, title: 'Buy a new gaming laptop', completed: false },
                { id: 2, title: 'Complete a previous task', completed: true },
                { id: 3, title: 'Create video for YouTube', completed: false },
                { id: 4, title: 'Create a new portfolio site', completed: false },
            ]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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
        setTasks(tasks.filter(task => task.id!== id));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleTaskEdit = (id, updatedTitle, updatedDescription) => {
        setTasks(tasks.map(task => task.id === id? {...task, title: updatedTitle, description: updatedDescription } : task));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleAddTask = (title) => {
        if (newTaskTitle.trim()) {
            const newTask = { id: tasks.length + 1, title: newTaskTitle, completed: false };
            setTasks([...tasks, newTask]);
            localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
            setNewTaskTitle('');
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
