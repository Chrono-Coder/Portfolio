"use client";
import React from "react";
import { motion } from "framer-motion";
import { Technology } from "@/typings";
import { urlFor } from "@/util/sanity";

type Props = {
	directionLeft?: boolean;
	technology: Technology;
};

export default function Skill({ directionLeft, technology }: Props) {
	return (
		<div className='relative flex cursor-pointer group'>
			<motion.img
				initial={{
					x: directionLeft ? -300 : 300,
					opacity: 0,
				}}
				transition={{ duration: 1 }}
				whileInView={{ opacity: 1, x: 0 }}
				// viewport={{ once: true }}
				src={urlFor(technology.image).url()}
				className='object-contain w-24 h-24 transition duration-300 ease-in-out border border-gray-500 rounded-full md:w-28 md:h-28 xl:w-32 xl:h-32 filter group-hover:grayscale'
			/>
			<div className='absolute z-0 w-24 h-24 transition duration-300 ease-in-out rounded-full opacity-0 group-hover:opacity-80 group-hover:bg-white md:w-28 md:h-28 xl:w-32 xl:h-32'>
				<div className='flex items-center justify-center h-full'>
					<p className='text-3xl font-bold text-black opacity-100'>
						{technology.proficiency}%
					</p>
				</div>
			</div>
		</div>
	);
}
