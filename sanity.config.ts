import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import schemas from '@/sanity/schemas';

const config = defineConfig({
	title: 'Sanity Studio',
	dataset: 'production',
	projectId: 'psst6y6g',
	basePath: '/admin',
	plugins: [structureTool()],
	schema: { types: schemas },
});

export default config;
