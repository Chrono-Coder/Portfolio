'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PageInfo } from '@/typings';
import { urlFor } from '@/util/helper';
import { Traced } from '@/components/svg/Traced';

gsap.registerPlugin(useGSAP);

const HeroSilk = dynamic(() => import('@/components/canvas/HeroSilk'), {
	ssr: false,
});

const DESCRIPTORS = ['full-stack developer', 'ai enthusiast', 'beautiful mind'];

export default function Hero({ pageInfo }: { pageInfo: PageInfo }) {
	const root = useRef<HTMLDivElement>(null);
	const nameRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-hero-reveal]', { y: 30, autoAlpha: 0 });
				gsap.set('[data-hero-avatar]', { scale: 0.8, autoAlpha: 0 });
				gsap
					.timeline({ defaults: { ease: 'expo.out' } })
					.to('[data-hero-avatar]', { scale: 1, autoAlpha: 1, duration: 0.9 }, 0.1)
					.to('[data-hero-reveal]', { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.1 }, 0.25);

				// flashlight pool follows the pointer across the giant name
				const name = nameRef.current;
				if (name) {
					const setX = gsap.quickTo(name, '--mx', { duration: 0.4, ease: 'power3.out', unit: '%' });
					const setY = gsap.quickTo(name, '--my', { duration: 0.4, ease: 'power3.out', unit: '%' });
					const onMove = (e: PointerEvent) => {
						const r = name.getBoundingClientRect();
						setX(((e.clientX - r.left) / r.width) * 100);
						setY(((e.clientY - r.top) / r.height) * 100);
					};
					window.addEventListener('pointermove', onMove, { passive: true });
					// idle drift so touch devices still see the pool move
					gsap.to(name, {
						'--mx': '70%',
						duration: 7,
						ease: 'sine.inOut',
						repeat: -1,
						yoyo: true,
					});
					return () => window.removeEventListener('pointermove', onMove);
				}

				// rotating descriptor
				const words = gsap.utils.toArray<HTMLElement>('[data-word]');
				if (words.length > 1) {
					gsap.set(words.slice(1), { autoAlpha: 0, y: 14 });
					const cycle = gsap.timeline({ repeat: -1, delay: 2.4 });
					words.forEach((w, i) => {
						const next = words[(i + 1) % words.length];
						cycle
							.to(w, { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power3.in' }, '+=2.1')
							.fromTo(next, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '<0.15');
					});
				}
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='relative flex min-h-[100svh] flex-col justify-center overflow-clip'>
			<HeroSilk />

			<div className='section-shell relative z-10 pt-20'>
				<div className='flex items-center gap-5' data-hero-reveal>
					{pageInfo?.heroImage && (
						<div data-hero-avatar className='relative shrink-0'>
							<Image
								src={urlFor(pageInfo.heroImage).url()}
								width={84}
								height={84}
								priority
								alt={pageInfo.title}
								className='h-[76px] w-[76px] rounded-full object-cover ring-1 ring-primary-400/70'
							/>
							<Traced
								viewBox='0 0 100 100'
								d='M50 3 a47 47 0 1 1 -0.01 0'
								strokeWidth={2}
								scrub={false}
								start='top 95%'
								className='absolute -inset-[7px] h-[calc(100%+14px)] w-[calc(100%+14px)]'
							/>
						</div>
					)}
					<p className='label'>{pageInfo?.role}</p>
				</div>

				<div
					ref={nameRef}
					data-hero-reveal
					className='relative mt-8 select-none'
				>
					<h1 className='flashlight font-display text-[clamp(3.2rem,11.5vw,9.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight'>
						{pageInfo?.title}
					</h1>
					<h1
						aria-hidden
						className='flashlight-fill pointer-events-none absolute inset-0 font-display text-[clamp(3.2rem,11.5vw,9.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight'
					>
						{pageInfo?.title}
					</h1>
				</div>

				<div data-hero-reveal className='mt-8 flex flex-wrap items-center gap-x-10 gap-y-6'>
					<div className='relative h-7 w-64 text-lg text-mist-400'>
						{DESCRIPTORS.map((w, i) => (
							<span key={w} data-word className={`absolute left-0 top-0 ${i > 0 ? 'invisible' : ''}`}>
								{w}
							</span>
						))}
					</div>
					<div className='flex gap-4'>
						<Link href='#projects' className='pill-solid'>
							view work
						</Link>
						<Link href='#contact' className='pill-ghost'>
							contact
						</Link>
					</div>
				</div>
			</div>

			<div className='absolute bottom-7 left-1/2 z-10 -translate-x-1/2'>
				<Traced
					viewBox='0 0 24 80'
					d='M12 2 v60 m0 0 l-7 -10 m7 10 l7 -10'
					strokeWidth={1.5}
					scrub={false}
					start='top 99%'
					className='h-16 w-6 opacity-60'
				/>
			</div>
		</div>
	);
}
