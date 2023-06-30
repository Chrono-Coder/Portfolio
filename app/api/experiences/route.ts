import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { Experience } from "@/typings";
const query = groq`*[_type == "experience"] {
    ...,
    technologies[]->,
    points[]->,
}`;

export async function GET(req: NextRequest) {
	try {
		const experiences: Experience[] = await sanityClient.fetch(query);
		return (
			NextResponse.json(experiences),
			{
				headers: { "content-type": "application/json" },
				status: 200,
			}
		);
	} catch (err) {
		return (
			NextResponse.json(err),
			{
				headers: { "content-type": "application/json" },
				status: 500,
			}
		);
	}
}
