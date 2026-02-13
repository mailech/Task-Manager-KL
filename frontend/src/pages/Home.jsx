import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TaskContext from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import DashboardStats from '../components/DashboardStats';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const { tasks } = useContext(TaskContext); // Added tasks destructuring here
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--gradient-bg)'
        }}>
            <div className="glass" style={{ padding: '2rem' }}>Loading...</div>
        </div>
    );

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }

    const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="container">
            <Navbar />

            <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
                {/* Clean, Data-Driven Header */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', marginTop: '1rem' }}>
                    <div>
                        <p style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%', display: 'inline-block' }}></span>
                            {todayDate}
                        </p>
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            lineHeight: '1.1',
                            margin: 0,
                            letterSpacing: '-1px',
                            color: 'var(--text-color)'
                        }}>
                            {getGreeting()}, <br />
                            <span style={{ color: 'var(--primary-color)' }}>{user?.username?.split(' ')[0]}</span>.
                        </h1>
                    </div>

                    <div className="glass" style={{
                        padding: '1.2rem 2rem',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '140px',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <span style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: 'var(--text-color)',
                            lineHeight: '1'
                        }}>
                            {tasks.filter(t => t.status !== 'completed').length}
                        </span>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            fontWeight: '600',
                            marginTop: '0.3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Pending Tasks
                        </span>
                    </div>
                </div>

                <div className="grid">
                    <DashboardStats />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ order: 1 }}>
                            <TaskForm />
                        </div>
                        <div style={{ order: 2 }}>
                            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '1.4rem' }}>Your Tasks</h2>
                            </div>
                            <TaskList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
