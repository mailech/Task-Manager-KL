import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskForm = () => {
    const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        addTask({ title, description, dueDate });
        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Create New Task</h2>
            <form onSubmit={handleSubmit} className="grid grid-3">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Decription (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
