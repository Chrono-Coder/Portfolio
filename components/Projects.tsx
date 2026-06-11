'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Project } from '@/typings';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects({ projects }: { projects: Project[] }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-projects-head]', { y: 28, autoAlpha: 0 });
				gsap.to('[data-projects-head]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.1,
					scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
				});
				gsap.utils.toArray<HTMLElement>('[data-project]').forEach((card) => {
					gsap.set(card, { y: 60, autoAlpha: 0 });
					gsap.to(card, {
						y: 0,
						autoAlpha: 1,
						duration: 1,
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
			<p data-projects-head className='label mb-4'>
				03 — selected work
			</p>
			<h2
				data-projects-head
				className='font-display text-3xl font-bold tracking-tight text-mist-100 md:text-5xl'
			>
				Things I&apos;ve built<span className='text-primary-300'>.</span>
			</h2>

			<div className='mt-16 space-y-20 md:space-y-28'>
				{projects?.map((project, i) => (
					<ProjectCard key={project._id} project={project} index={i} />
				))}
			</div>
		</div>
	);
}
