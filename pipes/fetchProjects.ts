import { Project } from "@/typings";
import { revalidateTime } from "@/util/helper";

export default async function fetchProjects() {
	// try {

	// } catch (error) {
	// 	console.log("Client-side fetching Error", error);
	// 	return { message: "Client-side fetching Error" };
	// }
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + "/api/projects",
		{
			next: { revalidate: revalidateTime },
		}
	);
	const data = await response.json();
	const projects: Project[] = data.projects;
	return projects;
}
