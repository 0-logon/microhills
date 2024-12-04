import React, { useState } from 'react';
import styles from '../../styles/shared/Sidebar.module.css';
import Logo from '../../assets/logos/logo.png';
import { BurgerIcon, CloseIcon, DashboardIcon, HelpIcon, LogoutIcon, SettingsIcon, TasksIcon, UserIcon } from '../../assets/icons';
import { logout } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveScreen } from '../../store/slices/screenSlice';
import { RootState } from '../../store';

const Sidebar: React.FC = () => {
    const [opened, setOpened] = useState<boolean>(false);

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
        <>
            <button onClick={() => setOpened(!opened)} className={styles.toggle_btn}><BurgerIcon /></button>
            <nav className={`${styles.component} ${opened ? styles.opened : ''}`} style={{ left: opened ? 0 : '-100%' }}>
                <div className={styles.top_line}>
                    <a href="/"><img src={Logo} alt="Microhills" /></a>
                    <button onClick={() => setOpened(!opened)}><CloseIcon /></button>
                </div>
                <div className={styles.navigation}>
                    <button
                        onClick={() => {handleScreen("Dashboard"), setOpened(false)}}
                        className={activeScreen === 'Dashboard' ? styles.active_btn : ''}
                    >
                        <DashboardIcon /> Dashboard
                    </button>
                    <button
                        onClick={() => {handleScreen("Tasks"), setOpened(false)}}
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
        </>
    )
}

export default Sidebar;