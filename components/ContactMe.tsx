"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
type Props = {};

export default function ContactMe({}: Props) {
	return (
		<div className='relative flex flex-col items-center h-screen px-10 mx-auto text-center max-w-7xl justify-evenly md:text-left md:flex-row '>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Contact
			</h3>

			<div className='flex flex-col space-y-10'>
				<h4 className='text-4xl font-semibold text-center'>
					{`I've got what you need. `}
					<span className='underline decoration-primary/70'>
						{`Let's Talk!`}
					</span>
				</h4>
				<div className='space-y-10'>
					<div className='flex items-center justify-center space-x-5'>
						<PhoneIcon className='text-primary h-7 w-7 animate-pulse' />
						<p className='text-2xl'>+971564701952</p>
					</div>
					<div className='flex items-center justify-center space-x-5'>
						<EnvelopeIcon className='text-primary h-7 w-7 animate-pulse' />
						<p className='text-2xl'>peterjohn.hein@gmail.com</p>
					</div>
					<div className='flex items-center justify-center space-x-5'>
						<MapPinIcon className='text-primary h-7 w-7 animate-pulse' />
						<p className='text-2xl'>Abu Dhabi, UAE</p>
					</div>
				</div>

				<form className='flex flex-col mx-auto gap-y-2 w-fit'>
					<div className='flex space-x-2'>
						<input
							className='contactInput'
							placeholder='Name'
							type='text'
						/>
						<input
							className='contactInput'
							placeholder='Email'
							type='email'
						/>
					</div>
					<input
						className='contactInput'
						placeholder='Subject'
						type='text'
					/>
					<textarea
						placeholder='Message'
						className='contactInput'
						name=''
						id=''
					/>
					<button
						type='submit'
						className='px-10 py-5 text-lg font-bold text-white rounded-md bg-primary'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
