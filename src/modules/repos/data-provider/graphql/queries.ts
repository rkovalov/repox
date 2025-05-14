import { graphql } from '@/.graphql/gql';
import type { ReposSearchParams } from '../../types';

export const repositories = {
  query: graphql(`
    query Repositories($queryString: String!, $first: Int!, $after: String) {
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
  `).toString(),
  buildSearchQuery: (options: ReposSearchParams): string => {
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
  },
};
