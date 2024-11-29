import React from 'react';
import styles from '../../styles/main/Main.module.css';
import Sidebar from '../shared/Sidebar';

const Main: React.FC = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div>sss</div>
        </div>
    )
}

export default Main;