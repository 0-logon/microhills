import React from 'react';
import styles from '../styles/screens/DashboardScreen.module.css';
import ActivityWidget from '../components/widgets/ActivityWidget';
import QuoteWidget from '../components/widgets/UsageWidget';

const DashboardScreen: React.FC = () => {
    return (
        <div className={styles.component}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.body}>
                <div className={`${styles.row} ${styles.row_1}`}>
                    <ActivityWidget />
                    <QuoteWidget />
                </div>
            </div>
        </div>
    )
}

export default DashboardScreen