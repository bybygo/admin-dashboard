import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './dist/*.{html, js}', './public/index.html'],
  darkMode: false,
  theme: {},
  plugins: [],
};

export default config;
