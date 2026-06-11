'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Technology } from '@/typings';
import Skill from './Skill';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Skills({ technologies }: { technologies: Technology[] }) {
	const root = useRef<HTMLDivElement>(null);
	const half = Math.ceil(technologies.length / 2);
	const rowA = technologies.slice(0, half);
	const rowB = technologies.slice(half);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-skills-reveal]', { y: 28, autoAlpha: 0 });
				gsap.to('[data-skills-reveal]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.1,
					scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='py-28 md:py-36'>
			<div className='section-shell'>
				<p data-skills-reveal className='label mb-4'>
					02 — stack
				</p>
				<h2
					data-skills-reveal
					className='font-display text-3xl font-bold tracking-tight text-mist-100 md:text-5xl'
				>
					Tools I reach for<span className='text-primary-300'>.</span>
				</h2>
			</div>

			<div data-skills-reveal className='mt-14 space-y-5 overflow-hidden'>
				<MarqueeRow items={rowA} />
				<MarqueeRow items={rowB} reverse />
			</div>
		</div>
	);
}

function MarqueeRow({ items, reverse }: { items: Technology[]; reverse?: boolean }) {
	if (items.length === 0) return null;
	const anim = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
	return (
		<div className='relative overflow-hidden'>
			<div
				aria-hidden
				className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-primary to-transparent'
			/>
			<div
				aria-hidden
				className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-primary to-transparent'
			/>
			<div className={`flex w-max gap-4 ${anim} hover:[animation-play-state:paused]`}>
				{[0, 1].map((copy) => (
					<div key={copy} className='flex gap-4' aria-hidden={copy === 1}>
						{items.map((t) => (
							<Skill key={`${copy}-${t._id}`} technology={t} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}
