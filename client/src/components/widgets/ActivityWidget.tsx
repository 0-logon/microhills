import React from 'react';
import styles from '../../styles/widgets/Widgets.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityWidget: React.FC = () => {
    const { activityOverview } = useSelector((state: RootState) => state.tasks);

    return (
        <div className={`${styles.widget} ${styles.activity_widget}`}>
            <h2>Activity Overview</h2>
            <div className={styles.widget_body}>
                <ResponsiveContainer width="100%" height={140}>
                    <LineChart data={activityOverview} >
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ActivityWidget;