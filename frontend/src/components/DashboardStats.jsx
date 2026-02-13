import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const DashboardStats = () => {
    const { tasks } = useContext(TaskContext);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Your Progress</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        <strong>{completedTasks}</strong> Completed
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                        <strong>{pendingTasks}</strong> Pending
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{
                        height: '20px',
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, var(--secondary-color), var(--success-color))',
                            transition: 'width 0.5s ease-out'
                        }}></div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {progress}% Done
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
