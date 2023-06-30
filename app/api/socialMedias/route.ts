import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { SocialMedia } from "@/typings";
const query = groq`*[_type == "socialMedia"]`;

export async function GET(req: NextRequest) {
	try {
		const socialMedias: SocialMedia[] = await sanityClient.fetch(query);
		return NextResponse.json(socialMedias, {
			headers: { "content-type": "application/json" },
			status: 200,
		});
	} catch (error) {
		return (
			NextResponse.json(error),
			{
				headers: { "content-type": "application/json" },
				status: 500,
			}
		);
	}
}
