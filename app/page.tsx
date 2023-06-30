import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import {
	Experience,
	PageInfo,
	Project,
	Technology,
	SocialMedia,
} from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	projects: Project[];
	technologies: Technology[];
	socialMedias: SocialMedia[];
};

const fetchData = async () => {
	const fetchPageInfo = async () => {
		const pageInfoQuery = groq`*[_type == "pageInfo"][0]`;
		const pageInfo = await sanityClient.fetch(pageInfoQuery);
		return pageInfo;
	};
	const pageInfo: PageInfo = await fetchPageInfo();

	const fetchExperiences = async () => {
		const experiencesQuery = groq`*[_type == "experience"] {
											...,
											technologies[]->,
											points[]->,
										}`;
		const experiences = await sanityClient.fetch(experiencesQuery);
		return experiences;
	};
	const experiences: Experience[] = await fetchExperiences();

	const fetchProjects = async () => {
		const projectsQuery = groq`*[_type == "project"] {
										...,
										technologies[]->
									}`;
		const projects = await sanityClient.fetch(projectsQuery);
		return projects;
	};
	const projects: Project[] = await fetchProjects();

	const fetchTechnologies = async () => {
		const technologiesQuery = groq`*[_type == "skill"]`;
		const technologies = await sanityClient.fetch(technologiesQuery);
		return technologies;
	};
	const technologies: Technology[] = await fetchTechnologies();

	const fetchSocialMedias = async () => {
		const socialMediasQuery = groq`*[_type == "socialMedia"]`;
		const socialMedias = await sanityClient.fetch(socialMediasQuery);
		return socialMedias;
	};
	const socialMedias: SocialMedia[] = await fetchSocialMedias();

	return {
		pageInfo,
		experiences,
		projects,
		technologies,
		socialMedias,
	};
};

export default async function Home() {
	const {
		pageInfo,
		experiences,
		projects,
		technologies,
		socialMedias,
	}: Props = await fetchData();
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
