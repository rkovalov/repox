import path from 'node:path';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import { loadPublicEnvVars } from './rsbuild/utils';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function formatEnvVars(input: Record<string, any>): Record<string, any> {
  return Object.keys(input).reduce(
    (acc, key) => {
      const parts = key.split('.');
      const lastPart = parts[parts.length - 1]; // Get the last part after the dot
      acc[lastPart] = JSON.parse(input[key]); // Assign the value to the last part
      return acc;
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    {} as Record<string, any>,
  );
}

export default defineConfig(async () => {
  const envVars = await loadPublicEnvVars();
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      // ISSUE: vitest automatically convert non-string value to string
      // it works correctly via rsbuild
      env: formatEnvVars(envVars),
      environment: 'jsdom',
      globals: true,
      include: ['./src/**/*.test{s,}.ts{x,}'],
      setupFiles: './tests/setup.ts',
    },
  };
});
