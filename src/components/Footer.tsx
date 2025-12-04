import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          Built using the{' '}
          <a 
            href="https://rickandmortyapi.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            Rick and Morty API
          </a>
        </p>
        <p className={styles.copyright}>© {currentYear} All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
