'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/typings';
import ProjectCard from './ProjectCard';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

type Props = {
	projects: Project[];
};

export default function Projects({ projects }: Props) {
	const scrollRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	const { events } = useDraggable(scrollRef, {
		applyRubberBandEffect: true,
	});

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='relative flex flex-col-reverse items-center h-screen max-w-full px-10 pb-10 mx-auto overflow-hidden text-left md:flex-row justify-evenly'
		>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Projects
			</h3>

			<div
				{...events}
				ref={scrollRef}
				className='z-20 scroller flex w-full overflow-x-scroll overflow-y-hidden pt-14 '
			>
				{projects.map((project, index) => (
					<ProjectCard
						key={project._id}
						project={project}
						index={index}
						length={projects.length}
					/>
				))}
			</div>
			<div className='w-full absolute top-[30%] bg-primary/30 left-0 h-[500px] -skew-y-12'></div>
		</motion.div>
	);
}
