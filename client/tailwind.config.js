/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        
        colors: {
            'white': '#FFFFFF',
            'black': '#242424',
            'grey': '#F3F3F3',
            'gray': '#333333',
            'white-smoke' : '#F6F7F8',
            'dark-grey': '#6B6B6B',
            'red': '#FF4E4E',
            'transparent': 'transparent',
            'twitter': '#1DA1F2',
            'purple': '#8B46FF',
            'teal-green': "#1D5167",
            'gainsboro': "#e0e0e0",
            'silver': "#cccccc",
            'facebook': "#337ab7",
            'google': "#d9534f",
            'gainsboro': "#dddddd",
            'silver': "#7f858a",
            'seaweed': "#007a96",
        },

        fontSize: {
            'sm': '12px',
            'base': '14px',
            'xl': '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },

        extend: {
            fontFamily: {
                opensans: ["Open Sans"],
                rotobo: ["Roboto"],
                gelasio: ["'Gelasio'", "serif"],
            },
            width: {
                'logo': '60px',
                'icon': '32px',
                'user': '150px',
                '80%': '80%',
            },
            height: {
                'nav': '46px',
                'search': '30px',
                'logo': '30px',
                'icon': '32px',
                'input': '34px',
            },
            lineHeight: {
                'nav': '46px',
                'icon': '30px',
            },
            spacing: {
                '10px': '10px',
                '20px': '20px',
                '46px': '46px',
            },
            padding: {
                'nav': "46px",
            }
        },

    },
    plugins: [require("daisyui")],
};