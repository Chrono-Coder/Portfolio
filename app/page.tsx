import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import { GetStaticProps } from "next";
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

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	projects: Project[];
	technologies: Technology[];
	socialMedias: SocialMedia[];
};

const fetchData = async () => {
	const pageInfo: PageInfo = await fetchPageInfo();
	const experiences: Experience[] = await fetchExperiences();
	const projects: Project[] = await fetchProjects();
	const technologies: Technology[] = await fetchTechnologies();
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
		socialMedias,
		pageInfo,
		experiences,
		projects,
		technologies,
	}: Props = await fetchData();
	return (
		<div className='z-0 w-screen h-screen overflow-x-hidden overflow-y-scroll text-white snap-y snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80'>
			<Header socialMedias={socialMedias} />
			<section id='hero' className='snap-start '>
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
			</section>
		</div>
	);
}
