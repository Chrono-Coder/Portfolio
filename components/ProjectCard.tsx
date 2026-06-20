'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Project } from '@/typings';
import { urlFor } from '@/util/helper';

/** Compact rail card with a subtle pointer-driven 3D tilt. */
export default function ProjectCard({
	project,
	index,
	total,
}: {
	project: Project;
	index: number;
	total: number;
}) {
	const ref = useRef<HTMLDivElement>(null);

	const onMove = (e: React.PointerEvent) => {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - 0.5;
		const py = (e.clientY - r.top) / r.height - 0.5;
		el.style.setProperty('--ry', `${px * 9}deg`);
		el.style.setProperty('--rx', `${-py * 9}deg`);
	};
	const reset = () => {
		const el = ref.current;
		if (!el) return;
		el.style.setProperty('--rx', '0deg');
		el.style.setProperty('--ry', '0deg');
	};

	return (
		<div
			ref={ref}
			onPointerMove={onMove}
			onPointerLeave={reset}
			className='tilt group relative w-[78vw] max-w-[340px] shrink-0 overflow-hidden rounded-[1.5rem] border border-carbon-700 bg-carbon-800 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-primary-400/60 md:w-[420px] md:max-w-none'
		>
			<a
				href={project.linkToBuild || undefined}
				target='_blank'
				rel='noreferrer'
				className='block'
			>
				<div className='relative overflow-hidden'>
					<Image
						src={urlFor(project.image).url()}
						alt={project.title}
						width={900}
						height={620}
						className='h-52 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] md:h-64'
					/>
					<div
						aria-hidden
						className='absolute inset-0 bg-gradient-to-t from-carbon-900 via-carbon-900/10 to-transparent'
					/>
					<span className='absolute left-5 top-4 font-display text-xs font-bold tracking-[0.2em] text-mist-100/80'>
						{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
					</span>
					<span className='absolute bottom-4 right-5 translate-y-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
						visit ↗
					</span>
				</div>

				<div className='tilt-lift p-6 md:p-7'>
					<h3 className='font-sans text-xl font-bold tracking-tight text-mist-100 md:text-2xl'>
						{project.title}
					</h3>
					<p className='mt-3 line-clamp-2 text-sm leading-relaxed text-mist-400'>
						{project.summary}
					</p>
					{project.technologies?.length > 0 && (
						<div className='mt-5 flex flex-wrap items-center gap-1.5'>
							{project.technologies.slice(0, 5).map((t) => (
								<span
									key={t._id}
									className='flex items-center gap-1.5 rounded-full border border-carbon-600 px-2.5 py-1 text-[10px] text-mist-400'
								>
									<Image
										src={urlFor(t.image).url()}
										alt={t.title}
										width={12}
										height={12}
										className='h-3 w-3 rounded-full object-contain'
									/>
									{t.title}
								</span>
							))}
						</div>
					)}
				</div>
			</a>
		</div>
	);
}
