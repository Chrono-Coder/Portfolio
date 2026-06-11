import Image from 'next/image';
import { Technology } from '@/typings';
import { urlFor } from '@/util/helper';

export default function Skill({ technology }: { technology: Technology }) {
	return (
		<div className='group flex shrink-0 items-center gap-3 rounded-full border border-carbon-600 bg-carbon-800/60 py-2.5 pl-3 pr-6 transition-colors duration-300 hover:border-primary-400/70'>
			<Image
				src={urlFor(technology.image).url()}
				alt={technology.title}
				width={32}
				height={32}
				className='h-8 w-8 rounded-full object-contain'
			/>
			<span className='text-sm font-medium text-mist-300 transition-colors group-hover:text-mist-100'>
				{technology.title}
			</span>
		</div>
	);
}
