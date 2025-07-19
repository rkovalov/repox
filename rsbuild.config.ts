import { defineConfig, type RsbuildConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

import { pluginVersion } from './rsbuild/plugins';
import { loadPublicEnvVars } from './rsbuild/utils';

export default defineConfig(async ({ env, command, envMode }): Promise<RsbuildConfig> => {
  console.log('[Config]', { command, env, envMode });
  const envVars = await loadPublicEnvVars();
  console.log('[ENV_VARS]', JSON.stringify(envVars, null, 2));

  return {
    html: {
      meta: {
        version: `${JSON.parse(envVars['import.meta.env.VERSION'])}`,
      },
      tags: {
        append: false,
        attrs: {
          src: 'env.js',
        },
        head: true,
        publicPath: true,
        tag: 'script',
      },
      title: 'Repository Management System',
    },
    plugins: [
      pluginReact(),
      // create version json file
      pluginVersion({
        version: JSON.parse(envVars['import.meta.env.VERSION']),
      }),
    ].filter(Boolean),

    server: {
      publicDir: {
        name: './src/_public',
      },
    },
    source: {
      alias: {
        '@/': './src',
      },
      define: envVars,
    },
    tools: {
      postcss: (_config, { addPlugins }) => {
        addPlugins([require('@pandacss/dev/postcss')]);
      },
    },
  };
});
