import { useQuery } from '@tanstack/react-query';

import * as Dp from '../data-provider';
import { useFilters } from '../hooks';

export const useRepos = () => {
  const { filters } = useFilters();
  return useQuery(Dp.repositoriesQueryOptions(filters));
};
