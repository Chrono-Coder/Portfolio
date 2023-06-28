import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
	return (
		<div className='z-0 w-screen h-screen overflow-scroll text-white snap-y snap-mandatory scroll-smooth '>
			<Head>
				<title>{`Peter's Portfolio`}</title>
			</Head>

			<Header />
			<section id='hero' className='snap-start '>
				<Hero />
			</section>
			<section id='about' className='snap-center'>
				<About />
			</section>
			<section id='experience' className='snap-center'>
				<WorkExperience />
			</section>
			<section id='skills' className='snap-start'>
				<Skills />
			</section>
			<section id='projects' className='snap-start'>
				<Projects />
			</section>
			<section id='contact' className='snap-start'>
				<ContactMe />
			</section>
		</div>
	);
}