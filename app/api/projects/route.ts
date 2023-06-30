import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { Project } from "@/typings";
const query = groq`*[_type == "project"] {
	...,
	technologies[]->
}`;

export async function GET(req: NextRequest) {
	try {
		const projects: Project[] = await sanityClient.fetch(query);
		return new Response(JSON.stringify({ projects }), {
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
