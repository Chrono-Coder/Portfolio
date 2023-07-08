import { createClient } from "next-sanity";
import { defineConfig } from "sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { deskTool } from "sanity/desk";
import schemas from "@/sanity/schemas";

export const config = defineConfig({
	title: "Sanity Studio",
	dataset: "production",
	projectId: "psst6y6g",
	apiVersion: "2023-03-09",
	basePath: "/admin",
	plugins: [deskTool()],
	schema: { types: schemas },
});

export const sanityClient = createClient(config);

export const urlFor = (source: any) => {
	return createImageUrlBuilder(config).image(source);
};
