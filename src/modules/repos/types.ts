import * as v from 'valibot';

const repositorySchema = v.object({
  name: v.string(),
  description: v.nullable(v.string()),
  url: v.string(),
  stargazerCount: v.number(),
  forkCount: v.number(),
  primaryLanguage: v.nullable(
    v.object({
      name: v.string(),
    }),
  ),
  languages: v.object({
    nodes: v.array(
      v.object({
        name: v.string(),
      }),
    ),
  }),
  repositoryTopics: v.object({
    nodes: v.array(
      v.object({
        topic: v.object({
          name: v.string(),
        }),
      }),
    ),
  }),
});

export const repositoriesApiSchema = v.object({
  data: v.object({
    search: v.object({
      nodes: v.array(repositorySchema),
      pageInfo: v.object({
        hasNextPage: v.boolean(),
        endCursor: v.nullable(v.string()),
      }),
      repositoryCount: v.number(),
    }),
  }),
});

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

export interface RepositorySearchResponse {
  search: {
    nodes: Repository[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    repositoryCount: number;
  };
}

export const reposSearchParamsSchema = v.object({
  search: v.optional(v.string()),
  languages: v.optional(v.array(v.string())),
  minStars: v.optional(v.number()),
  maxStars: v.optional(v.number()),
  topics: v.optional(v.array(v.string())),
  first: v.optional(v.number()),
  after: v.optional(v.string()),
});

export type ReposSearchParams = v.InferOutput<typeof reposSearchParamsSchema>;
