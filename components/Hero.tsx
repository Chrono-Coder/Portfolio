"use client";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BgCircles from "./BgCircles";
import Image from "next/image";
import Link from "next/link";
import { PageInfo } from "@/typings";
import { urlFor } from "@/sanity.config";
type Props = {
	pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
	const [text, count] = useTypewriter({
		words: [
			`Hello, I'm ${pageInfo.title}`,
			"Full Stack Developer",
			"AI Enthusiast",
			"#Beautiful Mind",
		],
		loop: true,
		delaySpeed: 2000,
	});
	return (
		<div className='flex flex-col items-center justify-center h-screen space-y-8 overflow-hidden text-center'>
			<BgCircles />
			<Image
				src={urlFor(pageInfo?.heroImage)?.url()}
				width={150}
				height={150}
				priority
				alt='hero'
				className='relative rounded-full w-[150px] h-[150px] mx-auto object-cover '
			/>
			<div className='z-20'>
				<h2 className='pb-2 text-sm font-bold tracking-[8px] text-white uppercase opacity-30'>
					{pageInfo.role}
				</h2>
				<h1 className='px-10 text-5xl font-semibold lg:text-6xl'>
					<span className='mr-3'>{text}</span>
					<Cursor cursorBlinking cursorColor='white' />
				</h1>

				<div className='pt-5'>
					<Link href='#about'>
						<button className='heroButton'>About</button>
					</Link>
					<Link href='#skills'>
						<button className='heroButton'>Skills</button>
					</Link>
					<Link href='#experience'>
						<button className='heroButton'>Experience</button>
					</Link>
					<Link href='#projects'>
						<button className='heroButton'>Projects</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
