import { Inputs } from "@/typings";

export default async function sendEmail(msg: Inputs) {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + "/api/email",
			{
				method: "POST",
				body: JSON.stringify(msg),
			}
		);

		return await response.json();
	} catch (error) {
		console.log("There was an error submitting", error);
		return { message: "There was an error submitting" };
	}
}
