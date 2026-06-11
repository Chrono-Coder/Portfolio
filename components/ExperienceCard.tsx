import Image from 'next/image';
import { Experience } from '@/typings';
import { urlFor } from '@/util/helper';

function fmt(date: string) {
	if (!date) return '';
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	});
}

export default function ExperienceCard({
	experience,
	index,
}: {
	experience: Experience;
	index: number;
}) {
	const left = index % 2 === 0;
	return (
		<div data-exp-card className='relative md:grid md:grid-cols-2 md:gap-16'>
			{/* node on the spine */}
			<span
				aria-hidden
				className='absolute left-[3px] top-2 h-[9px] w-[9px] rounded-full bg-primary-300 ring-4 ring-bg-primary md:left-1/2 md:-translate-x-1/2'
			/>

			<div
				className={`pl-8 md:pl-0 ${
					left ? 'md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4'
				}`}
			>
				<div
					className={`flex items-center gap-4 pl-0 ${
						left ? 'md:flex-row-reverse' : ''
					}`}
				>
					{experience.companyLogo && (
						<Image
							src={urlFor(experience.companyLogo).url()}
							alt={experience.companyName}
							width={48}
							height={48}
							className='h-12 w-12 rounded-xl border border-carbon-600 bg-carbon-800 object-contain p-1.5'
						/>
					)}
					<div>
						<h3 className='font-display text-lg font-bold text-mist-100'>
							{experience.jobtitle}
						</h3>
						<p className='text-sm text-primary-300'>{experience.companyName}</p>
					</div>
				</div>

				<p className='mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-mist-600'>
					{fmt(experience.dateStarted)} —{' '}
					{experience.isCurrentlyWorkingThere ? 'present' : fmt(experience.dateEnded)}
				</p>

				{experience.technologies?.length > 0 && (
					<div
						className={`mt-4 flex flex-wrap gap-2 ${
							left ? 'md:justify-end' : ''
						}`}
					>
						{experience.technologies.map((t) => (
							<Image
								key={t._id}
								src={urlFor(t.image).url()}
								alt={t.title}
								title={t.title}
								width={24}
								height={24}
								className='h-6 w-6 rounded-full object-contain'
							/>
						))}
					</div>
				)}

				<ul
					className={`mt-5 space-y-2 text-sm leading-relaxed text-mist-400 ${
						left ? 'md:[direction:rtl]' : ''
					}`}
				>
					{experience.points?.map((point, i) => (
						<li key={i} className='[direction:ltr]'>
							<span className='mr-2 text-primary-300'>—</span>
							{point}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
