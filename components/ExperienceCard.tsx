"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type Props = {
	experience: {
		position: string;
		company: string;
		startTime: string;
		endTime: string;
	};
};

export default function ExperienceCard({ experience }: Props) {
	const { position, company, startTime, endTime } = experience;
	return (
		<article className='bg-[#292929] p-10 opacity-40 hover:opacity-100 snap-center cursor-pointer transition-opacity duration-200 overflow-hidden flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px]'>
			<motion.img
				initial={{
					opacity: 0,
					y: -100,
				}}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				src='/images/bmnd.png'
				width={300}
				height={300}
				alt=''
				className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center'
			/>
			<div className='px-0 md:px-10'>
				<h4 className='text-4xl font-light'>{position}</h4>
				<p className='mt-1 text-2xl font-bold'>{company}</p>
				<div className='flex my-2 space-x-2'>
					{/* Tech used */}
					<Image
						src='https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'
						width={50}
						height={50}
						alt='NextJS'
						className='w-10 h-10 rounded-full'
					/>
				</div>
				<p className='py-5 text-gray-300 uppercase'>
					Started work {startTime} - Ended {endTime}
				</p>
				<ul className='ml-5 space-y-4 text-lg list-disc'>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</article>
	);
}
