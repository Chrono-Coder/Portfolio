'use client';

import { useEffect, useRef } from 'react';
import { Project } from '@/typings';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

/**
 * A free horizontal rail — drag, swipe or trackpad-scroll sideways. No pinning,
 * no scroll hijack: vertical scrolling passes straight through. Compact, so the
 * deck never bloats the page.
 */
export default function Projects({ projects }: { projects: Project[] }) {
	const scroller = useRef<HTMLDivElement>(null);
	const counter = useRef<HTMLSpanElement>(null);
	const total = projects?.length ?? 0;

	// drag-to-scroll for mouse users; touch + trackpad scroll natively
	useEffect(() => {
		const el = scroller.current;
		if (!el) return;

		let down = false;
		let startX = 0;
		let startScroll = 0;
		let moved = 0;

		const onDown = (e: PointerEvent) => {
			if (e.pointerType === 'touch') return;
			down = true;
			moved = 0;
			startX = e.clientX;
			startScroll = el.scrollLeft;
			el.setPointerCapture(e.pointerId);
			el.classList.add('is-grabbing');
		};
		const onMove = (e: PointerEvent) => {
			if (!down) return;
			const dx = e.clientX - startX;
			moved = Math.max(moved, Math.abs(dx));
			el.scrollLeft = startScroll - dx;
		};
		const onUp = () => {
			if (!down) return;
			down = false;
			el.classList.remove('is-grabbing');
			if (moved > 6) {
				// swallow the click that follows a drag so cards don't navigate
				const swallow = (ev: MouseEvent) => {
					ev.preventDefault();
					ev.stopPropagation();
				};
				el.addEventListener('click', swallow, { capture: true, once: true });
				window.setTimeout(() => el.removeEventListener('click', swallow, true), 50);
			}
		};
		const onScroll = () => {
			if (!counter.current || total === 0) return;
			const max = el.scrollWidth - el.clientWidth;
			const p = max > 0 ? el.scrollLeft / max : 0;
			const idx = Math.min(total, Math.round(p * (total - 1)) + 1);
			counter.current.textContent = String(idx).padStart(2, '0');
		};

		el.addEventListener('pointerdown', onDown);
		el.addEventListener('pointermove', onMove);
		el.addEventListener('pointerup', onUp);
		el.addEventListener('pointercancel', onUp);
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			el.removeEventListener('pointerdown', onDown);
			el.removeEventListener('pointermove', onMove);
			el.removeEventListener('pointerup', onUp);
			el.removeEventListener('pointercancel', onUp);
			el.removeEventListener('scroll', onScroll);
		};
	}, [total]);

	return (
		<div className='py-20 md:py-28'>
			<SectionTitle index='02' title="Things I've built" />

			<div className='section-shell mt-8 flex items-baseline justify-between'>
				<span className='label'>drag to explore →</span>
				<span className='font-display text-sm font-bold text-mist-500'>
					<span ref={counter} className='text-primary-300'>
						01
					</span>{' '}
					/ {String(total).padStart(2, '0')}
				</span>
			</div>

			<div
				ref={scroller}
				className='rail-scroll mt-6 cursor-grab overflow-x-auto overscroll-x-contain [&.is-grabbing]:cursor-grabbing'
			>
				<div className='flex w-max items-stretch gap-5 px-6 py-4 md:gap-6 md:px-10'>
					{projects?.map((project, i) => (
						<ProjectCard key={project._id} project={project} index={i} total={total} />
					))}
					<div aria-hidden className='w-2 shrink-0 md:w-8' />
				</div>
			</div>
		</div>
	);
}
