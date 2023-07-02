import Image from "next/image";
import React from "react";
import { Experience } from "@/typings";
import { urlFor } from "@/util/sanity";
import { motion } from "framer-motion";

type Props = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
	return (
		<article className='bg-[#292929] py-12 px-6 w-full md:p-10 opacity-40 hover:opacity-100 snap-center cursor-pointer transition-opacity duration-200 overflow-hidden flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 sm:w-[500px] md:w-[600px] xl:w-[700px]'>
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
				<h4 className='text-4xl font-light'>{experience.jobtitle}</h4>
				<p className='mt-1 text-2xl font-bold'>
					{experience.companyName}
				</p>
				<div className='flex my-2 space-x-2'>
					{experience.technologies.splice(0, 4).map((tech) => (
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
					{experience.dateStarted} -{" "}
					{experience.isCurrentlyWorkingThere
						? "Present"
						: experience.dateEnded}
				</p>
				<ul className='ml-5 space-y-4 text-lg list-disc'>
					{experience.points.map((point, i) => (
						<li key={i}>{point}</li>
					))}
				</ul>
			</div>
		</article>
	);
}
