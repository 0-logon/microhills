import React from 'react';
import styles from '../styles/screens/DashboardScreen.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ActivityWidget from '../components/widgets/ActivityWidget';

const DashboardScreen: React.FC = () => {
    const { tasks, status, error, charCount } = useSelector((state: RootState) => state.tasks);

    console.log("Tasks from redux: ", charCount);
    return (
        <div className={styles.component}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.body}>
                <ActivityWidget />
            </div>
        </div>
    )
}

export default DashboardScreen