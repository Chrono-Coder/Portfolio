import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import {
	PageInfo,
	Experience,
	Project,
	SocialMedia,
	Technology,
} from "@/typings";

export async function getPageInfo(): Promise<PageInfo> {
	return createClient(clientConfig).fetch(groq`*[_type == "pageInfo"][0]`);
}

export async function getExperiences(): Promise<Experience[]> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "experience"] {
            ...,
            technologies[]->,
        }`
	);
}

export async function getProjects(): Promise<Project[]> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "project"] {
            ...,
            technologies[]->
        }`
	);
}

export async function getTechnologies(): Promise<Technology[]> {
	return createClient(clientConfig).fetch(groq`*[_type == "skill"]`);
}

export async function getSocialMedias(): Promise<SocialMedia[]> {
	return createClient(clientConfig).fetch(groq`*[_type == "socialMedia"]`);
}
