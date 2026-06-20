'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Minimal section header — a small tracked index over a restrained title.
 * No ghost word, no underline; the quiet comes from space, the line does the
 * talking.
 */
export default function SectionTitle({
	index,
	title,
}: {
	index: string;
	ghost?: string;
	title: string;
	flip?: boolean;
}) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-st-reveal]', { y: 22, autoAlpha: 0 });
				gsap.to('[data-st-reveal]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.7,
					ease: 'power3.out',
					stagger: 0.08,
					scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='section-shell'>
			<p data-st-reveal className='label mb-4'>
				{index}
			</p>
			<h2
				data-st-reveal
				className='font-display text-2xl font-bold tracking-tight text-mist-100 sm:text-3xl md:text-4xl'
			>
				{title}
				<span className='text-primary-300'>.</span>
			</h2>
		</div>
	);
}
