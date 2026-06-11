'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PageInfo } from '@/typings';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About({ pageInfo }: { pageInfo: PageInfo }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				// portrait unmasks as it enters
				gsap.fromTo(
					'[data-about-img]',
					{ clipPath: 'inset(12% 12% 12% 12% round 1.75rem)', scale: 1.08 },
					{
						clipPath: 'inset(0% 0% 0% 0% round 1.75rem)',
						scale: 1,
						ease: 'none',
						scrollTrigger: {
							trigger: '[data-about-img]',
							start: 'top 90%',
							end: 'top 35%',
							scrub: true,
						},
					},
				);
				gsap.set('[data-about-copy]', { y: 32, autoAlpha: 0 });
				gsap.to('[data-about-copy]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.9,
					ease: 'power3.out',
					stagger: 0.12,
					scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='py-24 md:py-32'>
			<SectionTitle index='01' ghost='about' title='A little background' />
			<div className='section-shell mt-10 grid items-center gap-14 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20'>
				<div className='relative mx-auto w-full max-w-[340px]'>
					<div
						aria-hidden
						className='absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-primary/35 via-transparent to-transparent blur-2xl'
					/>
					{pageInfo?.profileImage?.asset?.url && (
						<div data-about-img className='relative overflow-hidden rounded-[1.75rem]'>
							<Image
								src={pageInfo.profileImage.asset.url}
								alt={pageInfo.title}
								width={680}
								height={840}
								className='h-auto w-full object-cover'
							/>
							<div
								aria-hidden
								className='absolute inset-0 bg-gradient-to-t from-carbon-950/60 via-transparent to-transparent'
							/>
						</div>
					)}
				</div>
				<p data-about-copy className='max-w-xl text-base leading-relaxed text-mist-400 md:text-lg'>
					{pageInfo?.backgroundInformation}
				</p>
			</div>
		</div>
	);
}
