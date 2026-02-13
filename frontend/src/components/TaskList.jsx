import { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { tasks, getTasks } = useContext(TaskContext);

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) {
        return (
            <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <h3>No tasks found. Add a new task to get started!</h3>
            </div>
        );
    }

    return (
        <div className="grid">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
