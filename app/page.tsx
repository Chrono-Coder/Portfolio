import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
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
} from "@/sanity/sanity-utils";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// type Props = {
// 	pageInfo: PageInfo;
// 	experiences: Experience[];
// 	projects: Project[];
// 	technologies: Technology[];
// 	socialMedias: SocialMedia[];
// };

export default async function Home() {
	const pageInfo = await getPageInfo();
	const experiences = await getExperiences();
	const projects = await getProjects();
	const technologies = await getTechnologies();
	const socialMedias = await getSocialMedias();

	return (
		<div className='z-0 w-screen h-screen overflow-x-hidden overflow-y-scroll text-white snap-y snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
			<Header socialMedias={socialMedias} />
			<section id='hero' className='snap-start '>
				<Hero pageInfo={pageInfo} />
			</section>
			<section id='about' className='snap-center'>
				<About pageInfo={pageInfo} />
			</section>
			<section id='experience' className='snap-center'>
				<WorkExperience experiences={experiences} />
			</section>
			<section id='skills' className='snap-start'>
				<Skills technologies={technologies} />
			</section>
			<section id='projects' className='snap-start'>
				<Projects projects={projects} />
			</section>
			<section id='contact' className='snap-start'>
				<ContactMe
					email={pageInfo.email}
					phoneNumber={pageInfo.phoneNumber}
					address={pageInfo.address}
				/>
			</section>
			<Link href='#hero'>
				<footer className='sticky w-full cursor-pointer bottom-5'>
					<ChevronUpIcon className='w-10 h-10 mx-auto text-gray-300 transition-opacity duration-200 opacity-20 hover:opacity-80' />
				</footer>
			</Link>
		</div>
	);
}
