import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity.config";
import { Experience } from "@/typings";
const query = groq`*[_type == "experience"] {
    ...,
    technologies[]->,
    points[]->,
}`;

export async function GET(req: NextRequest) {
	try {
		const experiences: Experience[] = await sanityClient.fetch(query);
		return new Response(JSON.stringify({ experiences }), {
			headers: { "content-type": "application/json" },
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ err }), {
			headers: { "content-type": "application/json" },
			status: 500,
		});
	}
}
