'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Experience } from '@/typings';
import ExperienceCard from './ExperienceCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WorkExperience({ experiences }: { experiences: Experience[] }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-exp-head]', { y: 28, autoAlpha: 0 });
				gsap.to('[data-exp-head]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.1,
					scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
				});
				// the spine grows as you scroll the timeline
				gsap.fromTo(
					'[data-spine]',
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: 'none',
						transformOrigin: 'top center',
						scrollTrigger: {
							trigger: '[data-timeline]',
							start: 'top 70%',
							end: 'bottom 60%',
							scrub: true,
						},
					},
				);
				gsap.utils.toArray<HTMLElement>('[data-exp-card]').forEach((card) => {
					gsap.set(card, { y: 44, autoAlpha: 0 });
					gsap.to(card, {
						y: 0,
						autoAlpha: 1,
						duration: 0.9,
						ease: 'power3.out',
						scrollTrigger: { trigger: card, start: 'top 82%', once: true },
					});
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='section-shell py-28 md:py-36'>
			<p data-exp-head className='label mb-4'>
				04 — experience
			</p>
			<h2
				data-exp-head
				className='font-display text-3xl font-bold tracking-tight text-mist-100 md:text-5xl'
			>
				Where I&apos;ve worked<span className='text-primary-300'>.</span>
			</h2>

			<div data-timeline className='relative mt-16'>
				<div
					aria-hidden
					className='absolute bottom-0 left-[7px] top-0 w-px bg-carbon-600 md:left-1/2'
				/>
				<div
					data-spine
					aria-hidden
					className='absolute bottom-0 left-[7px] top-0 w-px bg-primary-400 shadow-[0_0_12px_rgba(168,58,85,0.6)] md:left-1/2'
				/>
				<div className='space-y-14 md:space-y-20'>
					{experiences?.map((exp, i) => (
						<ExperienceCard key={exp._id} experience={exp} index={i} />
					))}
				</div>
			</div>
		</div>
	);
}
