'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

/**
 * SIGNAL CORE — a noise-displaced icosphere with a maroon fresnel rim-glow and
 * a faint additive wireframe shell. Reacts to the pointer, morphs + fades on
 * scroll. The hero's first signal node is anchored to it so the filament reads
 * as if it emanates from this form.
 */

// Ashima / webgl-noise simplex 3D — inlined so we add no dependency.
const SNOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx;
  vec3 x2=x0-i2+2.0*C.xxx;
  vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(
        i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
varying float vFresnel;
varying float vNoise;
${SNOISE}
void main(){
  vec3 p = normalize(position);
  float t = uTime * 0.22;
  float n = snoise(p * 1.35 + vec3(0.0, 0.0, t));
  float n2 = snoise(p * 3.1 - vec3(t, 0.0, 0.0)) * 0.45;
  float amp = 0.30 + uScroll * 0.55;
  float disp = (n + n2) * amp;
  float pinch = dot(p, normalize(vec3(uPointer * 1.4, 0.6)));
  disp += smoothstep(0.45, 1.0, pinch) * 0.18;
  vNoise = n;

  vec3 displaced = position + normal * disp;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vec3 wN = normalize(normalMatrix * normal);
  vec3 viewDir = normalize(-mv.xyz);
  vFresnel = pow(1.0 - clamp(dot(wN, viewDir), 0.0, 1.0), 2.1);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG_SOLID = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
varying float vFresnel;
varying float vNoise;
void main(){
  vec3 base = mix(uColorA, uColorB, smoothstep(-0.5, 0.85, vNoise));
  vec3 col = mix(base, vec3(1.0, 0.92, 0.95), vFresnel * 0.85);
  float a = (0.5 + vFresnel * 0.5) * uOpacity;
  gl_FragColor = vec4(col, a);
}
`;

const FRAG_WIRE = /* glsl */ `
uniform float uOpacity;
varying float vFresnel;
varying float vNoise;
void main(){
  float tint = 0.04 * smoothstep(-0.5, 0.85, vNoise);
  gl_FragColor = vec4(vec3(0.77 + tint, 0.34, 0.43), (0.10 + vFresnel * 0.22) * uOpacity);
}
`;

function Core({ reduced, paused }: { reduced: boolean; paused: boolean }) {
	const group = useRef<THREE.Group>(null);
	const pointer = useRef({ x: 0, y: 0 });
	const invalidate = useThree((s) => s.invalidate);

	const { geometry, solid, wire, uniforms } = useMemo(() => {
		const uniforms = {
			uTime: { value: 0 },
			uScroll: { value: 0 },
			uOpacity: { value: 1 },
			uPointer: { value: new THREE.Vector2(0, 0) },
			uColorA: { value: new THREE.Color('#812039') },
			uColorB: { value: new THREE.Color('#c4566f') },
		};
		const geometry = new THREE.IcosahedronGeometry(1.5, 24);
		const solid = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: VERT,
			fragmentShader: FRAG_SOLID,
			transparent: true,
			depthWrite: false,
		});
		const wire = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: VERT,
			fragmentShader: FRAG_WIRE,
			transparent: true,
			depthWrite: false,
			wireframe: true,
			blending: THREE.AdditiveBlending,
		});
		return { geometry, solid, wire, uniforms };
	}, []);

	useEffect(() => {
		return () => {
			geometry.dispose();
			solid.dispose();
			wire.dispose();
		};
	}, [geometry, solid, wire]);

	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		return () => window.removeEventListener('pointermove', onMove);
	}, []);

	// place the form center-right & full size on wide screens; smaller, centered
	// and higher on narrow ones so it sits behind the name rather than drowning it
	useEffect(() => {
		const place = () => {
			if (!group.current) return;
			const wide = window.innerWidth / window.innerHeight > 1;
			// keep the orb clear of the name/role: pushed right on desktop, lifted
			// above the name on mobile
			group.current.position.x = wide ? 2.0 : 0;
			group.current.position.y = wide ? 0.1 : 1.25;
			group.current.scale.setScalar(wide ? 0.82 : 0.5);
			invalidate(); // reflect placement even in demand/reduced-motion mode
		};
		place();
		window.addEventListener('resize', place);
		return () => window.removeEventListener('resize', place);
	}, [invalidate]);

	useFrame((_, rawDelta) => {
		if (paused) return;
		const delta = Math.min(rawDelta, 0.05);
		const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));

		uniforms.uScroll.value += (p - uniforms.uScroll.value) * 0.06;
		uniforms.uOpacity.value = 1 - p * 0.92;
		uniforms.uPointer.value.x += (pointer.current.x - uniforms.uPointer.value.x) * 0.05;
		uniforms.uPointer.value.y += (-pointer.current.y - uniforms.uPointer.value.y) * 0.05;
		if (!reduced) uniforms.uTime.value += delta;

		if (group.current) {
			group.current.rotation.y += (reduced ? 0 : delta * 0.12) +
				(pointer.current.x * 0.5 - group.current.rotation.y) * 0.03;
			group.current.rotation.x +=
				(-pointer.current.y * 0.3 - group.current.rotation.x) * 0.03;
		}
	});

	return (
		<group ref={group}>
			<mesh geometry={geometry} material={solid} />
			<mesh geometry={geometry} material={wire} scale={1.04} />
		</group>
	);
}

export default function SignalCore({ className }: { className?: string }) {
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
				camera={{ fov: 42, position: [0, 0, 4.4], near: 0.1, far: 60 }}
				dpr={[1, 2]}
				gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
				frameloop={reduced || paused ? 'demand' : 'always'}
			>
				<Core reduced={reduced} paused={paused} />
			</Canvas>
			{/* vignette into the page bed */}
			<div
				className="absolute inset-0"
				style={{
					background:
						'radial-gradient(ellipse 75% 70% at 62% 45%, transparent 35%, #121011 100%)',
				}}
			/>
			<div
				className="absolute inset-x-0 bottom-0 h-44"
				style={{ background: 'linear-gradient(to bottom, transparent, #121011)' }}
			/>
		</div>
	);
}
