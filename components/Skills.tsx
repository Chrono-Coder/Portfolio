"use client";

import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Technology } from "@/typings";

type Props = {
	technologies: Technology[];
};

export default function Skills({ technologies }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			viewport={{ once: true }}
			className='relative  flex flex-col items-center h-screen px-10 mx-auto text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-x-0'
		>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Skills
			</h3>
			<h3 className='font-base absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm'>
				Hover over the cards to see my proficiency
			</h3>

			<div className='grid grid-cols-4 gap-5 mt-40'>
				{technologies.map((technology, i) => (
					<Skill
						key={technology._id}
						technology={technology}
						directionLeft={i <= technologies.length / 2}
					></Skill>
				))}
			</div>
		</motion.div>
	);
}
