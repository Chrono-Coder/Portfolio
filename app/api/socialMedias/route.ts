import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { SocialMedia } from "@/typings";
const query = groq`*[_type == "socialMedia"]`;

export async function GET(req: NextRequest) {
	try {
		const socialMedias: SocialMedia[] = await sanityClient.fetch(query);
		return new Response(JSON.stringify({ socialMedias }), {
			headers: { "content-type": "application/json" },
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			headers: { "content-type": "application/json" },
			status: 500,
		});
	}
}
