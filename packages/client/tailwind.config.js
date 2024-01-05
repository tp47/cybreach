export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-main-menu':
          'linear-gradient(to right, #040909 40%, transparent 75%), url("public/assets/images/main-bg.jpeg")',
        'custom-layout': 'linear-gradient(110deg, #040909 32.66%, #1A372E 85.93%)',
        'custom-game': 'url("public/assets/images/game-bg.png")',
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
