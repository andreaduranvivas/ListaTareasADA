import { useState, useEffect } from 'react';

const useTaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const storedTasks = localStorage.getItem('tasks');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    // Función para crear tareas
    const createTask = (title, description) => {
        if (newTaskTitle.trim().length >= 3) {
            const newTask = { id: tasks.length + 1, title: newTaskTitle, description: newTaskDescription, completed: false };
            setTasks([...tasks, newTask]);
            localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
            setNewTaskTitle('');
            setNewTaskDescription('');
        } else {
            alert('Please enter a task title with at least 3 characters.');
        }
    };

    // Función para borrar tareas
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id!== id));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Función para actualizar tareas
    const updateTask = (id, updatedTitle, updatedDescription) => {
        setTasks(tasks.map(task => task.id === id? {...task, title: updatedTitle, description: updatedDescription } : task));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Función para cambiar el estado de completado de las tareas
    const toggleTask = (id) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {...task, completed:!task.completed };
            }
            return task;
        }));
    };

    // Función para guardar las tareas en localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Función para cargar las tareas desde localStorage
    useEffect(() => {
        if (storedTasks && storedTasks!== '[]') {
            try {
                const parsedTasks = JSON.parse(storedTasks);
                setTasks(parsedTasks);
            } catch (error) {
                console.error("Error parsing stored tasks:", error);
            }
        }else {
            setTasks([
                { id: 1, title: 'Buy a new gaming laptop', completed: false },
                { id: 2, title: 'Complete a previous task', completed: true },
                { id: 3, title: 'Create video for YouTube', completed: false },
                { id: 4, title: 'Create a new portfolio site', completed: false },
            ]);
        }
    }, []);

    const clearAllTasks = () => {
        if (window.confirm('Are you sure you want to delete all tasks?')) {
            setTasks([]);
        }
    };

    return { tasks, createTask, deleteTask, updateTask, toggleTask, clearAllTasks, newTaskTitle, setNewTaskTitle, newTaskDescription, setNewTaskDescription };
};

export { useTaskManager };
