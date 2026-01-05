/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Brand Colors (Wallet Reward theme - soft-coded)
                primary: {
                    DEFAULT: '#40a2d2', // New user requested blue
                    dark: '#012f49',    // New user requested dark blue
                    light: '#7fcbef',
                },
                secondary: {
                    DEFAULT: '#012f49', // Using dark blue as secondary
                    light: '#1a4c6b',
                },
                // Status Colors
                success: '#8BC34A',
                warning: '#FF9800',
                error: '#F44336',
                purple: '#9C27B0',
                'premium-dark': '#012f49',
                // Brand Colors
                brand: {
                    dark: '#0B1739',
                    navy: '#1a2b5e',
                },
                // Aliases for Wallet Reward compatibility
                'blue-primary': '#003366',
                'sky-primary': '#56C4E8',
                'purple-primary': '#003366',
                'pink-primary': '#56C4E8',
                'dark-bg': '#F8FAFC',
                'dark-card': '#FFFFFF',
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['Inter', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
                thai: ['Noto Sans Thai', 'Inter', 'sans-serif'],
                display: ['Comfortaa', 'cursive'],
                inter: ['Inter', 'Noto Sans Thai', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out infinite 2s',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-soft': 'pulse 3s ease-in-out infinite',
                'scale-up': 'scaleUp 0.3s ease-out',
                'bounce-in': 'bounceIn 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
