export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'custom-main-menu-dark':
          'linear-gradient(to right, #fdf8f4 30%, transparent 75%), url("/assets/images/main-bg-negate.jpeg")',
        'custom-main-menu-light':
          'linear-gradient(to right, #040909 30%, transparent 75%), url("/assets/images/main-bg.jpeg")',
        'custom-light-layout': 'linear-gradient(110deg, #040909 33%, #1A372E 85.93%)',
        'custom-dark-layout': 'linear-gradient(110deg, #ffffff 10%, transparent 35%, #4a1869)',
        'custom-game-dark': 'url("/assets/images/game-bg-negate.png")',
        'custom-game-light': 'url("/assets/images/game-bg.png")',
        profile: 'url(public/assets/svg/profile.svg)',
        like: 'url(public/assets/svg/like.svg)',
        romb: 'url(public/assets/svg/romb.svg)',
        battery: 'url(public/assets/svg/battery.svg)',
        back: 'url(public/assets/svg/back.svg)',
        profileIcon: 'url(public/assets/svg/profileIcon.svg)',
      },
      colors: {
        'custom-green-night': '#040909',
      },
    },
  },
  plugins: [],
}
