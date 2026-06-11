import About from '@/components/About';
import ContactMe from '@/components/ContactMe';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import WorkExperience from '@/components/WorkExperience';

import {
	getProjects,
	getPageInfo,
	getSocialMedias,
	getTechnologies,
	getExperiences,
} from '@/sanity/sanity-utils';

export const revalidate = 60;

export default async function Home() {
	const pageInfo = await getPageInfo();
	const socialMedias = await getSocialMedias();
	const technologies = await getTechnologies();
	const projects = await getProjects();
	const experiences = await getExperiences();

	return (
		<div className='relative'>
			<Header socialMedias={socialMedias} />
			<main>
				<section id='hero'>
					<Hero pageInfo={pageInfo} />
				</section>
				<section id='about' className='scroll-mt-24'>
					<About pageInfo={pageInfo} />
				</section>
				<section id='skills' className='scroll-mt-24'>
					<Skills technologies={technologies} />
				</section>
				<section id='projects' className='scroll-mt-24'>
					<Projects projects={projects} />
				</section>
				<section id='experience' className='scroll-mt-24'>
					<WorkExperience experiences={experiences} />
				</section>
				<section id='contact' className='scroll-mt-24'>
					<ContactMe
						email={pageInfo.email}
						address={pageInfo.address}
						phoneNumber={pageInfo.phoneNumber}
					/>
				</section>
			</main>
			<footer className='section-shell flex flex-col items-center gap-4 border-t border-carbon-700 py-10 md:flex-row md:justify-between'>
				<p className='font-display text-sm font-bold text-mist-100'>
					pjh<span className='text-primary-300'>.</span>
				</p>
				<p className='text-xs tracking-[0.2em] text-mist-600 uppercase'>
					© {new Date().getFullYear()} Peter-John Hein
				</p>
				<a href='#hero' className='text-xs uppercase tracking-[0.2em] text-mist-500 transition-colors hover:text-primary-300'>
					back to top ↑
				</a>
			</footer>
		</div>
	);
}
