'use client';

import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import sendEmail from '@/pipes/sendEmail';
import { Inputs } from '@/typings';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
	email: string;
	address: string;
	phoneNumber: string;
};

export default function ContactMe({ email, address, phoneNumber }: Props) {
	const root = useRef<HTMLDivElement>(null);
	const { register, handleSubmit, reset } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		if (!formData.email || !formData.message || !formData.name || !formData.subject)
			return;
		setLoading(true);
		sendEmail(formData)
			.then(() => {
				setSent(true);
				reset();
			})
			.finally(() => setLoading(false));
	};

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.set('[data-contact-reveal]', { y: 30, autoAlpha: 0 });
				gsap.to('[data-contact-reveal]', {
					y: 0,
					autoAlpha: 1,
					duration: 0.85,
					ease: 'power3.out',
					stagger: 0.1,
					scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
				});
			});
		},
		{ scope: root },
	);

	return (
		<div ref={root} className='section-shell py-28 md:py-40'>
			<p data-contact-reveal className='label mb-4'>
				05 — contact
			</p>
			<h2
				data-contact-reveal
				className='max-w-3xl font-display text-4xl font-extrabold tracking-tight text-mist-100 md:text-6xl'
			>
				Let&apos;s build something
				<span className='text-primary-300'>.</span>
			</h2>

			<div className='mt-14 grid gap-14 md:grid-cols-[minmax(0,340px)_1fr] md:gap-20'>
				<div data-contact-reveal className='space-y-6 text-sm text-mist-400'>
					<p className='flex items-center gap-4'>
						<EnvelopeIcon className='h-5 w-5 text-primary-300' />
						{email}
					</p>
					<p className='flex items-center gap-4'>
						<PhoneIcon className='h-5 w-5 text-primary-300' />
						{phoneNumber}
					</p>
					<p className='flex items-center gap-4'>
						<MapPinIcon className='h-5 w-5 text-primary-300' />
						{address}
					</p>
				</div>

				<form
					data-contact-reveal
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-2'
				>
					<div className='grid gap-x-8 md:grid-cols-2'>
						<input
							{...register('name')}
							placeholder='Name'
							className='contactInput'
							type='text'
							autoComplete='name'
						/>
						<input
							{...register('email')}
							placeholder='Email'
							className='contactInput'
							type='email'
							autoComplete='email'
						/>
					</div>
					<input
						{...register('subject')}
						placeholder='Subject'
						className='contactInput'
						type='text'
					/>
					<textarea
						{...register('message')}
						placeholder='Message'
						rows={5}
						className='contactInput resize-none'
					/>
					<div className='pt-6'>
						<button
							type='submit'
							disabled={loading}
							className='pill-solid disabled:opacity-50'
						>
							{loading ? 'sending…' : sent ? 'sent ✓' : 'send message'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
