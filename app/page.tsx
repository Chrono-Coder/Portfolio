"use client";
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
import fetchPageInfo from "@/pipes/fetchPageInfo";
import fetchExperiences from "@/pipes/fetchExperiences";
import fetchProjects from "@/pipes/fetchProjects";
import fetchTechnologies from "@/pipes/fetchTechnologies";
import fetchSocialMedias from "@/pipes/fetchSocialMedias";
import { urlFor } from "@/util/sanity";
import { revalidateTime } from "@/util/helper";
import { useEffect, useState } from "react";

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	projects: Project[];
	technologies: Technology[];
	socialMedias: SocialMedia[];
};

const fetchData = async () => {
	const [pageInfo, experiences, projects, technologies, socialMedias] =
		await Promise.all([
			fetchPageInfo(),
			fetchExperiences(),
			fetchProjects(),
			fetchTechnologies(),
			fetchSocialMedias(),
		]);

	// let response = await fetch(
	// 	process.env.NEXT_PUBLIC_BASE_URL + "/api/pageInfo",
	// 	{
	// 		next: { revalidate: revalidateTime },
	// 	}
	// );
	// let data = await response.json();
	// const pageInfo: PageInfo = data.pageInfo;
	// response = await fetch(
	// 	process.env.NEXT_PUBLIC_BASE_URL + "/api/experiences",
	// 	{
	// 		next: { revalidate: revalidateTime },
	// 	}
	// );
	// data = await response.json();
	// const experiences: Experience[] = data.experiences;
	// response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/projects", {
	// 	next: { revalidate: revalidateTime },
	// });
	// data = await response.json();
	// const projects: Project[] = data.projects;
	// response = await fetch(
	// 	process.env.NEXT_PUBLIC_BASE_URL + "/api/technologies",
	// 	{
	// 		next: { revalidate: revalidateTime },
	// 	}
	// );
	// data = await response.json();
	// const technologies: Technology[] = data.technologies;
	// response = await fetch(
	// 	process.env.NEXT_PUBLIC_BASE_URL + "/api/socialMedias",
	// 	{
	// 		next: { revalidate: revalidateTime },
	// 	}
	// );
	// data = await response.json();
	// const socialMedias: SocialMedia[] = data.socialMedias;

	return {
		pageInfo,
		experiences,
		projects,
		technologies,
		socialMedias,
	};
};

export default function Home() {
	// const {
	// 	socialMedias,
	// 	pageInfo,
	// 	experiences,
	// 	projects,
	// 	technologies,
	// }: Props = await fetchData();
	const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);
	useEffect(() => {
		fetchData().then((data) => {
			console.log(data);
			setSocialMedias(data.socialMedias);
		});
	}, []);

	return (
		<div className='z-0 w-screen h-screen overflow-x-hidden overflow-y-scroll text-white snap-y snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
			<Header socialMedias={socialMedias} />
			{/* <section id='hero' className='snap-start '>
				<Hero pageInfo={pageInfo} />
			</section>
			<section id='about' className='snap-center'>
				<About
					backgroundInformation={pageInfo.backgroundInformation}
					imageUrl={urlFor(pageInfo.profileImage).url()}
				/>
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
			</section> */}
		</div>
	);
}
