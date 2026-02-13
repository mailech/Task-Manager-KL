import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLogin, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            alert('Login failed: ' + err);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{ position: 'absolute', top: '15px', left: '10px', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            placeholder="Email"
                            style={{ paddingLeft: '2.5rem' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: '15px', left: '10px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            style={{ paddingLeft: '2.5rem' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Login
                    </button>
                </form>

                <div style={{ textAlign: 'center', margin: '1.5rem 0', color: 'var(--text-muted)' }}>OR</div>

                <button
                    onClick={googleLogin}
                    className="btn"
                    style={{ width: '100%', justifyContent: 'center', background: '#fff', color: '#333', border: '1px solid #ddd' }}
                >
                    <FaGoogle style={{ color: '#eb4d4b' }} /> Continue with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
