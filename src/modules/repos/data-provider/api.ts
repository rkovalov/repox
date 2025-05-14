import { fetcher } from '@/services/fetcher';
import { type ReposSearchParams, repositoriesApiSchema } from './../types';
import * as queries from './graphql/queries';

export const fetchRepositories = async (
  options: ReposSearchParams,
  params?: { signal?: AbortController['signal'] },
) => {
  const {
    first = 50,
    after,
    languages = ['TypeScript', 'JavaScript'],
    minStars = 1000,
  } = options;

  try {
    return await fetcher
      .post('graphql', {
        json: {
          query: queries.repositories.query,
          variables: {
            queryString: queries.repositories.buildSearchQuery({
              ...options,
              languages,
              minStars,
            }),
            first,
            after: after || null,
          },
        },
        signal: params?.signal,
      })
      .json(repositoriesApiSchema);
  } catch (error) {
    if (error instanceof Error) {
      if ('response' in error) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const graphQLError = error as { response: { errors?: any[] } };
        if (graphQLError.response.errors) {
          console.error('GraphQL Errors:', graphQLError.response.errors);
        }
      }
      let message: null | string = null;
      switch (true) {
        case error.name === 'AbortError':
          message = 'Aborted';
          break;
        case error.name === 'ValiError':
          message = `Response Validation Error. ${error.message}`;
          break;
        case error.message.includes('401'):
          message = 'Authentication Failed: Invalid or expired token';
          break;
        case error.message.includes('403'):
          message = 'Rate Limit Exceeded or Insufficient Permissions';
          break;
        case error.message.includes('422'):
          message = 'Validation Error: Check your search parameters';
          break;
        default:
          message = 'An unexpected error occurred';
      }
      throw new Error(`[fetch repos]: ${message}`);
    }
    throw error;
  }
};
