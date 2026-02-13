import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '1rem',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaTasks /> TaskManager
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {user ? (
                        <>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Hello, {user.username}</span>
                            <button onClick={logout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                                <FaUserPlus /> Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
