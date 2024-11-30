import React from 'react';
import styles from '../../styles/shared/Sidebar.module.css';
import Logo from '../../assets/logos/logo.png';
import { DashboardIcon, HelpIcon, LogoutIcon, SettingsIcon, TasksIcon, UserIcon } from '../../assets/icons';
import { logout } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveScreen } from '../../store/slices/screenSlice';
import { RootState } from '../../store';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeScreen = useSelector((state: RootState) => state.screen.activeScreen);

    const handleLogout = () => {
        localStorage.removeItem('auth'); // Brisanje tokena iz localStorage
        dispatch(logout()); // Reset Redux stanja
        navigate('/login'); // Navigacija na login stranicu
    };

    const handleScreen = (screen: string) => {
        dispatch(setActiveScreen(screen));
    };

    return (
        <nav className={styles.component}>
            <div className={styles.top_line}>
                <a href="/"><img src={Logo} alt="Microhills" /></a>
            </div>
            <div className={styles.navigation}>
                <button
                    onClick={() => handleScreen("Dashboard")}
                    className={activeScreen === 'Dashboard' ? styles.active_btn : ''}
                >
                    <DashboardIcon /> Dashboard
                </button>
                <button
                    onClick={() => handleScreen("Tasks")}
                    className={activeScreen === 'Tasks' ? styles.active_btn : ''}
                >
                    <TasksIcon /> Tasks
                </button>
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