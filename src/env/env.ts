// HAVE one place to operate with environment variables
// Right now it's not used
// If you need to cut code from bundle, use directly
// if(import.meta.env.REACT_APP_BOOLEAN) {};

import { type EnvVars, validate } from './validators';

Object.defineProperty(window, '__env__', {
  configurable: false,
  value: window.__env__,
  writable: false,
});

Object.preventExtensions(window.__env__);

const _ENV_VARS: EnvVars = {
  // biome-ignore lint/style/useNamingConvention: suppress capitalized key
  REACT_APP_API_ACCESS_TOKEN: import.meta.env.REACT_APP_API_ACCESS_TOKEN,
  // biome-ignore lint/style/useNamingConvention: suppress capitalized key
  REACT_APP_API_URL: import.meta.env.REACT_APP_API_URL,
  // biome-ignore lint/style/useNamingConvention: suppress capitalized key
  VERSION: import.meta.env.VERSION,
  // we can inject any env variable during deployment time
  ...window.__env__,
} as const;

if (process.env.NODE_ENV === 'development') {
  console.info('ENV_VARS', _ENV_VARS);
}

export const ENV_VARS = validate(_ENV_VARS);
