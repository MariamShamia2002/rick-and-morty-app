import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Search for characters..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-label="Search characters"
                />
            </div>
        </div>
    );
};

export default SearchBar;
