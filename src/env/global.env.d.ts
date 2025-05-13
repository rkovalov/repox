/// <reference types="@rsbuild/core/types" />
import type { DefaultEnvVars } from './validators';

declare global {
  type StrictImportMetaEnv = Prettify<
    {
      readonly [K in keyof DefaultEnvVars]: DefaultEnvVars[K];
    } & {
      [k: string]: never;
    }
  >;

  interface ImportMetaEnv extends StrictImportMetaEnv {}

  interface ImportMeta {
    readonly env: Readonly<ImportMetaEnv> & { [k: string]: never };
  }
  namespace NodeJS {
    interface ProcessEnv extends Readonly<ImportMetaEnv> {}
  }

  interface Window {
    __env__: Partial<ImportMetaEnv>;
  }
}
