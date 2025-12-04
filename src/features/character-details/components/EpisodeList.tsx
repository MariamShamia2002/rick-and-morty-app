import React from 'react';
import type { Episode } from '../../../types';
import styles from './EpisodeList.module.css';

interface EpisodeListProps {
    episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
    return (
        <ul className={styles.list}>
            {episodes.map((episode) => (
                <li key={episode.id} className={styles.item}>
                    <span className={styles.episodeCode}>{episode.episode}</span>
                    <h4 className={styles.name}>{episode.name}</h4>
                    <span className={styles.date}>{episode.air_date}</span>
                </li>
            ))}
        </ul>
    );
};

export default EpisodeList;
