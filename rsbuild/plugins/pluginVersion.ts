import fs from 'node:fs';
import path from 'node:path';
import type { RsbuildPlugin } from '@rsbuild/core'; // Adjust import according to your rsbuild setup

// Define the plugin with options to accept version
export function pluginVersion({ version }: { version: string }): RsbuildPlugin {
  return {
    name: 'create-version-plugin',
    setup(build) {
      build.onAfterBuild(() => {
        const versionInfo = {
          version, // Use the version passed via options
          createdAt: new Date().toISOString(),
        };

        // Write the version info to version.json
        fs.writeFileSync(
          path.resolve(build.context.distPath, 'version.json'),
          JSON.stringify(versionInfo, null, 2),
        );
        console.log(
          '[version]: version.json created successfully with version:',
          version,
        );
      });
    },
  };
}
