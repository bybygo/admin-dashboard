/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
      autoprefixer: {
        grid: true,
      },
    },
  },
};

export default config;
