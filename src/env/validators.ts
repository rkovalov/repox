import * as v from 'valibot';

import { formatPublicVars } from '@/utils/object/format';

const defaultEnvVarsSchema = v.object({
  // biome-ignore lint/style/useNamingConvention: suppress capitalized key
  REACT_APP_API_ACCESS_TOKEN: v.string(),
  // biome-ignore lint/style/useNamingConvention: suppress capitalized key
  REACT_APP_API_URL: v.string(),
  // biome-ignore lint/style/useNamingConvention: suppress capitalized key
  VERSION: v.string(),
});

export type EnvVars = v.InferOutput<typeof defaultEnvVarsSchema>;

export const validate = (envVars: EnvVars) =>
  // formatPublicVars additionally for vitest
  v.parse(defaultEnvVarsSchema, formatPublicVars(envVars), {
    message: (issue) => `[ENV_VARS]:${issue.message}. ${JSON.stringify(issue, null, 2)}`,
  });
