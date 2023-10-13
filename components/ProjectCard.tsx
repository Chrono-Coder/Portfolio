import React from 'react';
import { Project } from '@/typings';
import { urlFor } from '@/util/helper';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
	project: Project;
	index: number;
	length: number;
};
export default function Project({ project, index, length }: Props) {
	return (
		<div
			key={project._id}
			className='relative flex flex-col-reverse items-center justify-start flex-shrink-0 w-screen gap-3 pb-3 mb-0 space-y-5 md:space-x-5 sm:mt-0 sm:justify-center p-7 sm:p-20 md:pb-0 snap-center md:flex-row'
		>
			<div className='flex flex-col items-center justify-center sm:gap-y-4'>
				<motion.img
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
					src={urlFor(project.image).url()}
					className='object-contain w-[400px] h-[300px] md:w-[600px] md:h-[500px] lg:w-[800px] lg:h-[700px]  rounded-xl'
					alt=''
				/>
				{/* <div className='px-0 space-y-10 md:px-10'></div> */}
			</div>
			<div className='flex flex-col md:my-auto gap-10 sm:h-screen overflow-hidden text-lg text-center md:text-left md:w-[40%] md:h-[500px] '>
				<h4 className='text-2xl font-semibold md:text-4xl'>
					<span className='underline decoration-primary/70'>
						Project {index + 1} of {length}:
					</span>{' '}
					{project.title}
					<a
						href={project.linkToBuild}
						target='_blank'
					>
						<ArrowTopRightOnSquareIcon className='inline-block w-4 h-4 ml-2 -mb-1 text-gray-300 cursor-pointer' />
					</a>
				</h4>
				<div className='flex items-center justify-center w-full h-12 gap-2 md:justify-start'>
					{project.technologies.splice(0, 5).map((tech) => (
						<Image
							key={tech._id}
							src={urlFor(tech.image).url()}
							width={80}
							height={80}
							alt={tech.title}
							className='object-contain w-12 h-12 rounded-full'
						/>
					))}
				</div>
				<p className='hidden md:inline-flex '>{project.summary}</p>
			</div>
		</div>
	);
}
