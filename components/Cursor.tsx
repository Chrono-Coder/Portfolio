'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Maroon dot + trailing ring; ring swells over links/buttons. Fine pointers only. */
export default function Cursor() {
	const dot = useRef<HTMLDivElement>(null);
	const ring = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const d = dot.current!;
		const r = ring.current!;
		d.style.display = r.style.display = 'block';

		const dx = gsap.quickTo(d, 'x', { duration: 0.08, ease: 'power2.out' });
		const dy = gsap.quickTo(d, 'y', { duration: 0.08, ease: 'power2.out' });
		const rx = gsap.quickTo(r, 'x', { duration: 0.35, ease: 'power3.out' });
		const ry = gsap.quickTo(r, 'y', { duration: 0.35, ease: 'power3.out' });

		const onMove = (e: PointerEvent) => {
			dx(e.clientX); dy(e.clientY);
			rx(e.clientX); ry(e.clientY);
		};
		const onOver = (e: PointerEvent) => {
			const hot = (e.target as HTMLElement).closest('a, button, [data-cursor]');
			r.classList.toggle('is-hover', !!hot);
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('pointerover', onOver, { passive: true });
		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerover', onOver);
		};
	}, []);

	return (
		<>
			<div ref={dot} className='cursor-dot' style={{ display: 'none' }} aria-hidden />
			<div ref={ring} className='cursor-ring' style={{ display: 'none' }} aria-hidden />
		</>
	);
}
