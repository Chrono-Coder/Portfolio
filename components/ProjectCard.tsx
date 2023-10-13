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
			className='relative flex flex-col items-center justify-start flex-shrink-0 w-screen mb-3 space-y-5 sm:mt-0 sm:justify-center p-7 sm:p-20 snap-center'
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
			<div className='w-full px-0 space-y-10 md:px-10'>
				<h4 className='text-xl font-semibold text-center sm:text-4xl'>
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
				<div className='flex items-center justify-center gap-2'>
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
				<div className='overflow-hidden text-lg text-center md:text-left'>
					<div className='xl:hidden'>
						{project.summary.length > 200
							? project.summary.substring(0, 220) + '...'
							: project.summary}
					</div>
					<p className='hidden overflow-hidden xl:inline-flex'>
						{project.summary}
					</p>
				</div>
			</div>
		</div>
	);
}
