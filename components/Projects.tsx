'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/typings';
import { useRef, useState, MouseEvent, ReactElement } from 'react';
import ProjectCard from './ProjectCard';

type Props = {
	projects: Project[];
};

export default function Projects({ projects }: Props) {
	// const [isDragging, setDragging] = useState(false);
	// const [initialX, setInitialX] = useState(0);
	// const [scrollLeft, setScrollLeft] = useState(0);

	// const containerRef = useRef<HTMLDivElement | null>(null);
	// const animationRef = useRef<number | null>(null);

	// const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
	// 	setDragging(true);
	// 	if (containerRef.current) {
	// 		containerRef.current.style.cursor = 'grabbing';
	// 		setInitialX(
	// 			e.clientX - (containerRef.current.getBoundingClientRect().left || 0)
	// 		);
	// 		setScrollLeft(containerRef.current.scrollLeft);
	// 	}
	// };

	// const handleMouseUp = (): void => {
	// 	setDragging(false);
	// 	if (containerRef.current) {
	// 		containerRef.current.style.cursor = 'grab';
	// 		startSmoothScrollAnimation();
	// 	}
	// };

	// const handleMouseLeave = (): void => {
	// 	setDragging(false);
	// 	if (containerRef.current) {
	// 		containerRef.current.style.cursor = 'grab';
	// 	}
	// 	startSmoothScrollAnimation();
	// };

	// const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
	// 	if (!isDragging) return;
	// 	if (containerRef.current) {
	// 		const xOffset =
	// 			e.clientX - (containerRef.current.getBoundingClientRect().left || 0);
	// 		const scrollX = xOffset - initialX;
	// 		containerRef.current.scrollLeft = scrollLeft - scrollX;
	// 	}
	// };

	// const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
	// 	handleMouseDown(e.changedTouches[0]);
	// };

	// const handleTouchEnd = (): void => {
	// 	handleMouseUp();
	// };

	// const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
	// 	handleMouseMove(e.changedTouches[0]);
	// };

	// const startSmoothScrollAnimation = () => {
	// 	if (!animationRef.current) {
	// 		animationRef.current = requestAnimationFrame(scrollSmoothly);
	// 	}
	// };

	// const scrollSmoothly = () => {
	// 	if (containerRef.current) {
	// 		const diff = containerRef.current.scrollLeft - scrollLeft;
	// 		scrollLeft += diff * 0.1; // Adjust the speed here (0.1 is a smooth factor)
	// 		containerRef.current.scrollLeft = scrollLeft;

	// 		if (Math.abs(diff) < 0.1) {
	// 			cancelAnimationFrame(animationRef.current as number);
	// 			animationRef.current = null;
	// 		} else {
	// 			animationRef.current = requestAnimationFrame(scrollSmoothly);
	// 		}
	// 	}
	// };

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='relative flex flex-col h-screen max-w-full px-10 pb-10 mx-auto overflow-hidden text-left md:flex-row justify-evenly'
		>
			<h3 className='font-semibold absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
				Projects
			</h3>

			<div className='z-20 flex w-full mt-20 overflow-x-scroll overflow-y-hidden sm:pt-28 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
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
