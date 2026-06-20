'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Pt = { x: number; y: number; mute?: boolean };

/**
 * SIGNAL — one luminous filament threading the whole document.
 *
 * It measures every [data-signal-node] anchor, weaves a single smooth path
 * through them, then draws that path as you scroll while a glowing node rides
 * the draw head. Section anchors light up as the head passes. Robust to
 * variable CMS content because the geometry is measured, never hard-coded.
 */

/** Catmull-Rom through the points, emitted as smooth cubic beziers. */
function buildPath(pts: Pt[]): string {
	if (pts.length < 2) return '';
	let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[i - 1] ?? pts[i];
		const p1 = pts[i];
		const p2 = pts[i + 1];
		const p3 = pts[i + 2] ?? p2;
		const c1x = p1.x + (p2.x - p0.x) / 6;
		const c1y = p1.y + (p2.y - p0.y) / 6;
		const c2x = p2.x - (p3.x - p1.x) / 6;
		const c2y = p2.y - (p3.y - p1.y) / 6;
		d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
	}
	return d;
}

export default function SignalLine() {
	const [geo, setGeo] = useState<{ w: number; h: number; d: string; nodes: Pt[] }>({
		w: 0,
		h: 0,
		d: '',
		nodes: [],
	});

	const pathRef = useRef<SVGPathElement>(null);
	const headRef = useRef<SVGGElement>(null);
	const nodeRefs = useRef<(SVGGElement | null)[]>([]);

	// measure anchors → weave a path through their centers
	useEffect(() => {
		const measure = () => {
			const anchors = Array.from(
				document.querySelectorAll<HTMLElement>('[data-signal-node]'),
			);
			if (!anchors.length) return;

			const w = window.innerWidth;
			const h = document.documentElement.scrollHeight;
			const scrollY = window.scrollY;
			const isMobile = w < 768;
			// keep the weave inside the viewport but generous in the gutters
			const amp = Math.min(w * 0.26, 360);
			const mid = w / 2;

			const nodes: Pt[] = anchors.map((el, i) => {
				const r = el.getBoundingClientRect();
				// data-signal-x-mobile lets the weave route differently on narrow screens
				const declared =
					isMobile && el.dataset.signalXMobile !== undefined
						? el.dataset.signalXMobile
						: el.dataset.signalX;
				const frac = declared !== undefined ? parseFloat(declared) : undefined;
				const x =
					frac !== undefined
						? frac * w
						: mid + (i % 2 === 0 ? -amp : amp);
				// muted anchors shape the path but draw no visible node (e.g. the
				// experience spine, where the timeline cards supply the dots)
				return {
					x,
					y: r.top + scrollY + r.height / 2,
					mute: el.dataset.signalMute !== undefined,
				};
			});

			setGeo({ w, h, d: buildPath(nodes), nodes });
		};

		measure();
		const onResize = () => requestAnimationFrame(measure);
		window.addEventListener('resize', onResize);
		window.addEventListener('load', measure);
		// re-measure once late assets (fonts / Sanity images) shift the layout
		const t = window.setTimeout(measure, 600);
		ScrollTrigger.addEventListener('refreshInit', measure);
		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('load', measure);
			window.clearTimeout(t);
			ScrollTrigger.removeEventListener('refreshInit', measure);
		};
	}, []);

	// draw on scroll + ride the head + light the nodes
	useEffect(() => {
		const path = pathRef.current;
		if (!path || !geo.d) return;

		const len = path.getTotalLength();
		gsap.set(path, { strokeDasharray: len });

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			gsap.set(path, { strokeDashoffset: 0 });
			if (headRef.current) headRef.current.style.opacity = '0';
			nodeRefs.current.forEach((n) => n?.classList.add('is-lit'));
			return;
		}

		gsap.set(path, { strokeDashoffset: len });
		const litUntil = { i: -1 };

		const draw = (p: number) => {
			path.style.strokeDashoffset = `${len * (1 - p)}`;
			const pt = path.getPointAtLength(len * p);
			if (headRef.current) {
				headRef.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
				headRef.current.style.opacity = p > 0.002 && p < 0.999 ? '1' : '0';
			}
			// light every node the head has passed (path descends monotonically in y)
			let lit = -1;
			for (let i = 0; i < geo.nodes.length; i++) {
				if (pt.y + 4 >= geo.nodes[i].y) lit = i;
			}
			if (lit !== litUntil.i) {
				nodeRefs.current.forEach((n, i) => n?.classList.toggle('is-lit', i <= lit));
				litUntil.i = lit;
			}
		};

		const st = ScrollTrigger.create({
			start: 0,
			end: () => Math.max(1, ScrollTrigger.maxScroll(window)),
			scrub: true,
			onUpdate: (self) => draw(self.progress),
			onRefresh: (self) => draw(self.progress),
		});
		draw(0);

		return () => st.kill();
	}, [geo.d, geo.nodes]);

	if (!geo.d) {
		// invisible placeholder until measured (anchors live in the sections)
		return null;
	}

	return (
		<svg
			className="signal-layer"
			style={{ height: geo.h }}
			width={geo.w}
			height={geo.h}
			viewBox={`0 0 ${geo.w} ${geo.h}`}
			preserveAspectRatio="none"
			aria-hidden
		>
			<defs>
				<linearGradient
					id="signal-grad"
					x1="0"
					y1="0"
					x2="0"
					y2={geo.h}
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#812039" />
					<stop offset="0.5" stopColor="#a83a55" />
					<stop offset="1" stopColor="#c4566f" />
				</linearGradient>
				<filter id="signal-glow" x="-200%" y="-200%" width="500%" height="500%">
					<feGaussianBlur stdDeviation="5" />
				</filter>
			</defs>

			<path className="signal-ghost" d={geo.d} />
			<path ref={pathRef} className="signal-path" d={geo.d} />

			{geo.nodes.map((n, i) =>
				n.mute ? null : (
					<g
						key={i}
						className="signal-node"
						ref={(el) => {
							nodeRefs.current[i] = el;
						}}
					>
						<circle className="signal-node-ring" cx={n.x} cy={n.y} r="11" />
						<circle className="signal-node-dot" cx={n.x} cy={n.y} r="3.5" />
					</g>
				),
			)}

			<g ref={headRef} className="signal-head-group" style={{ opacity: 0 }}>
				<circle className="signal-head-halo" r="9" filter="url(#signal-glow)" />
				<circle className="signal-head" r="3.5" />
			</g>
		</svg>
	);
}
