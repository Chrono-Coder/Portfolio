'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TraceDivider } from '@/components/svg/Traced';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Oversized section header: a ghost outline word drifting sideways on
 * scroll, the solid title riding over it, a traced line drawn beneath.
 */
export default function SectionTitle({
	index,
	ghost,
	title,
	flip,
}: {
	index: string;
	ghost: string;
	title: string;
	flip?: boolean;
}) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.fromTo(
					'[data-ghost]',
					{ xPercent: flip ? 6 : -6 },
					{
						xPercent: flip ? -6 : 6,
						ease: 'none',
						scrollTrigger: {
							trigger: root.current,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						},
					},
				);
				gsap.set('[data-st-reveal]', { y: 26, autoAlpha: 0 });
				gsap.to('[data-st-reveal]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.08,
					scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='relative overflow-clip'>
			<span
				data-ghost
				aria-hidden
				className='text-outline pointer-events-none block select-none whitespace-nowrap font-display text-[clamp(5rem,16vw,13rem)] font-extrabold uppercase leading-none'
			>
				{ghost}
			</span>
			<div className='section-shell relative z-10 -mt-[0.55em]'>
				<p data-st-reveal className='label mb-3'>
					{index}
				</p>
				<h2
					data-st-reveal
					className='font-display text-4xl font-extrabold tracking-tight text-mist-100 md:text-6xl'
				>
					{title}
					<span className='text-primary-300'>.</span>
				</h2>
			</div>
			<div className='section-shell'>
				<TraceDivider flip={flip} />
			</div>
		</div>
	);
}
