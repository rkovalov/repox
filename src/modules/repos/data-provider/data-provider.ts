/** biome-ignore-all lint/correctness/useHookAtTopLevel: suppress hook rule, biome matches word 'use' */
import { queryOptions } from '@tanstack/react-query';

import { createProvider } from '@/utils/data-provider';

import type { ReposSearchParams } from '../types';
import * as Api from './api';

export const fetchRepositories = createProvider(Api.fetchRepositories)
  .useThen((response) => {
    // place where we can modify the response
    // for example, we can normalize the response for our app
    return response?.data;
  })
  .useCatch((error) => {
    console.warn(error.message);
  });

export const repositoriesQueryOptions = (options: ReposSearchParams) =>
  queryOptions({
    queryFn: ({ signal }) => {
      // Utilize the signal to handle request cancellation if necessary
      return fetchRepositories(options, { signal });
    },
    queryKey: ['repos', Object.keys(options).length ? options : { search: '' }],
  });
