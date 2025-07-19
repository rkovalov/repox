import type { RepositoriesApi, ReposSearchParams } from '../types';

export const mockRepositories = (_options: ReposSearchParams): Promise<RepositoriesApi> => {
  return Promise.resolve({
    data: {
      search: {
        nodes: [
          {
            description: 'This is repository 1',
            forkCount: 50,
            languages: {
              nodes: [{ name: 'TypeScript' }, { name: 'JavaScript' }],
            },
            name: 'repo1',
            primaryLanguage: {
              name: 'TypeScript',
            },
            repositoryTopics: {
              nodes: [{ topic: { name: 'react' } }, { topic: { name: 'frontend' } }],
            },
            stargazerCount: 100,
            url: 'https://github.com/user/repo1',
          },
          {
            description: 'This is repository 2',
            forkCount: 75,
            languages: {
              nodes: [{ name: 'JavaScript' }, { name: 'CSS' }],
            },
            name: 'repo2',
            primaryLanguage: {
              name: 'JavaScript',
            },
            repositoryTopics: {
              nodes: [{ topic: { name: 'node' } }, { topic: { name: 'backend' } }],
            },
            stargazerCount: 200,
            url: 'https://github.com/user/repo2',
          },
        ],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
        repositoryCount: 2,
      },
    },
  });
};

export const mockEmptyRepositories = (_options: ReposSearchParams): Promise<RepositoriesApi> => {
  return Promise.resolve({
    data: {
      search: {
        nodes: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
        repositoryCount: 0,
      },
    },
  });
};
