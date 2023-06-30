"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/typings";
import { urlFor } from "@/util/sanity";

type Props = {
	projects: Project[];
};

export default function Projects({ projects }: Props) {
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
				{projects
					.sort(
						(a, b) =>
							new Date(a._createdAt).getTime() -
							new Date(b._createdAt).getTime()
					)
					.map((project, index) => (
						<div
							key={project._id}
							className='relative flex flex-col items-center justify-center flex-shrink-0 w-screen h-screen p-20 space-y-5 snap-center md:p-44'
						>
							<motion.img
								initial={{ y: -300, opacity: 0 }}
								transition={{ duration: 1.2 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								src={urlFor(project.image).url()}
								width={500}
								height={500}
								alt=''
							/>
							<div className='max-w-6xl px-0 space-y-10 md:px-10'>
								<h4 className='text-4xl font-semibold text-center'>
									<span className='underline decoration-primary/70'>
										Project {index + 1} of {projects.length}
										:
									</span>{" "}
									{project.title}
								</h4>
								<div className='flex items-center justify-center gap-2'>
									{project.technologies.map((technology) => (
										<Image
											key={technology._id}
											src={urlFor(technology.image).url()}
											width={40}
											height={40}
											alt=''
										/>
									))}
								</div>
								<p className='text-lg text-center md:text-left'>
									{project.summary}
								</p>
							</div>
						</div>
					))}
			</div>
			<div className='w-full absolute top-[30%] bg-primary/30 left-0 h-[500px] -skew-y-12'></div>
		</motion.div>
	);
}
