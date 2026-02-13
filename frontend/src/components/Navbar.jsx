import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaUserPlus, FaSignInAlt, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '0.8rem',
                paddingBottom: '0.8rem'
            }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '10px',
                        display: 'flex',
                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                    }}>
                        <FaTasks size={20} />
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--text-color)',
                        letterSpacing: '-0.5px'
                    }}>
                        Task<span style={{ color: 'var(--primary-color)' }}>Flow</span>
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={toggleTheme} className="btn-icon" style={{
                        padding: '10px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        color: 'var(--text-color)',
                        transition: 'all 0.2s ease'
                    }}>
                        {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }} className="mobile-hide">
                                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-color)' }}>{user.username}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pro Member</span>
                                </div>
                            </div>
                            <button onClick={logout} className="btn btn-secondary" style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '0.9rem', border: '1px solid var(--glass-border)' }}>
                                <FaSignOutAlt /> <span className="mobile-hide">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.95rem' }}>
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.95rem' }}>
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
