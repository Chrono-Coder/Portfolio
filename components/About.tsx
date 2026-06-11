'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PageInfo } from '@/typings';
import { urlFor } from '@/util/helper';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About({ pageInfo }: { pageInfo: PageInfo }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-about-reveal]', { y: 32, autoAlpha: 0 });
				gsap.to('[data-about-reveal]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.9,
					ease: 'power3.out',
					stagger: 0.12,
					scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
				});
				// slow parallax on the portrait
				gsap.to('[data-about-img]', {
					y: -40,
					ease: 'none',
					scrollTrigger: {
						trigger: root.current,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='section-shell grid items-center gap-14 py-28 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20 md:py-40'>
			<div data-about-reveal className='relative mx-auto w-full max-w-[340px]'>
				<div
					aria-hidden
					className='absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-transparent blur-2xl'
				/>
				{pageInfo?.profileImage?.asset?.url && (
					<div data-about-img className='relative overflow-hidden rounded-[1.75rem] border border-carbon-600'>
						<Image
							src={pageInfo.profileImage.asset.url}
							alt={pageInfo.title}
							width={680}
							height={840}
							className='h-auto w-full object-cover'
						/>
						<div
							aria-hidden
							className='absolute inset-0 bg-gradient-to-t from-carbon-900/50 via-transparent to-transparent'
						/>
					</div>
				)}
			</div>

			<div>
				<p data-about-reveal className='label mb-4'>
					01 — about
				</p>
				<h2
					data-about-reveal
					className='font-display text-3xl font-bold tracking-tight text-mist-100 md:text-5xl'
				>
					A little background<span className='text-primary-300'>.</span>
				</h2>
				<p
					data-about-reveal
					className='mt-7 max-w-xl text-base leading-relaxed text-mist-400'
				>
					{pageInfo?.backgroundInformation}
				</p>
			</div>
		</div>
	);
}
