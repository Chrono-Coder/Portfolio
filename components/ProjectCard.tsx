import Image from 'next/image';
import { Project } from '@/typings';
import { urlFor } from '@/util/helper';

export default function ProjectCard({
	project,
	index,
}: {
	project: Project;
	index: number;
}) {
	const flip = index % 2 === 1;
	return (
		<article
			data-project
			className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
				flip ? 'md:[&>*:first-child]:order-2' : ''
			}`}
		>
			<a
				href={project.linkToBuild || undefined}
				target='_blank'
				rel='noreferrer'
				className='group relative block overflow-hidden rounded-[1.5rem] border border-carbon-600'
			>
				<Image
					src={urlFor(project.image).url()}
					alt={project.title}
					width={1200}
					height={750}
					className='h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
				/>
				<div
					aria-hidden
					className='absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'
				/>
				<span className='absolute bottom-4 right-5 translate-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-mist-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
					visit ↗
				</span>
			</a>

			<div>
				<span className='font-display text-sm font-bold text-primary-300'>
					{String(index + 1).padStart(2, '0')}
				</span>
				<h3 className='mt-2 font-display text-2xl font-bold text-mist-100 md:text-3xl'>
					{project.title}
				</h3>
				<p className='mt-4 text-sm leading-relaxed text-mist-400'>
					{project.summary}
				</p>
				{project.technologies?.length > 0 && (
					<div className='mt-6 flex flex-wrap items-center gap-2'>
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
		</article>
	);
}
