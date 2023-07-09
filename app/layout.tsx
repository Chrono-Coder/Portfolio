import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Peter-John's Portfolio",
	description: "Hi, I'm Peter-John Hein. Come view my portfolio.",
	keywords: [
		"Peter-John, Portfolio, Peter's Portfolio, Peter-John's Portfolio",
	],
	// openGraph: {
	// 	type: "website",
	// 	locale: "en_IE",
	// 	url: "https://peterjohnhein.vercel.app",
	// 	title: "Peter's Portfolio",
	// 	description: "Hi, I'm Peter-John Hein. Come view my portfolio.",
	// 	site_name: "Peter's Portfolio",
	// },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
