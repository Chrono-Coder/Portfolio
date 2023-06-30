import { PageInfo } from "@/typings";
import { revalidateTime } from "@/util/helper";

export default async function fetchPageInfo() {
	// 	try {

	// 	} catch (error) {
	// 		console.log("Client-side fetching Error", error);
	// 		return { message: "Client-side fetching Error" };
	// 	}
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + "/api/pageInfo",
		{
			next: { revalidate: revalidateTime },
		}
	);
	const data = await response.json();
	const pageInfo: PageInfo = data.pageInfo;
	return pageInfo;
}
