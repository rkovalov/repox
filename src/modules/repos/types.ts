import * as v from 'valibot';

const repositorySchema = v.object({
  description: v.nullable(v.string()),
  forkCount: v.number(),
  languages: v.object({
    nodes: v.array(
      v.object({
        name: v.string(),
      }),
    ),
  }),
  name: v.string(),
  primaryLanguage: v.nullable(
    v.object({
      name: v.string(),
    }),
  ),
  repositoryTopics: v.object({
    nodes: v.array(
      v.object({
        topic: v.object({
          name: v.string(),
        }),
      }),
    ),
  }),
  stargazerCount: v.number(),
  url: v.string(),
});

export const repositoriesApiSchema = v.object({
  data: v.object({
    search: v.object({
      nodes: v.array(repositorySchema),
      pageInfo: v.object({
        endCursor: v.nullable(v.string()),
        hasNextPage: v.boolean(),
      }),
      repositoryCount: v.number(),
    }),
  }),
});

export const reposSearchParamsSchema = v.object({
  after: v.optional(v.string()),
  first: v.optional(v.number()),
  languages: v.optional(v.array(v.string())),
  maxStars: v.optional(v.number()),
  minStars: v.optional(v.number()),
  search: v.optional(v.string()),
  topics: v.optional(v.array(v.string())),
});

export type RepositoriesApi = v.InferOutput<typeof repositoriesApiSchema>;
export type ReposSearchParams = v.InferOutput<typeof reposSearchParamsSchema>;
