/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  // generating the corresponding CSS for those styles.
  content: [
    './src/components/**/*.{jsx,tsx}', // generates components folder
    './src/pages/**/*.{jsx,tsx}', // generates pages folders
    './items/SiteChallengerContentPresentation/Presentation/**/*.yml', // generates sitecore presentation
  ],
  theme: {
    fontFamily: {
      'roboto-300': ['"roboto-300"', 'sans-serif'],
      'roboto-400': ['"roboto-400"', 'sans-serif'],
      'roboto-500': ['"roboto-500"', 'sans-serif'],
      'roboto-700': ['"roboto-700"', 'sans-serif'],
      'roboto-900': ['"roboto-900"', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      'black-25': '#00000040',
      grey: '#d2d2d2',
      'grey-darkest': '#415561',
      'grey-darker': '#bbbbbb',
      'grey-dark': '#cccccc',
      'grey-light': '#f5f6f7', // This colour is for web only and is not part of the brand guidelines.
      'challenger-green': '#b5bd00', // This is the primary brand colour, mainly used for shards.
      'deep-blue': '#003b5c', // This secondary colour is typically used for backgrounds and in some cases typography.
      'secondary-grey': '#757575', //icon default secondary
      blue: '#00629b', // This secondary colour is used for links and also is also used as Institution Blue.
      'bright-navy': '#00205b', // This tertiary colour is used for secondary CTA’s, backgrounds and headings. This colour is also used for CarePlus.
      'bright-navy-light': '#01427c',
      'deep-green': '#006341', // This colour is used for Guaranteed Personal Super & Guaranteed Allocated Pension.
      green: '#48a23f', // This colour is used for Guaranteed Income Fund & Guaranteed Pension Fund.
      'deep-teal': '#115e67', // This colour is used for Liquid Lifetime.
      'light-blue': '#71b2c9', // This colour is used for Fixed Term.
      'bright-teal': '#2adb9b', // Digital colour only, used primarily for the main CTA.
      teal: '#6eceb2',
      'error-red-light': '#ee3536', // This colour is used for error states strokes.
      'error-red-dark': '#ce0c0e', // This colour is used for error states messages for accessibility/readability.
    },
    extend: {
      screens: {
        'xs': '414px',
        'xl': '1200px',
        '2xl': '1400px',
      },
      dropShadow: {
        '3xl': '0 8px 32px rgba(0, 0, 0, 0.08)',
        '4xl': '0 0 80px rgba(0, 0, 0, 0.08)',
      },
      fontSize: {
        'hero-xl': [
          '64px',
          {
            lineHeight: '72px'
          },
        ],
        'hero-lg': [
          '48px',
          {
            lineHeight: '56px'
          },
        ],
        'heading-xl': [
          '40px',
          {
            lineHeight: '48px'
          },
        ],
      },
    },
  },
  plugins: [
    require('tailwind-clip-path'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme('bgGradientDeg', {}), {
            0: '0deg',
            10: '10deg',
            15: '15deg',
            20: '20deg',
            25: '25deg',
            30: '30deg',
            35: '35deg',
            40: '40deg',
            45: '45deg',
            50: '50deg',
            60: '60deg',
            70: '70deg',
            80: '80deg',
            90: '90deg',
            100: '100deg',
            115: '115deg',
            120: '120deg',
            140: '140deg',
            150: '150deg',
            160: '160deg',
            170: '170deg',
            180: '180deg',
            230: '230deg',
            240: '240deg',
            250: '250deg',
            260: '260deg',
            270: '270deg',
            300: '300deg',
            320: '320deg',
            350: '350deg',
            360: '360deg'
          }),
        }
      );
    }),
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'], // This is to allow storybook to use tailwind css
};
