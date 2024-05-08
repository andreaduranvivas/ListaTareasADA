import './Task.css';

const Task = (props) => {
    const { id, title, description, completed, onTaskToggle, onTaskDelete, onEdit  } = props;
    const handleToggle = () => {
        onTaskToggle(id);
    };

    const handleDelete = () => {
        onTaskDelete(id);
    };

    const handleEdit = () => {
        onEdit(id);
    };

    return (
        <li className={completed ? 'completed' : ''}>
            <input type="checkbox" checked={completed} onChange={handleToggle}/>
            {title}
            {description && <p>{description}</p>}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default Task;
