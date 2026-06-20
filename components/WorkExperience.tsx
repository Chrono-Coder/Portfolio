'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Experience } from '@/typings';
import ExperienceCard from './ExperienceCard';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WorkExperience({ experiences }: { experiences: Experience[] }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.utils.toArray<HTMLElement>('[data-exp-card]').forEach((card) => {
					gsap.set(card, { y: 40, autoAlpha: 0 });
					gsap.to(card, {
						y: 0,
						autoAlpha: 1,
						duration: 0.85,
						ease: 'power3.out',
						scrollTrigger: { trigger: card, start: 'top 82%', once: true },
					});
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='py-20 md:py-28'>
			<SectionTitle index='04' title="Where I've worked" />

			<div data-timeline className='section-shell relative mt-10'>
				{/* the filament IS the spine here — anchored top & bottom so it draws
				    straight down the timeline as one continuous line. Centre on desktop
				    (cards alternate either side), left gutter on mobile (single column,
				    dots sit on it). */}
				<span
					data-signal-node
					data-signal-mute
					data-signal-x='0.5'
					data-signal-x-mobile='0.07'
					className='signal-anchor left-1/2 top-0'
					aria-hidden
				/>
				<span
					data-signal-node
					data-signal-mute
					data-signal-x='0.5'
					data-signal-x-mobile='0.07'
					className='signal-anchor bottom-0 left-1/2'
					aria-hidden
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
