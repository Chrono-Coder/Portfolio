"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Experience } from "@/typings";
import { urlFor } from "@/util/sanity";
type Props = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
	const {
		jobtitle,
		companyName,
		dateStarted,
		dateEnded,
		isCurrentlyWorkingThere,
		technologies,
		points,
	} = experience;
	return (
		<article className='bg-[#292929] p-10 opacity-40 hover:opacity-100 snap-center cursor-pointer transition-opacity duration-200 overflow-hidden flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[700px]'>
			<motion.img
				initial={{
					opacity: 0,
					y: -100,
				}}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				src={urlFor(experience.companyLogo).url()}
				width={300}
				height={300}
				alt=''
				className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center'
			/>
			<div className='px-0 md:px-10'>
				<h4 className='text-4xl font-light'>{jobtitle}</h4>
				<p className='mt-1 text-2xl font-bold'>{companyName}</p>
				<div className='flex my-2 space-x-2'>
					{technologies.splice(0, 5).map((tech) => (
						<Image
							key={tech._id}
							src={urlFor(tech.image).url()}
							width={50}
							height={50}
							alt={tech.title}
							className='object-contain w-10 h-10 rounded-full'
						/>
					))}
				</div>
				<p className='py-5 text-gray-300 uppercase'>
					{dateStarted} -{" "}
					{isCurrentlyWorkingThere ? "Present" : dateEnded}
				</p>
				<ul className='ml-5 space-y-4 text-lg list-disc'>
					{points.map((point, i) => (
						<li key={i}>{point}</li>
					))}
				</ul>
			</div>
		</article>
	);
}
