import { useState, useEffect } from 'react';

const useTaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const storedTasks = localStorage.getItem('tasks');

    // Función para crear tareas
    const createTask = (title) => {
        if (newTaskTitle.trim()) {
            const newTask = { id: tasks.length + 1, title: newTaskTitle, completed: false };
            setTasks([...tasks, newTask]);
            localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
            setNewTaskTitle('');
        } else {
            alert('Please enter a task title.');
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

    return { tasks, createTask, deleteTask, updateTask, toggleTask, clearAllTasks, newTaskTitle, setNewTaskTitle };
};

export { useTaskManager };
