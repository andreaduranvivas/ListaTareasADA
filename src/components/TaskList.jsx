import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
    const { tasks, onTaskToggle, onTaskDelete  } = props;
    return (
        <ul>
            {tasks.map((task) => (
                <Task key={task.id} {...task} onTaskToggle={onTaskToggle} onTaskDelete={onTaskDelete} />
            ))}
        </ul>
    );
};

export default TaskList;
