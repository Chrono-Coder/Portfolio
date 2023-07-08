"use client";
import React from "react";
import { motion } from "framer-motion";
import { Technology } from "@/typings";
import { urlFor } from "@/util/helper";
import Image from "next/image";

type Props = {
	directionLeft?: boolean;
	technology: Technology;
};

export default function Skill({ directionLeft, technology }: Props) {
	return (
		<div className='relative flex cursor-pointer group'>
			<Image
				width={200}
				height={200}
				alt={technology.title}
				src={urlFor(technology.image).url()}
				className='object-contain w-16 h-16 transition duration-300 ease-in-out border border-gray-500 rounded-full sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 filter group-hover:grayscale'
			/>
			{/* {technology.title} */}
			<div className='absolute z-0 w-16 h-16 transition duration-300 ease-in-out rounded-full opacity-0 sm:w-24 sm:h-24 group-hover:opacity-80 group-hover:bg-white md:w-28 md:h-28 xl:w-32 xl:h-32'>
				<div className='flex items-center justify-center h-full'>
					<p className='text-3xl font-bold text-black opacity-100'>
						{technology.proficiency}%
					</p>
				</div>
			</div>
		</div>
	);
}
