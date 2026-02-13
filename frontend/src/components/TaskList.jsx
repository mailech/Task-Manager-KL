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

    // Sort tasks: Pending first, then Completed
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === b.status) return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); // Secondary sort by newness
        return a.status === 'completed' ? 1 : -1;
    });

    return (
        <div className="grid">
            {sortedTasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
