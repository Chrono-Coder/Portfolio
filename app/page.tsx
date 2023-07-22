import About from '@/components/About';
import ContactMe from '@/components/ContactMe';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import WorkExperience from '@/components/WorkExperience';
// import {
// 	Experience,
// 	PageInfo,
// 	Project,
// 	Technology,
// 	SocialMedia,
// } from "@/typings";
import {
	getProjects,
	getPageInfo,
	getSocialMedias,
	getTechnologies,
	getExperiences,
} from '@/sanity/sanity-utils';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export const revalidate = 60; //

export default async function Home() {
	const pageInfo = await getPageInfo();
	const experiences = await getExperiences();
	const projects = await getProjects();
	const technologies = await getTechnologies();
	const socialMedias = await getSocialMedias();

	return (
		<div className='z-0 w-screen h-screen overflow-x-hidden overflow-y-scroll text-white snap-y snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
			<Header socialMedias={socialMedias} />
			<section
				id='hero'
				className='snap-start '
			>
				<Hero pageInfo={pageInfo} />
			</section>
			<section
				id='about'
				className='snap-center'
			>
				<About pageInfo={pageInfo} />
			</section>
			<section
				id='skills'
				className='snap-start'
			>
				<Skills technologies={technologies} />
			</section>
			<section
				id='projects'
				className='snap-start'
			>
				<Projects projects={projects} />
			</section>
			<section
				id='experience'
				className='snap-center'
			>
				<WorkExperience experiences={experiences} />
			</section>
			<section
				id='contact'
				className='snap-start'
			>
				<ContactMe
					email={pageInfo.email}
					phoneNumber={pageInfo.phoneNumber}
					address={pageInfo.address}
				/>
			</section>
			<div className='sticky flex items-center justify-center w-20 h-20 mx-auto rounded-full bottom-5'>
				<Link href='#hero'>
					<ChevronUpIcon className='w-10 h-10 text-gray-300 transition-opacity duration-200 opacity-20 hover:opacity-80' />
				</Link>
			</div>
		</div>
	);
}
