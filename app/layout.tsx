import './globals.css';
import { Syne, Manrope } from 'next/font/google';
import SmoothScroll from '@/components/providers/SmoothScroll';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata = {
	title: "Peter-John Hein — Portfolio",
	description:
		'Full-stack developer. Odoo, AI and the web — come see what I build.',
	keywords: ['Peter-John Hein', 'Portfolio', 'Full Stack Developer', 'Odoo'],
	openGraph: {
		type: 'website',
		title: 'Peter-John Hein — Portfolio',
		description: 'Full-stack developer. Odoo, AI and the web.',
		siteName: "Peter-John's Portfolio",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${syne.variable} ${manrope.variable}`}>
			<body className='grain min-h-screen font-sans'>
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
