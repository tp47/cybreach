export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-main-menu':
          'linear-gradient(to right, #040909 40%, transparent 75%), url("public/assets/images/main-bg.jpeg")',
        'custom-layout': 'linear-gradient(110deg, #040909 32.66%, #1A372E 85.93%)',
      },
    },
  },
  plugins: [],
}
