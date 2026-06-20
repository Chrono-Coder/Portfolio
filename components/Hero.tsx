'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PageInfo } from '@/typings';
import { urlFor } from '@/util/helper';
import { Traced } from '@/components/svg/Traced';

gsap.registerPlugin(useGSAP);

const SignalCore = dynamic(() => import('@/components/canvas/SignalCore'), {
	ssr: false,
});

const DESCRIPTORS = ['full-stack developer', 'ai enthusiast', 'beautiful mind'];

export default function Hero({ pageInfo }: { pageInfo: PageInfo }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-hero-reveal]', { y: 30, autoAlpha: 0 });
				gsap.set('[data-hero-avatar]', { scale: 0.8, autoAlpha: 0 });
				gsap
					.timeline({ defaults: { ease: 'expo.out' } })
					.to('[data-hero-avatar]', { scale: 1, autoAlpha: 1, duration: 0.9 }, 0.1)
					.to('[data-hero-reveal]', { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.1 }, 0.25);

				// rotating descriptor — starts on the first tagline, cycles through all
				const words = gsap.utils.toArray<HTMLElement>('[data-word]');
				if (words.length > 1) {
					gsap.set(words, { autoAlpha: 0, y: 14 });
					gsap.set(words[0], { autoAlpha: 1, y: 0 });
					const cycle = gsap.timeline({ repeat: -1 });
					words.forEach((w, i) => {
						const next = words[(i + 1) % words.length];
						cycle
							.to(w, { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power3.in' }, '+=2.2')
							.to(next, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '<0.15');
					});
				}
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='relative flex min-h-[100svh] flex-col justify-center overflow-clip'>
			<SignalCore />

			{/* the filament's first node — anchored to the 3D form (right on desktop,
			    centred on mobile where the form recentres) */}
			<span
				data-signal-node
				data-signal-x='0.72'
				data-signal-x-mobile='0.5'
				className='signal-anchor left-[72%] top-[46%]'
				aria-hidden
			/>

			<div className='section-shell relative z-10 pt-20'>
				<div className='flex items-center gap-4 md:gap-5' data-hero-reveal>
					{pageInfo?.heroImage && (
						<div data-hero-avatar className='relative shrink-0'>
							<Image
								src={urlFor(pageInfo.heroImage).url()}
								width={84}
								height={84}
								priority
								alt={pageInfo.title}
								className='h-[76px] w-[76px] rounded-full object-cover ring-1 ring-primary-400/70'
							/>
							<Traced
								viewBox='0 0 100 100'
								d='M50 3 a47 47 0 1 1 -0.01 0'
								strokeWidth={2}
								scrub={false}
								start='top 95%'
								className='absolute -inset-[7px] h-[calc(100%+14px)] w-[calc(100%+14px)]'
							/>
						</div>
					)}
					<p className='max-w-[26ch] text-[10px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-mist-400 sm:max-w-[24rem] sm:text-xs sm:tracking-[0.28em]'>
						{pageInfo?.role}
					</p>
				</div>

				<div data-hero-reveal className='relative mt-8 select-none'>
					<h1 className='hero-name font-display text-[clamp(3.2rem,11.5vw,9.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight'>
						{pageInfo?.title?.split(' ').map((word) => (
							<span key={word} className='block'>
								{word}
							</span>
						))}
					</h1>
				</div>

				<div data-hero-reveal className='mt-8'>
					<div className='relative h-7 w-64 text-lg text-mist-400'>
						{DESCRIPTORS.map((w, i) => (
							<span key={w} data-word className={`absolute left-0 top-0 ${i > 0 ? 'invisible' : ''}`}>
								{w}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
