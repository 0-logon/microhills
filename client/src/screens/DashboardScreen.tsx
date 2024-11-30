import React from 'react';
import styles from '../styles/screens/DashboardScreen.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const DashboardScreen: React.FC = () => {
    const { tasks, status, error } = useSelector((state: RootState) => state.tasks);

    console.log("Tasks from redux: ",tasks);
    return (
        <div className={styles.component}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default DashboardScreen