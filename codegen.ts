import type { CodegenConfig } from '@graphql-codegen/cli';

import { loadPublicEnvVars } from './rsbuild/utils';

const ENV_VARS = await loadPublicEnvVars();

const config: CodegenConfig = {
  documents: ['src/**/*.ts'],
  generates: {
    './src/.graphql/': {
      config: {
        documentMode: 'string',
      },
      preset: 'client',
    },
    './src/.graphql/schema.graphql': {
      config: {
        includeDirectives: true,
      },
      plugins: ['schema-ast'],
    },
  },
  ignoreNoDocuments: true,
  schema: [
    {
      [`${JSON.parse(ENV_VARS['import.meta.env.REACT_APP_API_URL'])}/graphql`]: {
        headers: {
          Authorization: `Bearer ${JSON.parse(ENV_VARS['import.meta.env.REACT_APP_API_ACCESS_TOKEN'])}`,
          'User-Agent': 'Advanced Repository Search',
        },
      },
    },
  ],
};

// biome-ignore lint/style/noDefaultExport: suppress default export
export default config;
