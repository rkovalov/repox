import * as v from 'valibot';

export const reposParamsSchema = v.object({
  name: v.optional(v.string()),
});

export type ReposParams = v.InferOutput<typeof reposParamsSchema>;
