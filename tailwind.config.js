/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                diria: {
                    green: '#2D5016',
                    neonGreen: '#00ff9d',
                    blue: '#0077BE',
                    neonBlue: '#00ccff',
                    dark: '#0a0a0a',
                    darker: '#050505',
                    card: '#111111',
                    text: '#e5e5e5',
                    muted: '#a3a3a3'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'pan-zoom': 'panZoom 30s linear infinite alternate',
                'gradient-x': { '0%, 100%': { 'background-position': 'left center' }, '50%': { 'background-position': 'right center' } }
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 10px -10px rgba(0, 255, 157, 0)' },
                    'to': { boxShadow: '0 0 20px 5px rgba(0, 255, 157, 0.3)' }
                },
                panZoom: {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '100%': { transform: 'scale(1.1) translate(-2%, -2%)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 10px -10px rgba(0, 255, 157, 0)' },
                    'to': { boxShadow: '0 0 20px 5px rgba(0, 255, 157, 0.3)' }
                },
                panZoom: {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '100%': { transform: 'scale(1.1) translate(-2%, -2%)' }
                },
            }
        },
    },


    plugins: [],
}


