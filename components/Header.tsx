"use client";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
type Props = {};

export default function Header({}: Props) {
	return (
		<header className='sticky top-0 z-30 flex items-start justify-between p-5 mx-auto bg-bg-primary max-w-7xl xl:items-center'>
			<motion.div
				initial={{ x: -500, opacity: 0, scale: 0.5 }}
				animate={{ x: 0, opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
				className='flex items-center'
			>
				{/* Social Icons */}
				<SocialIcon
					url='https://profile.codersrank.io/user/chrono-coder'
					fgColor='gray'
					bgColor='transparent'
				/>
				<SocialIcon
					url='https://github.com/Chrono-Coder'
					fgColor='gray'
					bgColor='transparent'
				/>
				<SocialIcon
					url='https://www.linkedin.com/in/peter-john-hein/'
					fgColor='gray'
					bgColor='transparent'
				/>
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
				<p className='hidden text-sm text-gray-400 uppercase md:inline-flex'>
					Get in Touch
				</p>
			</motion.div>
		</header>
	);
}
