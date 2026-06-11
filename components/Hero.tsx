'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PageInfo } from '@/typings';
import { urlFor } from '@/util/helper';

gsap.registerPlugin(useGSAP);

const HeroSilk = dynamic(() => import('@/components/canvas/HeroSilk'), {
	ssr: false,
});

const DESCRIPTORS = ['full-stack developer', 'ai enthusiast', 'beautiful mind'];

export default function Hero({ pageInfo }: { pageInfo: PageInfo }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-hero-reveal]', { y: 28, autoAlpha: 0 });
				gsap.set('[data-hero-avatar]', { scale: 0.85, autoAlpha: 0 });

				gsap
					.timeline({ defaults: { ease: 'expo.out' } })
					.to('[data-hero-avatar]', { scale: 1, autoAlpha: 1, duration: 0.9 }, 0.1)
					.to(
						'[data-hero-reveal]',
						{ y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09 },
						0.25,
					);

				// rotating descriptor
				const words = gsap.utils.toArray<HTMLElement>('[data-word]');
				if (words.length > 1) {
					gsap.set(words.slice(1), { autoAlpha: 0, y: 14 });
					const cycle = gsap.timeline({ repeat: -1, delay: 2.2 });
					words.forEach((w, i) => {
						const next = words[(i + 1) % words.length];
						cycle
							.to(w, { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power3.in' }, `+=2.1`)
							.fromTo(
								next,
								{ autoAlpha: 0, y: 14 },
								{ autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
								'<0.15',
							);
					});
				}

				gsap.to('[data-scroll-cue]', {
					scaleY: 0.2,
					transformOrigin: 'top center',
					duration: 1,
					ease: 'power2.inOut',
					repeat: -1,
					yoyo: true,
					delay: 1.6,
				});
			});
		},
		{ scope: root },
	);

	return (
		<div
			ref={root}
			className='relative flex min-h-[100svh] flex-col justify-center overflow-clip'
		>
			<HeroSilk />

			<div className='section-shell relative z-10 pt-24'>
				<div
					data-hero-avatar
					className='mb-10 inline-block animate-float-soft'
				>
					{pageInfo?.heroImage && (
						<Image
							src={urlFor(pageInfo.heroImage).url()}
							width={120}
							height={120}
							priority
							alt={pageInfo.title}
							className='h-[110px] w-[110px] rounded-full object-cover ring-2 ring-primary/60 ring-offset-4 ring-offset-bg-primary shadow-[0_0_60px_-10px_rgba(129,32,57,0.55)]'
						/>
					)}
				</div>

				<p data-hero-reveal className='label mb-5'>
					{pageInfo?.role}
				</p>

				<h1
					data-hero-reveal
					className='max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-mist-100 md:text-7xl'
				>
					{pageInfo?.title}
					<span className='text-primary-300'>.</span>
				</h1>

				<div
					data-hero-reveal
					className='relative mt-6 h-8 text-lg text-mist-400 md:text-xl'
				>
					{DESCRIPTORS.map((w, i) => (
						<span
							key={w}
							data-word
							className={`absolute left-0 top-0 ${i > 0 ? 'invisible' : ''}`}
						>
							{w}
						</span>
					))}
				</div>

				<div data-hero-reveal className='mt-12 flex flex-wrap gap-4'>
					<Link href='#projects' className='pill-solid'>
						view work
					</Link>
					<Link href='#contact' className='pill-ghost'>
						contact
					</Link>
				</div>
			</div>

			<div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3'>
				<span className='text-[10px] uppercase tracking-[0.5em] text-mist-600'>
					scroll
				</span>
				<span data-scroll-cue className='block h-10 w-px bg-primary-400/70' />
			</div>
		</div>
	);
}
