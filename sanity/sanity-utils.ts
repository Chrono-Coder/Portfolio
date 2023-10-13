import {createClient, groq} from 'next-sanity'
import {PageInfo, Experience, Project, SocialMedia, Technology} from '../typings'
import config from './sanity.config'

const client = createClient(config)

export async function getPageInfo(): Promise<PageInfo> {
  return createClient(config).fetch(groq`*[_type == "pageInfo"][0]`)
}

export async function getExperiences(): Promise<Experience[]> {
  return createClient(config).fetch(
    groq`*[_type == "experience"] {
            ...,
            technologies[]->,
        }`,
  )
}

export async function getProjects(): Promise<Project[]> {
  return createClient(config).fetch(
    groq`*[_type == "project"] {
            ...,
            technologies[]->
        }`,
  )
}

export async function getTechnologies(): Promise<Technology[]> {
  return createClient(config).fetch(groq`*[_type == "skill"]`)
}

export async function getSocialMedias(): Promise<SocialMedia[]> {
  return createClient(config).fetch(groq`*[_type == "socialMedia"]`)
}
