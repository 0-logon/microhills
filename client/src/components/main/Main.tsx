import React from 'react';
import styles from '../../styles/main/Main.module.css';
import Sidebar from '../shared/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import DashboardScreen from '../../screens/DashboardScreen';
import TasksScreen from '../../screens/TasksScreen';

const Main: React.FC = () => {
    const activeScreen = useSelector((state: RootState) => state.screen.activeScreen);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Dashboard':
                return <DashboardScreen />;
            case 'Tasks':
                return <TasksScreen />;
            default:
                return <div>Page not found</div>;
        }
    };

    

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.panel}>
                <div className={styles.panel_header}>
                    <button>M</button>
                </div>
                <div className={styles.container}>
                    <div className={styles.screen_area}>
                        {renderScreen()}
                    </div>
                </div>
                <div className={styles.panel_footer}>
                    <p>&copy; 2024 Microhills. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Main;