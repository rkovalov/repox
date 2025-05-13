import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  body: {
    color: '#fff',
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
    backgroundImage:
      'linear-gradient(to bottom, var(--colors-slate-900), var(--colors-slate-800))',
    h1: {
      fontSize: '3.6rem',
      fontWeight: 700,
    },
  },
});

export default defineConfig({
  // Whether to use css reset
  globalCss,
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
