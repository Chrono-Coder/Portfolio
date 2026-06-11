'use client';

import { Technology } from '@/typings';
import Image from 'next/image';
import { urlFor } from '@/util/helper';
import SectionTitle from './SectionTitle';

/**
 * Two angled full-bleed bands: a solid maroon marquee and an outlined
 * counter-rotating one — the stack as a statement, not a grid.
 */
export default function Skills({ technologies }: { technologies: Technology[] }) {
	const names = technologies.map((t) => t.title);
	return (
		<div className='overflow-clip py-24 md:py-32'>
			<SectionTitle index='03' ghost='stack' title='Tools I reach for' />
			<div className='-mx-6 mt-12 space-y-6'>
				<div className='rotate-[-2deg] bg-primary py-4 shadow-[0_0_80px_-20px_rgba(129,32,57,0.8)]'>
					<MarqueeText items={names} className='text-carbon-950' />
				</div>
				<div className='rotate-[1.5deg] border-y border-carbon-700 py-4'>
					<MarqueeText items={names} reverse outline />
				</div>
			</div>

			{/* icon strip — the actual logos, quiet under the shout */}
			<div className='section-shell mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 opacity-80'>
				{technologies.map((t) => (
					<Image
						key={t._id}
						src={urlFor(t.image).url()}
						alt={t.title}
						title={t.title}
						width={34}
						height={34}
						className='h-8 w-8 rounded-full object-contain grayscale transition-all duration-300 hover:scale-110 hover:grayscale-0'
					/>
				))}
			</div>
		</div>
	);
}

function MarqueeText({
	items,
	reverse,
	outline,
	className = '',
}: {
	items: string[];
	reverse?: boolean;
	outline?: boolean;
	className?: string;
}) {
	const anim = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
	return (
		<div className='overflow-hidden'>
			<div className={`flex w-max items-center gap-8 ${anim}`}>
				{[0, 1].map((copy) => (
					<div key={copy} aria-hidden={copy === 1} className='flex items-center gap-8'>
						{items.map((n) => (
							<span
								key={`${copy}-${n}`}
								className={`whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-wide md:text-4xl ${
									outline ? 'text-outline-maroon' : className
								}`}
							>
								{n} <span className='mx-2 align-middle text-base'>✦</span>
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
