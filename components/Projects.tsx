'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Project } from '@/typings';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Sticky deck — each project pins, the next slides over it. */
export default function Projects({ projects }: { projects: Project[] }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
				gsap.utils.toArray<HTMLElement>('[data-deck-card]').forEach((card, i, all) => {
					if (i === all.length - 1) return;
					// as the next card arrives, this one sinks back
					gsap.to(card, {
						scale: 0.93,
						autoAlpha: 0.45,
						ease: 'none',
						scrollTrigger: {
							trigger: all[i + 1],
							start: 'top bottom',
							end: 'top top',
							scrub: true,
						},
					});
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='py-24 md:py-32'>
			<SectionTitle index='02' ghost='work' title="Things I've built" flip />
			<div className='section-shell mt-4'>
				{projects?.map((project, i) => (
					<div
						key={project._id}
						data-deck-card
						className='sticky top-[10vh] mb-[12vh] origin-top md:top-[8vh]'
					>
						<ProjectCard project={project} index={i} total={projects.length} />
					</div>
				))}
			</div>
		</div>
	);
}
