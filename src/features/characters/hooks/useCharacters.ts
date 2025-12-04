import { useInfiniteQuery } from '@tanstack/react-query';
import { getCharacters } from '../../../api/rickAndMortyApi';
import type { CharacterFilter } from '../../../types';

export const useCharacters = (filter: CharacterFilter) => {
    return useInfiniteQuery({
        queryKey: ['characters', filter],
        queryFn: ({ pageParam = 1 }) => getCharacters({ ...filter, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.info.next) {
                const url = new URL(lastPage.info.next);
                return parseInt(url.searchParams.get('page') || '1', 10);
            }
            return undefined;
        },
    });
};
