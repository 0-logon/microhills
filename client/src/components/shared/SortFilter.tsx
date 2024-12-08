import React from 'react';
import styles from '../../styles/shared/SortFilter.module.css';
import { AscIcon, DescIcon } from '../../assets/icons';

interface SortFilterProps {
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
}

const SortFilter: React.FC<SortFilterProps> = ({ sort, setSort }) => {

    const handleSort = () => {
        if (sort === 'asc') {
            setSort('desc');
        } else {
            setSort('asc');
        }
    }
    return (
        <div className={styles.component}>
            <button onClick={handleSort}>Sort by date {sort === 'asc' ? <AscIcon /> : <DescIcon />}</button>
        </div>
    )
}

export default SortFilter;