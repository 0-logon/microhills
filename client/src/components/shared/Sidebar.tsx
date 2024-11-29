import React from 'react';
import styles from '../../styles/shared/Sidebar.module.css';
import Logo from '../../assets/logos/logo.png';
import { DashboardIcon, HelpIcon, LogoutIcon, SettingsIcon, TasksIcon, UserIcon } from '../../assets/icons';
import { logout } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth'); // Brisanje tokena iz localStorage
        dispatch(logout()); // Reset Redux stanja
        navigate('/login'); // Navigacija na login stranicu
    };
    return (
        <nav className={styles.component}>
            <div className={styles.top_line}>
                <a href="/"><img src={Logo} alt="Microhills" /></a>
            </div>
            <div className={styles.navigation}>
                <button><DashboardIcon /> Dashboard</button>
                <button><TasksIcon /> Tasks</button>
                <button disabled><UserIcon /> User Profile</button>
                <button disabled><SettingsIcon /> Settings</button>
            </div>
            <div className={styles.bottom_line}>
                <a href="/help"><HelpIcon /> Help</a>
                <button onClick={handleLogout}><LogoutIcon /> Logout</button>
            </div>
        </nav>
    )
}

export default Sidebar;