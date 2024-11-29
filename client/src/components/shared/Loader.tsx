import React from 'react';
import styles from '../../styles/shared/Loader.module.css';
import { LoaderIcon } from '../../assets/icons';

const Loader: React.FC = () => {
    return (
        <div className={styles.component}>
            <LoaderIcon />
        </div>
    )
}

export default Loader