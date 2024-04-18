/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  rtl: true,
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: 'hsl(var(--background) / 100%)',
        foreground: 'hsl(var(--foreground) / 100%)',
        caret: 'hsl(var(--caret) / 100%)',
        selection: 'hsl(var(--selection) / 100%)',
        highlight: 'hsl(var(--line-highlight) / 100%)',
        'gutter-background': 'hsl(var(--gutter-background) / 100%)',
        'gutter-foreground': 'hsl(var(--gutter-foreground) / 100%)',
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text|border)-(transparent|current|background|foreground|caret|selection|highlight|gutter-background|gutter-foreground)/,
    },
  ],
  plugins: [],
  darkMode: 'class',
};
