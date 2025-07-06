/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = 'class';
export const theme = {
    extend: {
        colors: {
            border: "hsl(var(--border))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            // Palette principale basée sur la charte graphique
            primary: {
                50: '#FFF7ED',
                100: '#FFEDD5',
                200: '#FED7AA',
                300: '#FDBA74',
                400: '#FB923C',
                500: '#F97316', // Orange principal
                600: '#EA580C',
                700: '#C2410C',
                800: '#9A3412',
                900: '#7C2D12',
            },
            secondary: {
                50: '#FAF7F2',
                100: '#F5F0E5',
                200: '#EBE1CC',
                300: '#E1D2B3',
                400: '#D7C399',
                500: '#CDB480', // Beige principal
                600: '#B8A066',
                700: '#A38C4D',
                800: '#8E7833',
                900: '#79641A',
            },
            accent: {
                50: '#FDF2F2',
                100: '#FCE5E5',
                200: '#F8CCCC',
                300: '#F4B2B2',
                400: '#F09999',
                500: '#EC7F7F', // Rose saumon
                600: '#E85C5C',
                700: '#E43939',
                800: '#C72E2E',
                900: '#AA2323',
            },
            neutral: {
                50: '#F9F7F4',
                100: '#F3F0E9',
                200: '#E7E1D3',
                300: '#DBD2BD',
                400: '#CFC3A7',
                500: '#C3B491', // Beige neutre
                600: '#A89B7A',
                700: '#8D8263',
                800: '#72694C',
                900: '#575035',
            },
            brown: {
                50: '#F7F3F0',
                100: '#EFE7E1',
                200: '#DFCFC3',
                300: '#CFB7A5',
                400: '#BF9F87',
                500: '#AF8769', // Brun principal
                600: '#9A7355',
                700: '#855F41',
                800: '#704B2D',
                900: '#5B3719',
            },
            // Anciennes couleurs conservées pour compatibilité
            noisette: {
                50: '#F7F3F0',
                100: '#EFE7E1',
                200: '#DFCFC3',
                300: '#CFB7A5',
                400: '#BF9F87',
                500: '#AF8769',
                600: '#9A7355',
                700: '#855F41',
                800: '#704B2D',
                900: '#5B3719',
            },
            vanille: {
                50: '#FAF7F2',
                100: '#F5F0E5',
                200: '#EBE1CC',
                300: '#E1D2B3',
                400: '#D7C399',
                500: '#CDB480',
                600: '#B8A066',
                700: '#A38C4D',
                800: '#8E7833',
                900: '#79641A',
            },
        },
        fontFamily: {
            'serif': ['Georgia', 'Times New Roman', 'serif'],
            'sans': ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
            'fade-in': 'fadeIn 0.6s ease-in-out',
            'slide-up': 'slideUp 0.8s ease-out',
            'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
            slideUp: {
                '0%': { transform: 'translateY(30px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            float: {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
            },
        },
    },
};
export const plugins = [];