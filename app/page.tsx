import About from '@/components/About';
import ContactMe from '@/components/ContactMe';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import WorkExperience from '@/components/WorkExperience';
import SignalLine from '@/components/signal/SignalLine';

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
			<SignalLine />
			<Header socialMedias={socialMedias} />
			<div className='relative z-10'>
				<main>
					<section id='hero' data-snap>
						<Hero pageInfo={pageInfo} />
					</section>
					<section id='about' data-snap className='relative scroll-mt-24'>
						<span data-signal-node data-signal-x='0.26' className='signal-anchor top-1/2' aria-hidden />
						<About pageInfo={pageInfo} />
					</section>
					<section id='projects' data-snap className='relative scroll-mt-24'>
						<span data-signal-node data-signal-x='0.74' className='signal-anchor top-1/2' aria-hidden />
						<Projects projects={projects} />
					</section>
					<section id='skills' data-snap className='relative scroll-mt-24'>
						<span data-signal-node data-signal-x='0.28' className='signal-anchor top-1/2' aria-hidden />
						<Skills technologies={technologies} />
					</section>
					<section id='experience' data-snap className='relative scroll-mt-24'>
						<WorkExperience experiences={experiences} />
					</section>
					<section id='contact' data-snap className='relative scroll-mt-24'>
						<span data-signal-node data-signal-x='0.72' data-signal-x-mobile='0.5' className='signal-anchor top-1/2' aria-hidden />
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
		</div>
	);
}
