import { Technology } from "@/typings";
import { revalidateTime } from "@/util/helper";

export default async function fetchTechnologies() {
	// try {

	// } catch (error) {
	// 	console.log("Client-side fetching Error", error);
	// 	return { message: "Client-side fetching Error" };
	// }
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + "/api/technologies",
		{
			next: { revalidate: revalidateTime },
		}
	);
	const data = await response.json();
	const technologies: Technology[] = data.technologies;
	return technologies;
}
