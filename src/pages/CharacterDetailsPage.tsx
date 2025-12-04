import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '../features/character-details/hooks/useCharacter';
import EpisodeList from '../features/character-details/components/EpisodeList';
import styles from './CharacterDetailsPage.module.css';

const CharacterDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const characterId = parseInt(id || '0', 10);

    const { character, episodes, isLoading, isError, error } = useCharacter(characterId);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading character details...</div>
            </div>
        );
    }

    if (isError || !character) {
        return (
            <div className={styles.container}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    &larr; Back
                </button>
                <div className={styles.error}>
                    Error loading character: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            </div>
        );
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Alive': return styles.statusAlive;
            case 'Dead': return styles.statusDead;
            default: return styles.statusUnknown;
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                &larr; Back
            </button>

            <div className={styles.header}>
                <img src={character.image} alt={character.name} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.name}>{character.name}</h1>
                    <span className={`${styles.status} ${getStatusClass(character.status)}`}>
                        {character.status}
                    </span>
                    <ul className={styles.details}>
                        <li><span className={styles.label}>Species:</span> {character.species}</li>
                        <li><span className={styles.label}>Gender:</span> {character.gender}</li>
                        {character.type && (
                            <li><span className={styles.label}>Type:</span> {character.type}</li>
                        )}
                        <li><span className={styles.label}>Origin:</span> {character.origin.name}</li>
                        <li><span className={styles.label}>Location:</span> {character.location.name}</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className={styles.sectionTitle}>Episodes ({episodes?.length || 0})</h2>
                {episodes && episodes.length > 0 ? (
                    <EpisodeList episodes={episodes} />
                ) : (
                    <div>No episodes available</div>
                )}
            </div>
        </div>
    );
};

export default CharacterDetailsPage;
