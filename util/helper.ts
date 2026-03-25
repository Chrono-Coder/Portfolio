import createImageUrlBuilder from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
	projectId: 'psst6y6g',
	dataset: 'production',
});

export const urlFor = (source: any) => imageBuilder.image(source);
