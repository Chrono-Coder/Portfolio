import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from '@/sanity/schemas';

const config = defineConfig({
	title: 'Sanity Studio',
	dataset: 'production',
	projectId: 'psst6y6g',
	apiVersion: '2023-10-13',
	basePath: '/admin',
	plugins: [deskTool()],
	useCdn: true,
	schema: { types: schemas },
});

export default config;
