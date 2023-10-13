import { createClient, groq } from 'next-sanity';
import {
	PageInfo,
	Experience,
	Project,
	SocialMedia,
	Technology,
} from '@/typings';

export async function getPageInfo(): Promise<PageInfo> {
	const client = createClient({
		projectId: 'psst6y6g',
		dataset: 'production',
		useCdn: true,
		apiVersion: '2021-03-25',
	});
	return client.fetch(groq`*[_type == "pageInfo"][0]{
        phoneNumber,
        address,
        email,
        _type,
        role,
        heroImage {
            asset -> {
            url
            }
        },
        profileImage {
            asset -> {
            url
            }
        },
        backgroundInformation,
        title,
            _type
        }`);
}

export async function getExperiences(): Promise<Experience[]> {
	const client = createClient({
		projectId: 'psst6y6g',
		dataset: 'production',
		useCdn: true,
		apiVersion: '2021-03-25',
	});

	return client.fetch(
		groq`*[_type == "experience"] {
            ...,
            technologies[]->,
        }`
	);
}

export async function getProjects(): Promise<Project[]> {
	const client = createClient({
		projectId: 'psst6y6g',
		dataset: 'production',
		useCdn: true,
		apiVersion: '2021-03-25',
	});

	return client.fetch(
		groq`*[_type == "pageInfo"][0]{
                projects[] -> {
                    ...,
                    technologies[]->
                    }
                }.projects[]
              `
	);
}

export async function getTechnologies(): Promise<Technology[]> {
	const client = createClient({
		projectId: 'psst6y6g',
		dataset: 'production',
		useCdn: true,
		apiVersion: '2021-03-25',
	});

	return client.fetch(groq`*[_type == "skill"]`);
}

export async function getSocialMedias(): Promise<SocialMedia[]> {
	const client = createClient({
		projectId: 'psst6y6g',
		dataset: 'production',
		useCdn: true,
		apiVersion: '2021-03-25',
	});

	return client.fetch(groq`*[_type == "socialMedia"]`);
}
