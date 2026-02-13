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
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                        <FaTasks size={18} />
                    </div>
                    <span style={{ letterSpacing: '-0.5px' }}>TaskManager</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={toggleTheme} className="btn btn-secondary" style={{
                        padding: '8px',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--glass-border)',
                        background: 'transparent'
                    }}>
                        {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
                    </button>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }} className="mobile-hide">
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.username}</span>
                                </div>
                            </div>
                            <button onClick={logout} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                <FaSignOutAlt /> <span className="mobile-hide">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.95rem' }}>
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.95rem' }}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
