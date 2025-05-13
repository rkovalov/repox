import { loadEnv } from '@rsbuild/core';
import { simpleGit } from 'simple-git';
import packageJson from '../package.json';
// Ideally, the utils package should be published to private registry to avoid importing directly from the src directory.
import { formatPublicVars } from '../src/utils/object/format';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export const loadPublicEnvVars = async () => {
  const gitSHA = await getGitSha();
  const VERSION = `v${packageJson.version}-${gitSHA}`;
  return {
    ...formatPublicVars(publicVars),
    'process.env.VERSION': JSON.stringify(VERSION),
    'import.meta.env.VERSION': JSON.stringify(VERSION),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  };
};

export const getGitSha = async (): Promise<string> => {
  try {
    const git = simpleGit();
    const sha = await git.revparse(['--short', 'HEAD']);
    return sha.trim();
  } catch (e) {
    console.error(e);
    throw new Error('[GIT]: Unable to get git sha');
  }
};
