import { useQuery } from '@tanstack/react-query';
import { getCharacter, getEpisodes, getEpisodeIdsFromUrls } from '../../../api/rickAndMortyApi';
import type { Episode } from '../../../types';

export const useCharacter = (id: number) => {
    const characterQuery = useQuery({
        queryKey: ['character', id],
        queryFn: () => getCharacter(id),
        enabled: !!id,
    });

    const episodeIds = characterQuery.data ? getEpisodeIdsFromUrls(characterQuery.data.episode) : [];

    const episodesQuery = useQuery({
        queryKey: ['episodes', episodeIds],
        queryFn: async () => {
            const data = await getEpisodes(episodeIds);
            // Ensure we always return an array, even for single episode
            return Array.isArray(data) ? data : [data];
        },
        enabled: episodeIds.length > 0,
    });

    return {
        character: characterQuery.data,
        episodes: episodesQuery.data as Episode[] | undefined,
        isLoading: characterQuery.isLoading || episodesQuery.isLoading,
        isError: characterQuery.isError || episodesQuery.isError,
        error: characterQuery.error || episodesQuery.error,
    };
};
