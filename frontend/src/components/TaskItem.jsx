import { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { FaCheck, FaTrash, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TaskItem = ({ task }) => {
    const { deleteTask, toggleComplete, updateTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = () => {
        updateTask(task._id, { title, description });
        setIsEditing(false);
    };

    const isCompleted = task.status === 'completed';

    const handleToggleComplete = (e) => {
        e.stopPropagation();
        toggleComplete(task._id, task.status);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task._id);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
        setIsExpanded(true);
    };

    return (
        <div
            className={`glass ${isCompleted ? 'completed' : ''}`}
            style={{
                marginBottom: '1rem', // Spacing between cards
                padding: '1.2rem',
                position: 'relative',
                opacity: isCompleted ? 0.6 : 1,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                borderLeft: isCompleted ? '4px solid var(--success-color)' : `4px solid ${task.priority === 'high' ? 'var(--error-color)' : task.priority === 'medium' ? 'var(--secondary-color)' : 'var(--primary-color)'}`,
                transform: isExpanded ? 'scale(1.01)' : 'scale(1)',
                boxShadow: isExpanded ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'var(--shadow)'
            }}
            onClick={() => !isEditing && setIsExpanded(!isExpanded)}
        >
            {isEditing ? (
                <div className="grid" onClick={(e) => e.stopPropagation()}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button onClick={handleUpdate} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                            {/* Complete Checkbox Button - Always Visible */}
                            <button
                                onClick={handleToggleComplete}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    border: isCompleted ? 'none' : '2px solid var(--text-muted)',
                                    background: isCompleted ? 'var(--success-color)' : 'transparent',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    flexShrink: 0
                                }}
                                title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                            >
                                {isCompleted && <FaCheck size={12} />}
                            </button>

                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.1rem',
                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                    color: isCompleted ? 'var(--text-muted)' : 'var(--text-color)',
                                    fontWeight: '600'
                                }}>
                                    {task.title}
                                </h3>
                                {/* Summary Line (Visible when collapsed) */}
                                {!isExpanded && (
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', alignItems: 'center' }}>
                                        {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
                                        {task.category && <span>• {task.category}</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Expand/Collapse Chevron */}
                        <div style={{ color: 'var(--text-muted)', opacity: 0.5, marginLeft: '1rem' }}>
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>

                    {/* Expanded Details Section */}
                    {isExpanded && (
                        <div style={{
                            marginTop: '1.5rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid var(--glass-border)',
                            animation: 'fadeInSlideUp 0.3s ease-out'
                        }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                {task.priority && (
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase',
                                        background: task.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' :
                                            task.priority === 'medium' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                        color: task.priority === 'high' ? '#ef4444' :
                                            task.priority === 'medium' ? '#fbbf24' : '#10b981',
                                        border: '1px solid',
                                        borderColor: task.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' :
                                            task.priority === 'medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                                    }}>
                                        {task.priority}
                                    </span>
                                )}
                                {task.category && (
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        background: 'rgba(99, 102, 241, 0.08)',
                                        color: 'var(--primary-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        🏷️ {task.category}
                                    </span>
                                )}
                                {task.dueDate && (
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        background: 'rgba(156, 163, 175, 0.1)',
                                        color: 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        📅 {new Date(task.dueDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                )}
                            </div>

                            <p style={{
                                margin: '0 0 1.5rem 0',
                                fontSize: '0.95rem',
                                lineHeight: '1.6',
                                color: 'var(--text-muted)',
                                whiteSpace: 'pre-wrap' // Preserve Formatting
                            }}>
                                {task.description ? task.description : <span style={{ fontStyle: 'italic', opacity: 0.6 }}>No additional details provided.</span>}
                            </p>

                            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={handleEditClick}
                                    className="btn btn-secondary"
                                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                                >
                                    <FaEdit style={{ marginRight: '6px' }} /> Edit
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="btn"
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444',
                                        padding: '8px 16px',
                                        fontSize: '0.85rem',
                                        border: '1px solid rgba(239, 68, 68, 0.2)'
                                    }}
                                >
                                    <FaTrash style={{ marginRight: '6px' }} /> Delete
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TaskItem;
