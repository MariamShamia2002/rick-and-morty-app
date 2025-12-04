import React from 'react';
import { useTheme } from '../hooks/useTheme';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <button 
          className={styles.themeToggle} 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
