/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
            },
            a: {
              color: theme('colors.teal.600'),
              '&:hover': {
                color: theme('colors.teal.800'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    function ({ addBase, theme }) {
      addBase({
        'h1': { fontFamily: theme('fontFamily.heading') },
        'h2': { fontFamily: theme('fontFamily.heading') },
        'h3': { fontFamily: theme('fontFamily.heading') },
        'h4': { fontFamily: theme('fontFamily.heading') },
        'h5': { fontFamily: theme('fontFamily.heading') },
        'h6': { fontFamily: theme('fontFamily.heading') },
      });
    },
  ],
};