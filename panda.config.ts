import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  body: {
    backgroundImage: 'linear-gradient(to bottom, var(--colors-slate-900), var(--colors-slate-800))',
    color: '#fff',
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.6rem',
      fontWeight: 700,
    },
  },
});

export default defineConfig({
  // Files to exclude
  exclude: [],
  // Whether to use css reset
  globalCss,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // The output directory for your css system
  outdir: 'styled-system',
  preflight: true,

  // Useful for theme customization
  theme: {
    extend: {},
  },
});
