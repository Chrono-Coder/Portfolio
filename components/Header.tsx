'use client';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import { SocialMedia } from '@/typings';
import Link from 'next/link';

type Props = {
	socialMedias: SocialMedia[];
};

export default function Header({ socialMedias }: Props) {
	return (
		<header className='sticky top-0 z-30 flex items-start justify-between p-5 mx-auto max-w-7xl xl:items-center'>
			<motion.div
				initial={{ x: -500, opacity: 0, scale: 0.5 }}
				animate={{ x: 0, opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
				className='flex items-center'
			>
				{socialMedias.map((socialMedia: SocialMedia) => (
					<SocialIcon
						key={socialMedia._id}
						url={socialMedia.url}
						target='_blank'
						fgColor='gray'
						bgColor='transparent'
					/>
				))}
			</motion.div>
			<motion.div
				initial={{ x: 500, opacity: 0, scale: 0.5 }}
				animate={{ x: 0, opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
				className='flex items-center text-gray-300'
			>
				{/* Social Icons */}
				<SocialIcon
					className='cursor-pointer'
					network='email'
					fgColor='gray'
					bgColor='transparent'
				/>
				<Link href='/#contact'>
					<p className='hidden text-sm text-gray-400 uppercase md:inline-flex'>
						Get in Touch
					</p>
				</Link>
			</motion.div>
		</header>
	);
}
