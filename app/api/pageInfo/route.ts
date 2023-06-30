import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/util/sanity";
import { PageInfo } from "@/typings";
const query = groq`*[_type == "pageInfo"][0]`;

export async function GET(req: NextRequest) {
	try {
		const pageInfo: PageInfo = await sanityClient.fetch(query);
		return NextResponse.json(pageInfo, {
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
