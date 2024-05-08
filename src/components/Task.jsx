import './Task.css';
import {useState} from 'react';

const Task = (props) => {
    const {id, title, description, completed, onTaskToggle, onTaskDelete, onEditTask} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleToggle = () => {
        onTaskToggle(id);
    };

    const handleDelete = () => {
        onTaskDelete(id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim() && editedDescription.trim()) {
            onEditTask(id, editedTitle, editedDescription);
            setIsEditing(false);
        } else {
            alert('Please enter both title and description.');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(title); // Reset edited values to original task data
        setEditedDescription(description);
    };

    return (
        <li className={completed ? 'completed' : ''}>
            <input type="checkbox" checked={completed} onChange={handleToggle}/>
            {isEditing ? (
                <div>
                    <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/>
                    <input type="text" value={editedDescription}
                           onChange={(e) => setEditedDescription(e.target.value)}/>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <>
                    {title}
                    {description && <p>{description}</p>}
                </>
            )}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default Task;

