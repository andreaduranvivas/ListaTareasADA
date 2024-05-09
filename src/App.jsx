import { useState } from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
    const { tasks, createTask, deleteTask, updateTask, toggleTask, clearAllTasks,
        newTaskTitle, setNewTaskTitle, newTaskDescription, setNewTaskDescription } = useTaskManager(); // Usamos el hook
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleNewTaskDescriptionChange = (event) => {
        setNewTaskDescription(event.target.value);
    };

    const handleCreateTask = () => {
        createTask(newTaskTitle, newTaskDescription);
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
                <input
                    type="text"
                    placeholder="Add task description..."
                    value={newTaskDescription}
                    onChange={handleNewTaskDescriptionChange}
                />
                <button onClick={handleCreateTask}>Add Task</button>
            </div>
            <TaskList tasks={filteredTasks} onTaskToggle={toggleTask} onTaskDelete={deleteTask}
                      onEditTask={updateTask}/>
            <div className="clear-all-button">
                <button onClick={clearAllTasks}>Clear All</button>
            </div>
        </div>
    );
};

export default App;
