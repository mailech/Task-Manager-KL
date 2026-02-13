import { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { FaCheck, FaTrash, FaEdit, FaUndo } from 'react-icons/fa';


const displayDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
};

const TaskItem = ({ task }) => {
    const { deleteTask, toggleComplete, updateTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = () => {
        updateTask(task._id, { title, description });
        setIsEditing(false);
    };

    const isCompleted = task.status === 'completed';

    return (
        <div className={`glass ${isCompleted ? 'completed' : ''}`} style={{
            padding: '1.5rem',
            position: 'relative',
            opacity: isCompleted ? 0.7 : 1,
            transition: 'all 0.3s'
        }}>
            {isEditing ? (
                <div className="grid">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={handleUpdate} className="btn btn-primary">Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 style={{
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        color: isCompleted ? 'var(--text-muted)' : 'var(--text-color)'
                    }}>
                        {task.title}
                    </h3>
                    <p style={{ margin: '0.5rem 0 1rem 0' }}>{displayDescription(task.description)}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => toggleComplete(task._id, task.status)}
                            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                        >
                            {isCompleted ? <><FaUndo /> Undo</> : <><FaCheck /> Complete</>}
                        </button>
                        <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                            <FaEdit />
                        </button>
                        <button onClick={() => deleteTask(task._id)} className="btn btn-danger">
                            <FaTrash />
                        </button>
                    </div>
                </>
            )}
            {task.dueDate && <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                fontSize: '0.8rem', color: 'var(--text-muted)'
            }}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>}
        </div>
    );
};



export default TaskItem;
