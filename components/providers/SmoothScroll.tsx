'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scroll driven by the GSAP ticker; off under reduced motion. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReduced(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	useEffect(() => {
		if (reduced) return;

		const lenis = new Lenis({
			duration: 1.1,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		lenis.on('scroll', ScrollTrigger.update);
		const tick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		const onClick = (e: MouseEvent) => {
			const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
				'a[href^="#"]',
			);
			if (!link || link.origin !== location.origin) return;
			const el = document.querySelector(link.hash);
			if (!el) return;
			e.preventDefault();
			history.pushState(null, '', link.hash);
			lenis.scrollTo(el as HTMLElement, { offset: -72 });
		};
		document.addEventListener('click', onClick);

		return () => {
			document.removeEventListener('click', onClick);
			gsap.ticker.remove(tick);
			gsap.ticker.lagSmoothing(500, 33);
			lenis.destroy();
		};
	}, [reduced]);

	return <>{children}</>;
}
