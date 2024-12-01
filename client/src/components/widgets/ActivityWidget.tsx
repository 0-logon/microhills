import React from 'react';
import styles from '../../styles/widgets/Widgets.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ActivityWidget: React.FC = () => {
    const { activityOverview } = useSelector((state: RootState) => state.tasks);
    
    return (
        <div className={styles.widget}>
            <h2>Activity Overview</h2>
            <div className={styles.widget_body}>
                ss
            </div>
        </div>
    )
}

export default ActivityWidget;