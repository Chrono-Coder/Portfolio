import { config } from "@/sanity.config";
import createImageUrlBuilder from "@sanity/image-url";

export const revalidateTime = 60 * 60 * 24;

export const urlFor = (source: any) => {
	return createImageUrlBuilder(config).image(source);
};
