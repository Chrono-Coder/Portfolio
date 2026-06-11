'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

/**
 * "Silk" — a slow river of particles flowing along braided curves,
 * maroon-to-rose on charcoal. Organic, editorial, calm.
 */

const COLORS = ['#812039', '#a83a55', '#c4566f', '#5e1628', '#827c7e'];
const CURVES = 5;
const SAMPLES = 512;
const PER_CURVE = 1100;

function makeRoute(seed: number): THREE.Vector3[] {
	// deterministic control points per curve — a loose diagonal band
	const pts: THREE.Vector3[] = [];
	const n = 6;
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const wob = Math.sin(seed * 12.9898 + i * 4.1414) * 1.6;
		const wob2 = Math.cos(seed * 7.233 + i * 2.71) * 0.9;
		pts.push(
			new THREE.Vector3(
				-10 + t * 20,
				-2.2 + t * 3.6 + wob * (0.35 + 0.4 * Math.sin(t * Math.PI)),
				-1.5 + wob2,
			),
		);
	}
	return pts;
}

function Silk({ reduced, paused }: { reduced: boolean; paused: boolean }) {
	const group = useRef<THREE.Group>(null);
	const pointer = useRef({ x: 0, y: 0 });

	const [scene] = useState(() => {
		const tables: Float32Array[] = [];
		const clouds: {
			geo: THREE.BufferGeometry;
			mat: THREE.PointsMaterial;
			ts: Float32Array;
			speeds: Float32Array;
			jit: Float32Array;
			table: Float32Array;
		}[] = [];

		for (let c = 0; c < CURVES; c++) {
			const curve = new THREE.CatmullRomCurve3(makeRoute(c + 1));
			const table = new Float32Array(SAMPLES * 3);
			for (let s = 0; s < SAMPLES; s++) {
				const p = curve.getPointAt(s / (SAMPLES - 1));
				table[s * 3] = p.x;
				table[s * 3 + 1] = p.y;
				table[s * 3 + 2] = p.z;
			}
			tables.push(table);

			const ts = new Float32Array(PER_CURVE);
			const speeds = new Float32Array(PER_CURVE);
			const jit = new Float32Array(PER_CURVE * 3);
			const pos = new Float32Array(PER_CURVE * 3);
			for (let i = 0; i < PER_CURVE; i++) {
				// deterministic pseudo-random
				const r1 = ((i * 9301 + c * 49297) % 233280) / 233280;
				const r2 = ((i * 233 + c * 9973) % 1979) / 1979;
				const r3 = ((i * 7919 + c * 104729) % 7717) / 7717;
				ts[i] = r1;
				speeds[i] = 0.014 + r2 * 0.02;
				jit[i * 3] = (r2 - 0.5) * 0.5;
				jit[i * 3 + 1] = (r3 - 0.5) * 0.5;
				jit[i * 3 + 2] = (r1 - 0.5) * 0.6;
			}
			const geo = new THREE.BufferGeometry();
			geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
			const mat = new THREE.PointsMaterial({
				color: new THREE.Color(COLORS[c % COLORS.length]),
				size: 0.045,
				transparent: true,
				opacity: c === 4 ? 0.35 : 0.8,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
				sizeAttenuation: true,
			});
			clouds.push({ geo, mat, ts, speeds, jit, table });
		}
		return { clouds };
	});

	// initial placement (also the reduced-motion still frame)
	useEffect(() => {
		for (const cl of scene.clouds) {
			const pos = cl.geo.getAttribute('position') as THREE.BufferAttribute;
			for (let i = 0; i < PER_CURVE; i++) {
				const idx = Math.min(SAMPLES - 1, Math.floor(cl.ts[i] * SAMPLES));
				pos.setXYZ(
					i,
					cl.table[idx * 3] + cl.jit[i * 3],
					cl.table[idx * 3 + 1] + cl.jit[i * 3 + 1],
					cl.table[idx * 3 + 2] + cl.jit[i * 3 + 2],
				);
			}
			pos.needsUpdate = true;
		}
		const clouds = scene.clouds;
		return () => {
			for (const cl of clouds) {
				cl.geo.dispose();
				cl.mat.dispose();
			}
		};
	}, [scene]);

	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		return () => window.removeEventListener('pointermove', onMove);
	}, []);

	useFrame((state, rawDelta) => {
		if (reduced || paused) return;
		const delta = Math.min(rawDelta, 0.05);

		const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
		state.camera.position.z = 9 - p * 1.6;

		if (group.current) {
			group.current.rotation.y +=
				(pointer.current.x * 0.07 - group.current.rotation.y) * 0.04;
			group.current.rotation.x +=
				(-pointer.current.y * 0.05 - group.current.rotation.x) * 0.04;
		}

		for (const cl of scene.clouds) {
			const pos = cl.geo.getAttribute('position') as THREE.BufferAttribute;
			for (let i = 0; i < PER_CURVE; i++) {
				let t = cl.ts[i] + cl.speeds[i] * delta;
				if (t >= 1) t -= 1;
				cl.ts[i] = t;
				const idx = Math.min(SAMPLES - 1, Math.floor(t * SAMPLES));
				pos.setXYZ(
					i,
					cl.table[idx * 3] + cl.jit[i * 3],
					cl.table[idx * 3 + 1] + cl.jit[i * 3 + 1],
					cl.table[idx * 3 + 2] + cl.jit[i * 3 + 2],
				);
			}
			pos.needsUpdate = true;
			cl.mat.opacity = (cl.mat.userData.base ?? cl.mat.opacity) * (1 - p);
			if (cl.mat.userData.base === undefined)
				cl.mat.userData.base = cl.mat.opacity;
		}
	});

	return (
		<group ref={group}>
			{scene.clouds.map((cl, i) => (
				<points key={i} geometry={cl.geo} material={cl.mat} />
			))}
		</group>
	);
}

export default function HeroSilk({ className }: { className?: string }) {
	const [reduced, setReduced] = useState(
		() =>
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches,
	);
	const [paused, setPaused] = useState(false);
	const wrap = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
		mq.addEventListener('change', onChange);
		const io = new IntersectionObserver(
			([entry]) => setPaused(!entry.isIntersecting),
			{ threshold: 0 },
		);
		if (wrap.current) io.observe(wrap.current);
		return () => {
			mq.removeEventListener('change', onChange);
			io.disconnect();
		};
	}, []);

	return (
		<div
			ref={wrap}
			aria-hidden
			className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
		>
			<Canvas
				camera={{ fov: 42, position: [0, 0, 9], near: 0.1, far: 60 }}
				dpr={[1, 2]}
				gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
				frameloop={reduced || paused ? 'demand' : 'always'}
			>
				<Silk reduced={reduced} paused={paused} />
			</Canvas>
			{/* vignette into the page bed */}
			<div
				className='absolute inset-0'
				style={{
					background:
						'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, #121011 100%)',
				}}
			/>
			<div
				className='absolute inset-x-0 bottom-0 h-44'
				style={{ background: 'linear-gradient(to bottom, transparent, #121011)' }}
			/>
		</div>
	);
}
