'use client';
import React from 'react';
import Image from 'next/image';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import sendEmail from '@/pipes/sendEmail';
import { Inputs } from '@/typings';
import { useState } from 'react';

type Props = {
	email: string;
	address: string;
	phoneNumber: string;
};

export default function ContactMe({ email, address, phoneNumber }: Props) {
	const { register, handleSubmit, reset } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		if (
			!formData.email ||
			!formData.message ||
			!formData.name ||
			!formData.subject
		)
			return;
		setLoading(true);
		sendEmail(formData)
			.then((res) => {
				reset();
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
		setLoading(false);
	};

	return (
		<div className='relative flex flex-col items-center h-screen px-10 mx-auto text-center max-w-7xl justify-evenly md:text-left md:flex-row '>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Contact
			</h3>

			<div className='flex flex-col mt-20 space-y-10 xl:mt-0'>
				<h4 className='flex flex-col text-3xl font-semibold text-center sm:text-4xl'>
					{`I've got what you need. `}
					<span className='underline decoration-primary/70'>
						{`Let's Talk!`}
					</span>
				</h4>
				<div className='space-y-10'>
					<div className='flex items-center justify-center space-x-5'>
						<PhoneIcon className='text-primary h-7 w-7 animate-pulse' />
						<p className='text-xl sm:text-2xl'>{phoneNumber}</p>
					</div>
					<div className='flex items-center justify-center space-x-5'>
						<EnvelopeIcon className='text-primary h-7 w-7 animate-pulse' />
						<p className='text-xl sm:text-2xl'>{email}</p>
					</div>
					<div className='flex items-center justify-center space-x-5'>
						<MapPinIcon className='text-primary h-7 w-7 animate-pulse' />
						<p className='text-xl sm:text-2xl'>{address}</p>
					</div>
				</div>

				<form
					className='flex flex-col w-screen p-5 mx-auto sm:p-0 gap-y-2 sm:w-fit'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex justify-center w-full gap-x-2'>
						<input
							className='w-1/2 contactInput'
							placeholder='Name'
							type='text'
							{...register('name')}
						/>
						<input
							className='w-1/2 contactInput'
							placeholder='Email'
							type='email'
							{...register('email')}
						/>
					</div>
					<input
						className='contactInput'
						placeholder='Subject'
						type='text'
						{...register('subject')}
					/>
					<textarea
						placeholder='Message'
						className='contactInput'
						{...register('message')}
					/>
					<button
						type='submit'
						disabled={loading}
						className='px-10 py-5 text-lg font-bold text-white rounded-md disabled:text-gray-500 bg-primary hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-primary/30 disabled:hover:bg-primary/30'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
