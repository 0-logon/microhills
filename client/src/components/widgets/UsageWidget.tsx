import React, { useEffect, useState } from 'react';
import styles from '../../styles/widgets/Widgets.module.css';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AppConfig } from '../../config/config';

type DataItem = {
  name: string;
  value: number;
};

const UsageWidget = () => {
  const { tasks, status, error, charCount } = useSelector((state: RootState) => state.tasks);
  const [percentage, setPercentage] = useState<number>(0);

  const usageLimit: number = AppConfig.USAGE_LIMIT;

  const data: DataItem[] = [
    { name: 'Used space', value: charCount },
    { name: 'Free space', value: usageLimit }
  ];

  const COLORS: string[] = ['#8884d8', '#b9b7e4'];

  useEffect(() => {
    setPercentage(parseFloat((charCount / usageLimit * 100).toFixed(2)));
  });

  return (
    <div className={`${styles.widget} ${styles.usage_widget}`}>
      <h2>Usage Overview</h2>
      <div className={styles.widget_body}>
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={data}
              cx={"auto"}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}

              <Label value={`${percentage}%`} position="center" style={{ fontSize: '16px', fontWeight: 'bold' }} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.usage_info}>
          <p>{`You've used ${charCount} / ${usageLimit.toLocaleString('en-US')} characters.`}</p>
          <p>Stay productive and manage your content effortlessly!</p>
          <p>Need More Space? <a href="/">Upgrade Plan</a></p>
        </div>
      </div>
    </div>
  )
}

export default UsageWidget;