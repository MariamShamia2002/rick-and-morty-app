import React from 'react';
import type { Character } from '../../../types';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
    character: Character;
    onClick: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(character.id);
        }
    };

    return (
        <div
            className={styles.card}
            onClick={() => onClick(character.id)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${character.name}`}
            data-status={character.status}
        >
            <img src={character.image} alt={character.name} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.name}>{character.name}</h3>
                <p className={styles.info}>
                    <span>{character.species}</span>
                    <span className={styles.status}>{character.status}</span>
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;
