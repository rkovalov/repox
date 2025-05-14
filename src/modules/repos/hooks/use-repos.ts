import { useQuery } from '@tanstack/react-query';
import * as DP from '../data-provider';
import { useFilters } from '../hooks';

export const useRepos = () => {
  const { filters } = useFilters();
  return useQuery(DP.repositoriesQueryOptions(filters));
};
