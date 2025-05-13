import { formatPublicVars } from '@/utils/object/format';
import * as v from 'valibot';

const defaultEnvVarsSchema = v.object({
  REACT_APP_API_URL: v.string(),
  REACT_APP_API_ACCESS_TOKEN: v.string(),
  VERSION: v.string(),
});

export type EnvVars = v.InferOutput<typeof defaultEnvVarsSchema>;

export const validate = (envVars: EnvVars) =>
  // formatPublicVars additionally for vitest
  v.parse(defaultEnvVarsSchema, formatPublicVars(envVars), {
    message: (issue) =>
      `[ENV_VARS]:${issue.message}. ${JSON.stringify(issue, null, 2)}`,
  });
