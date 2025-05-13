import * as v from 'valibot';

export const reposSearchParamsSchema = v.object({
  search: v.optional(v.string()),
});

export type ReposSearchParams = v.InferOutput<typeof reposSearchParamsSchema>;
