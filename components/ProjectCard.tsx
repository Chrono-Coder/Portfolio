import Image from 'next/image';
import { Project } from '@/typings';
import { urlFor } from '@/util/helper';

export default function ProjectCard({
	project,
	index,
	total,
}: {
	project: Project;
	index: number;
	total: number;
}) {
	return (
		<article className='overflow-hidden rounded-[1.75rem] border border-carbon-700 bg-carbon-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]'>
			<div className='grid md:grid-cols-[1.25fr_1fr]'>
				<a
					href={project.linkToBuild || undefined}
					target='_blank'
					rel='noreferrer'
					className='group relative block overflow-hidden'
				>
					<Image
						src={urlFor(project.image).url()}
						alt={project.title}
						width={1280}
						height={800}
						className='h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] md:h-[58vh]'
					/>
					<div
						aria-hidden
						className='absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'
					/>
					<span className='absolute bottom-5 right-6 translate-y-2 text-xs font-semibold uppercase tracking-[0.25em] text-mist-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
						visit ↗
					</span>
				</a>

				<div className='flex flex-col justify-center p-8 md:p-12'>
					<span className='font-display text-sm font-bold text-primary-300'>
						{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
					</span>
					<h3 className='mt-3 font-display text-2xl font-extrabold text-mist-100 md:text-4xl'>
						{project.title}
					</h3>
					<p className='mt-5 text-sm leading-relaxed text-mist-400 md:text-base'>
						{project.summary}
					</p>
					{project.technologies?.length > 0 && (
						<div className='mt-7 flex flex-wrap items-center gap-2'>
							{project.technologies.map((t) => (
								<span
									key={t._id}
									className='flex items-center gap-1.5 rounded-full border border-carbon-600 px-3 py-1 text-[11px] text-mist-400'
								>
									<Image
										src={urlFor(t.image).url()}
										alt={t.title}
										width={14}
										height={14}
										className='h-3.5 w-3.5 rounded-full object-contain'
									/>
									{t.title}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</article>
	);
}
