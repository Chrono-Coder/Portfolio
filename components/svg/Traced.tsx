'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * SVG paths that draw themselves as they scroll into view —
 * stroke-dash tracing scrubbed against the viewport.
 */
export function Traced({
	d,
	viewBox,
	className,
	strokeWidth = 1.5,
	scrub = true,
	stroke = '#a83a55',
	start = 'top 85%',
	end = 'bottom 35%',
}: {
	d: string;
	viewBox: string;
	className?: string;
	strokeWidth?: number;
	scrub?: boolean;
	stroke?: string;
	start?: string;
	end?: string;
}) {
	const ref = useRef<SVGSVGElement>(null);

	useGSAP(
		() => {
			const path = ref.current?.querySelector('path');
			if (!path) return;
			const len = path.getTotalLength();
			gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.to(path, {
					strokeDashoffset: 0,
					ease: scrub ? 'none' : 'power2.out',
					duration: scrub ? 1 : 1.6,
					scrollTrigger: {
						trigger: ref.current,
						start,
						...(scrub ? { end, scrub: true } : { once: true }),
					},
				});
			});
			mm.add('(prefers-reduced-motion: reduce)', () => {
				gsap.set(path, { strokeDashoffset: 0 });
			});
		},
		{ scope: ref },
	);

	return (
		<svg
			ref={ref}
			viewBox={viewBox}
			fill='none'
			aria-hidden
			preserveAspectRatio='none'
			className={className}
		>
			<path d={d} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap='round' />
		</svg>
	);
}

/** A long snaking divider line — drops below a section heading. */
export function TraceDivider({ flip }: { flip?: boolean }) {
	return (
		<Traced
			viewBox='0 0 1200 120'
			d={
				flip
					? 'M1200 20 C 900 20, 980 100, 660 95 S 240 30, 0 70'
					: 'M0 20 C 300 20, 220 100, 540 95 S 960 30, 1200 70'
			}
			className='pointer-events-none h-[72px] w-full opacity-70'
		/>
	);
}
