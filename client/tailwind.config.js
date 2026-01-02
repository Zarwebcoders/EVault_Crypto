/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Gold color palette
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#F9E076',
                    dark: '#AA8220',
                },
                // Navy color palette
                navy: {
                    DEFAULT: '#0F172A',
                    light: '#1E293B',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
