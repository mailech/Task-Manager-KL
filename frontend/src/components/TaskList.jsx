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
            <div className="glass animate-fade-in" style={{
                padding: '3rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px'
            }}>
                <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 14L11 16L15 12" stroke="var(--secondary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No tasks found</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
                    You have a clean slate! Add a new task above to start organizing your day.
                </p>
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
