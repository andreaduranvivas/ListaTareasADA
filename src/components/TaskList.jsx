import Task from './Task';
import './styles/TaskList.css';

const TaskList = (props) => {
    const { tasks, onTaskToggle, onTaskDelete, onEditTask  } = props;
    return (
        <ul>
            {tasks.map((task) => (
                <Task key={task.id} {...task} onTaskToggle={onTaskToggle} onTaskDelete={onTaskDelete} onEditTask={onEditTask} />
            ))}
        </ul>
    );
};

export default TaskList;
