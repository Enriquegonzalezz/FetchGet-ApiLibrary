/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        satobold: ['Satoshi-Bold', 'sans-serif'],
      },
       colors: {
        'primary': '#121417',
        'secondary': '#F0F2F5',
        'tertiary': '#61738A',
        'quaternary': '#E5E8EB',
      },
    },
  },
  plugins: [],
};