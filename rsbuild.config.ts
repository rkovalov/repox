import { type RsbuildConfig, defineConfig } from '@rsbuild/core';
import { pluginVersion } from './rsbuild/plugins/pluginVersion';
import { loadPublicEnvVars } from './rsbuild/utils';

import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig(
  async ({ env, command, envMode }): Promise<RsbuildConfig> => {
    console.log('[Config]', { env, command, envMode });
    const envVars = await loadPublicEnvVars();
    console.log('[ENV_VARS]', JSON.stringify(envVars, null, 2));

    return {
      plugins: [
        pluginReact(),
        // create version json file
        pluginVersion({
          version: JSON.parse(envVars['import.meta.env.VERSION']),
        }),
      ].filter(Boolean),
      source: {
        alias: {
          '@/': './src',
        },
        define: envVars,
      },
      html: {
        title: 'Repository Management System',
        meta: {
          version: `${JSON.parse(envVars['import.meta.env.VERSION'])}`,
        },
      },

      server: {
        publicDir: {
          name: './src/_public',
        },
      },
    };
  },
);
