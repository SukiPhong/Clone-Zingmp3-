/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],
    theme: {
        extend: {
            backgroundColor: {
                'main-100': '#E7ECEC',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'overlay-30': 'rgba(0,0,0,0.3)',
            },
            colors: {
                'main-100': '#E7ECEC',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
            },
            keyframes: {
                'slide-right': {
                    '0%': {
                        '-webkit-transform': 'translateX(-500px)',
                        transform: 'translateX(-500px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0)',
                        transform: 'translateX(0)',
                    },
                },
                'slide-left': {
                    '0%': {
                        '-webkit-transform': 'translateX(500px)',
                        transform: 'translateX(500px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0)',
                        transform: 'translateX(0)',
                    },
                },
                'scale-up-center': {
                    '0%': {
                        '-webkit-transform': 'scale(1)',
                        transform: 'scale(1)',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1.2)',
                        transform: 'scale(1.2)',
                    },
                },
            },
            animation: {
                'slide-right':
                    'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'slide-left':
                    'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'scale-up-center':
                    'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
            },
            flex: {
                4: '4 4 0%',
                6: '6 6 0%',
                3: '3 3 0%',
                7: '7 7 0%',
            },
        },
    },
    plugins: [],
};
