import { ENV_VARS } from '@/env';
import { gql, request } from 'graphql-request';
import type { SearchOptions } from './types';
// Advanced repository search interfaces
interface Repository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
  } | null;
  languages: {
    nodes: Array<{ name: string }>;
  };
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
}

interface RepositorySearchResponse {
  search: {
    nodes: Repository[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    repositoryCount: number;
  };
}

const buildSearchQuery = (options: SearchOptions): string => {
  const queryParts: string[] = [];

  // Language filters
  if (options.languages && options.languages.length > 0) {
    const languageQuery = options.languages
      .map((lang) => `language:${lang}`)
      .join(' ');
    queryParts.push(languageQuery);
  }

  // Stars range
  if (options.minStars) {
    queryParts.push(`stars:>=${options.minStars}`);
  }
  if (options.maxStars) {
    queryParts.push(`stars:<=${options.maxStars}`);
  }

  // Topics
  if (options.topics && options.topics.length > 0) {
    const topicQuery = options.topics
      .map((topic) => `topic:${topic}`)
      .join(' ');
    queryParts.push(topicQuery);
  }

  // Name or description search
  if (options.search) {
    queryParts.push(`"${options.search}" in:name,description`);
  }

  // Always sort by stars
  queryParts.push('sort:stars-desc');

  return queryParts.join(' ');
};

export const searchRepositories = async (
  options: SearchOptions = {},
): Promise<RepositorySearchResponse> => {
  const {
    first = 50,
    after,
    languages = ['TypeScript', 'JavaScript'],
    minStars = 1000,
  } = options;

  const searchQuery = buildSearchQuery({
    ...options,
    languages,
    minStars,
  });

  const query = gql`
    query SearchRepositories($queryString: String!, $first: Int!, $after: String) {
      search(query: $queryString, type: REPOSITORY, first: $first, after: $after) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            languages(first: 5) {
              nodes {
                name
              }
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    const response = await request<RepositorySearchResponse>({
      url: `${ENV_VARS.REACT_APP_API_URL}/graphql`,
      document: query,
      variables: {
        queryString: searchQuery,
        first,
        after: after || null,
      },
      requestHeaders: {
        Authorization: `Bearer ${ENV_VARS.REACT_APP_API_ACCESS_TOKEN}`,
        'User-Agent': 'Advanced Repository Search',
        Accept: 'application/vnd.github.v4+json',
      },
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      let message: null | string = null;
      if ('response' in error) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const graphQLError = error as { response: { errors?: any[] } };
        if (graphQLError.response.errors) {
          console.error('GraphQL Errors:', graphQLError.response.errors);
        }
      }

      switch (true) {
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
      Promise.reject(message);
    }

    throw error;
  }
};
