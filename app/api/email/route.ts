import { NextRequest, NextResponse } from "next/server";
import { Inputs } from "@/typings";

export async function POST(req: NextRequest) {
	const body: Inputs = await req.json();
	const msg = {
		to: "hein.peterjohn@gmail.com",
		from: "petej2000@outlook.com",
		subject: body.subject,
		html: `<p>From: ${body.name}</p>
		<p>Email: ${body.email}</p>
		<p>${body.message}</p>`,
	};

	const sgMail = require("@sendgrid/mail");
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
			return NextResponse.json(
				{ message: "Email sent" },
				{
					headers: { "content-type": "application/json" },
					status: 200,
				}
			);
		})
		.catch((error: any) => {
			console.log("Request Error", error);
			return NextResponse.json(
				{ message: "Error sending email" },
				{
					headers: { "content-type": "application/json" },
					status: 500,
				}
			);
		});
}
