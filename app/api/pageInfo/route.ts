import { NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { PageInfo } from "@/typings";
const query = groq`*[_type == "pageInfo"][0]`;

export async function GET(req: NextRequest) {
	try {
		const pageInfo: PageInfo = await sanityClient.fetch(query);
		return new Response(JSON.stringify({ pageInfo }), {
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
