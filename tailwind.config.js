/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				// the original identity, expanded into a scale
				'bg-primary': '#121011',
				'bg-secondary': '#1a1718',
				carbon: {
					950: '#0c0a0b',
					900: '#121011',
					800: '#1a1718',
					700: '#221e1f',
					600: '#2e2a2b',
				},
				primary: {
					DEFAULT: '#812039',
					300: '#c4566f',
					400: '#a83a55',
					500: '#812039',
					600: '#6a1a2f',
					700: '#521424',
					950: '#2b0a13',
				},
				mist: {
					100: '#f4f1f2',
					300: '#c9c4c6',
					400: '#a8a2a4',
					500: '#827c7e',
					600: '#5f5a5c',
				},
			},
			fontFamily: {
				display: ['var(--font-syne)', 'sans-serif'],
				sans: ['var(--font-manrope)', 'sans-serif'],
			},
			animation: {
				marquee: 'marquee 36s linear infinite',
				'marquee-reverse': 'marquee-reverse 42s linear infinite',
				'float-soft': 'float-soft 7s ease-in-out infinite',
			},
			keyframes: {
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' },
				},
				'marquee-reverse': {
					from: { transform: 'translateX(-50%)' },
					to: { transform: 'translateX(0)' },
				},
				'float-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
