"use client";
import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "@/typings";
import { urlFor } from "@/util/sanity";
type Props = {
	pageInfo: PageInfo;
};

export default function About({ pageInfo }: Props) {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			whileInView={{
				opacity: 1,
			}}
			transition={{ duration: 1.5 }}
			className='relative flex flex-col items-center h-screen px-10 mx-auto text-center md:text-left md:flex-row max-w-7xl justify-evenly'
		>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				About
			</h3>

			<motion.img
				initial={{
					x: -200,
					opacity: 0,
				}}
				whileInView={{
					x: 0,
					opacity: 1,
				}}
				transition={{ duration: 1.5 }}
				viewport={{ once: true }}
				src={urlFor(pageInfo.profileImage).url()}
				className='flex-shrink-0 object-cover object-top w-56 h-56 -mb-20 rounded-full md:rounded-lg md:mb-0 md:w-64 md:h-96 xl:w-[500px] xl:h-[600px]'
			></motion.img>

			<div className='px-0 space-y-10 md:px-10'>
				<h4 className='text-4xl font-semibold'>
					Here is a little background
				</h4>
				<p className='text-base text-justify'>
					{pageInfo.backgroundInformation}
				</p>
			</div>
		</motion.div>
	);
}
