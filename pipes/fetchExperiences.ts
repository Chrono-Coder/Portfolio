import { Experience } from "@/typings";
import { revalidateTime } from "@/util/helper";

export default async function fetchExperiences() {
	// try {

	// } catch (error) {
	// 	console.log("Client-side fetching Error", error);
	// 	return { message: "Client-side fetching Error" };
	// }
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + "/api/experiences",
		{
			next: { revalidate: revalidateTime },
		}
	);
	const data = await response.json();
	const experiences: Experience[] = data.experiences;
	return experiences;
}
