"use client";
import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/typings";
type Props = {
	experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
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

			<div className='flex w-full mt-20 space-x-5 overflow-x-scroll md:p-10 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
				{experiences.map((experience) => (
					<ExperienceCard
						key={experience._id}
						experience={experience}
					/>
				))}
			</div>
		</motion.div>
	);
}
