import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadPublicEnvVars } from './rsbuild/utils';

const ENV_VARS = await loadPublicEnvVars();

const config: CodegenConfig = {
  schema: [
    {
      [`${JSON.parse(ENV_VARS['import.meta.env.REACT_APP_API_URL'])}/graphql`]:
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(ENV_VARS['import.meta.env.REACT_APP_API_ACCESS_TOKEN'])}`,
            'User-Agent': 'Advanced Repository Search',
          },
        },
    },
  ],
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/.graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    './src/.graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
