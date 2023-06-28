"use client";
import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

type Props = {};

export default function WorkExperience({}: Props) {
	const experience = {
		position: "Software Engineer",
		company: "Bloomind",
		startTime: "May 2021",
		endTime: "Present",
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='relative flex flex-col items-center h-screen max-w-full px-10 mx-auto overflow-hidden text-left md:flex-row justify-evenly'
		>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Experience
			</h3>

			<div className='flex w-full p-10 space-x-5 overflow-x-scroll snap-x snap-mandatory scroll-smooth md:mt-20'>
				<ExperienceCard experience={experience} />
				<ExperienceCard experience={experience} />
				<ExperienceCard experience={experience} />
			</div>
		</motion.div>
	);
}
