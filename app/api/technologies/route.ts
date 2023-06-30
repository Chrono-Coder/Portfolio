import { NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { Technology } from "@/typings";
const query = groq`*[_type == "skill"]`;

export async function GET(req: NextRequest) {
	try {
		const technologies: Technology[] = await sanityClient.fetch(query);

		return new Response(JSON.stringify({ technologies }), {
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
