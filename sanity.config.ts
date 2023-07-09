import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "@/sanity/schemas";

export const config = defineConfig({
	title: "Sanity Studio",
	dataset: "production",
	projectId: "psst6y6g",
	apiVersion: "2023-03-09",
	basePath: "/admin",
	plugins: [deskTool()],
	useCdn: true,
	schema: { types: schemas },
});
