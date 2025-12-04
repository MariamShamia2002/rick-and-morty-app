import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from '../features/characters/hooks/useCharacters';
import { useDebounce } from '../hooks/useDebounce';
import CharacterCard from '../features/characters/components/CharacterCard';
import SearchBar from '../features/characters/components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './CharactersPage.module.css';

const CharactersPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const navigate = useNavigate();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useCharacters({ name: debouncedSearch });

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const handleCharacterClick = (id: number) => {
        navigate(`/character/${id}`);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <SearchBar value={search} onChange={handleSearch} />

                {status === 'pending' && <div className={styles.loading}>Loading...</div>}
                {status === 'error' && (
                    <div className={styles.error}>
                        Error fetching characters: {error instanceof Error ? error.message : 'Unknown error'}
                    </div>
                )}

                {status === 'success' && (
                    <>
                        <div className={styles.grid}>
                            {data.pages.map((page) =>
                                page.results.map((character) => (
                                    <CharacterCard
                                        key={character.id}
                                        character={character}
                                        onClick={handleCharacterClick}
                                    />
                                ))
                            )}
                        </div>

                        {data.pages[0].results.length === 0 && (
                            <div className={styles.noResults}>No characters found</div>
                        )}

                        {hasNextPage && (
                            <button
                                className={styles.loadMore}
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                            >
                                {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                            </button>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CharactersPage;
