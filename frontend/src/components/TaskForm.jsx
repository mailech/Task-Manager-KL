import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { FaTasks, FaCalendarAlt, FaLayerGroup, FaFlag, FaPlus } from 'react-icons/fa';

const TaskForm = () => {
    const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('General');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title, description, dueDate, priority, category });
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
        setCategory('General');
    };

    return (
        <div className="glass animate-fade-in" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    padding: '8px',
                    borderRadius: '10px',
                    color: 'var(--primary-color)'
                }}>
                    <FaPlus size={18} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0' }}>New Task</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <FaTasks className="input-icon" style={{ fontSize: '0.9rem', top: '50%' }} />
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ fontSize: '1rem', padding: '10px 10px 10px 40px' }}
                    />
                </div>

                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <textarea
                        placeholder="Details (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ resize: 'none', height: '80px', paddingTop: '10px', fontSize: '0.9rem' }}
                    />
                </div>

                <div className="grid grid-3" style={{ gap: '10px' }}>
                    <div className="input-group" style={{ marginBottom: '0' }}>
                        <FaCalendarAlt className="input-icon" style={{ fontSize: '0.9rem', top: '50%' }} />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            style={{ padding: '8px 8px 8px 40px', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '0' }}>
                        <FaFlag className="input-icon" style={{ fontSize: '0.9rem', top: '50%' }} />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            style={{ padding: '8px 8px 8px 40px', fontSize: '0.85rem' }}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="input-group" style={{ marginBottom: '0' }}>
                        <FaLayerGroup className="input-icon" style={{ fontSize: '0.9rem', top: '50%' }} />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ padding: '8px 8px 8px 40px', fontSize: '0.85rem' }}
                        >
                            <option value="General">General</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1.2rem', padding: '12px', fontSize: '1rem' }}
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
