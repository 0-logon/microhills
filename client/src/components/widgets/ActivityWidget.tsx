import React from 'react';
import styles from '../../styles/widgets/Widgets.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActivityWidget: React.FC = () => {
    const { activityOverview } = useSelector((state: RootState) => state.tasks);
    console.log(activityOverview)
    const data = [
        {
            date: "2024-11-30",
            count: 3
        },
        {
            date: "2024-12-3",
            count: 1
        },
        {
            date: "2024-12-10",
            count: 10
        }
    ];
    return (
        <div className={`${styles.widget} ${styles.activity_widget}`}>
            <h2>Activity Overview</h2>
            <div className={styles.widget_body}>
                <ResponsiveContainer width="100%" height={140}>
                    <LineChart  data={data} >
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