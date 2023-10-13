import { createClient, groq } from 'next-sanity';
import {
	PageInfo,
	Experience,
	Project,
	SocialMedia,
	Technology,
} from '@/typings';

const client = createClient({
	projectId: 'psst6y6g',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2021-03-25',
});

export async function getPageInfo(): Promise<PageInfo> {
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
	return client.fetch(
		groq`*[_type == "experience"] {
            ...,
            technologies[]->,
        }`
	);
}

export async function getProjects(): Promise<Project[]> {
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
	return client.fetch(groq`*[_type == "skill"]`);
}

export async function getSocialMedias(): Promise<SocialMedia[]> {
	return client.fetch(groq`*[_type == "socialMedia"]`);
}
