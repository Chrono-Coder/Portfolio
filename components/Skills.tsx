'use client';

import { Technology } from '@/typings';
import Image from 'next/image';
import { urlFor } from '@/util/helper';
import SectionTitle from './SectionTitle';

/**
 * Minimal stack — a quiet grid of logos that warm to colour on hover.
 * No banners, no shouting; the restraint is the point.
 */
export default function Skills({ technologies }: { technologies: Technology[] }) {
	return (
		<div className='py-20 md:py-28'>
			<SectionTitle index='03' title='Tools I reach for' />
			<div className='section-shell mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:mt-14 md:grid-cols-4'>
				{technologies?.map((t) => (
					<div
						key={t._id}
						className='group flex items-center gap-3 border-b border-carbon-700 pb-4'
					>
						<Image
							src={urlFor(t.image).url()}
							alt={t.title}
							width={28}
							height={28}
							className='h-7 w-7 shrink-0 rounded-md object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'
						/>
						<span className='truncate text-sm text-mist-400 transition-colors duration-300 group-hover:text-mist-100'>
							{t.title}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
