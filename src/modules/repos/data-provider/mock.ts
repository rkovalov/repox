import type { ReposSearchParams, RepositoriesApi } from '../types';

export const mockRepositories = (
  _options: ReposSearchParams,
): Promise<RepositoriesApi> => {
  return Promise.resolve({
    data: {
      search: {
        nodes: [
          {
            name: 'repo1',
            description: 'This is repository 1',
            url: 'https://github.com/user/repo1',
            stargazerCount: 100,
            forkCount: 50,
            primaryLanguage: {
              name: 'TypeScript',
            },
            languages: {
              nodes: [{ name: 'TypeScript' }, { name: 'JavaScript' }],
            },
            repositoryTopics: {
              nodes: [
                { topic: { name: 'react' } },
                { topic: { name: 'frontend' } },
              ],
            },
          },
          {
            name: 'repo2',
            description: 'This is repository 2',
            url: 'https://github.com/user/repo2',
            stargazerCount: 200,
            forkCount: 75,
            primaryLanguage: {
              name: 'JavaScript',
            },
            languages: {
              nodes: [{ name: 'JavaScript' }, { name: 'CSS' }],
            },
            repositoryTopics: {
              nodes: [
                { topic: { name: 'node' } },
                { topic: { name: 'backend' } },
              ],
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
        repositoryCount: 2,
      },
    },
  });
};

export const mockEmptyRepositories = (
  _options: ReposSearchParams,
): Promise<RepositoriesApi> => {
  return Promise.resolve({
    data: {
      search: {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
        repositoryCount: 0,
      },
    },
  });
};
