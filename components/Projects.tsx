"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {};

export default function Projects({}: Props) {
	const projects = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='relative z-0 flex flex-col items-center h-screen max-w-full mx-auto overflow-hidden text-left md:flex-row justify-evenly'
		>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Projects
			</h3>
			<div className='relative z-20 flex w-full overflow-x-scroll overflow-y-hidden pt-28 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
				{projects.map((project, index) => (
					<div
						key={project}
						className='relative flex flex-col items-center justify-center flex-shrink-0 w-screen h-screen p-20 space-y-5 snap-center md:p-44'
					>
						<motion.img
							initial={{ y: -300, opacity: 0 }}
							transition={{ duration: 1.2 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true }}
							src='/images/remar.png'
							width={500}
							height={500}
							alt=''
						/>
						<div className='max-w-6xl px-0 space-y-10 md:px-10'>
							<h4 className='text-4xl font-semibold text-center'>
								<span className='underline decoration-primary/70'>
									Project {index + 1} of {projects.length}:
								</span>{" "}
								Remar
							</h4>
							<p className='text-lg text-center md:text-left'>
								Short-term rentals are becoming popular with
								real estate owners. They offer a variety of
								benefits to both customers and real estate
								owners. Our team is developing a system to help
								real estate owners manage their properties more
								efficiently and with higher rental returns. The
								main stakeholders for our project will be the
								real estate owners, the cleaning department, the
								maintenance department, and the customers. The
								system will provide autonomous check-in and
								check-out, 360 images of the accommodation, and
								automated check-ups by notifying the cleaning
								and maintenance department after each check-out.
							</p>
						</div>
					</div>
				))}
			</div>
			<div className='w-full absolute top-[30%] bg-primary/30 left-0 h-[500px] -skew-y-12'></div>
		</motion.div>
	);
}
