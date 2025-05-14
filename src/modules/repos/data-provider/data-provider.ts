import { queryOptions } from '@tanstack/react-query';
import * as API from './api';
import type { SearchOptions } from './types';

export const fetchRepos = async (
  options: SearchOptions,
  params?: { signal?: AbortController['signal'] },
) => {
  const response = await API.searchRepositories(options, params);
  // place where we can modify the response
  // for example, we can normalize the response for our app
  // Alternatively, we can wrap the function to provide additional capabilities,
  // such as applying caching or middleware-like behavior.
  // Example: dataProvider(API.searchRepositories)
  // export const fetchUserInfo = createProvider(api.fetchUserInfo)
  //   .useThen((res) => normalizeUserInfo(res)) // Normalize the response for the app
  //   .useCatch((error) => {
  //     if (error instanceof Error && error.name === 'AbortError') {
  //       logger.warn('Fetch user info aborted'); // Handle request cancellation
  //     } else {
  //       logger.error('Fetch user info failed:', error); // Log other errors
  //     }
  //   });
  //
  // In a test file:
  // import { fetchRepos } from './data-provider';
  // fetchRepos.useMock((options) => { ... }); // Mock the api.fetchUserInfo function for testing

  return response;
};

export const reposQueryOptions = (options: SearchOptions) =>
  queryOptions({
    queryKey: ['repos', options],
    queryFn: ({ signal }) => {
      // Utilize the signal to handle request cancellation if necessary
      return fetchRepos(options, { signal });
    },
  });
