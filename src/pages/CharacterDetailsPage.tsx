import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '../features/character-details/hooks/useCharacter';
import EpisodeList from '../features/character-details/components/EpisodeList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Episode } from '../types';
import styles from './CharacterDetailsPage.module.css';

const CharacterDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const characterId = parseInt(id || '0', 10);

    const { character, episodes, isLoading, isError, error } = useCharacter(characterId);

    // Group episodes by season (hook must be called before early returns)
    const episodesBySeason = React.useMemo(() => {
        if (!episodes) return {};
        
        const grouped: { [key: string]: Episode[] } = {};
        
        episodes.forEach((episode) => {
            // Extract season number from episode code (e.g., "S01E01" -> "1")
            const seasonMatch = episode.episode.match(/S(\d+)/);
            if (seasonMatch) {
                const season = seasonMatch[1];
                if (!grouped[season]) {
                    grouped[season] = [];
                }
                grouped[season].push(episode);
            }
        });
        
        return grouped;
    }, [episodes]);

    const seasonNumbers = Object.keys(episodesBySeason).sort((a, b) => parseInt(a) - parseInt(b));

    if (isLoading) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.loading}>Loading character details...</div>
                </div>
                <Footer />
            </>
        );
    }

    if (isError || !character) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                        &larr; Back
                    </button>
                    <div className={styles.error}>
                        Error loading character: {error instanceof Error ? error.message : 'Unknown error'}
                    </div>
                </div>
                <Footer />
            </>
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
        <>
            <Header />
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
                <h2 className={styles.sectionTitle}>Episodes by Season</h2>
                {episodes && episodes.length > 0 ? (
                    <div className={styles.seasonsContainer}>
                        {seasonNumbers.map((seasonNum) => (
                            <div key={seasonNum} className={styles.seasonSection}>
                                <h3 className={styles.seasonTitle}>Season {seasonNum}</h3>
                                <EpisodeList episodes={episodesBySeason[seasonNum]} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noEpisodes}>No episodes available</div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default CharacterDetailsPage;
