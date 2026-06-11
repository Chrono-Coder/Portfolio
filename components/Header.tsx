'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import { SocialMedia } from '@/typings';

export default function Header({ socialMedias }: { socialMedias: SocialMedia[] }) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
				scrolled
					? 'border-b border-carbon-700/80 bg-carbon-900/80 backdrop-blur-md'
					: 'border-b border-transparent'
			}`}
		>
			<div className='section-shell flex h-16 items-center justify-between'>
				<Link href='#hero' className='font-display text-lg font-bold text-mist-100'>
					pjh<span className='text-primary-300'>.</span>
				</Link>

				<nav className='hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.25em] text-mist-500 md:flex'>
					{['about', 'projects', 'skills', 'experience', 'contact'].map((s) => (
						<Link key={s} href={`#${s}`} className='transition-colors hover:text-primary-300'>
							{s}
						</Link>
					))}
				</nav>

				<div className='flex items-center'>
					{socialMedias?.map((s) => (
						<SocialIcon
							key={s._id}
							url={s.url}
							target='_blank'
							fgColor='#827c7e'
							bgColor='transparent'
							className='!h-9 !w-9 transition-transform hover:scale-110'
						/>
					))}
				</div>
			</div>
		</header>
	);
}
