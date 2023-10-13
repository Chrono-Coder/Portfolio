import config from '@/sanity.config';
import createImageUrlBuilder from '@sanity/image-url';

export const urlFor = (source: any) => {
	return createImageUrlBuilder(config).image(source);
};
