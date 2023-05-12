import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			// this will match a file
			$node_modules: path.resolve("./node_modules"),
			$src: path.resolve("./src"),
			$components: path.resolve("./src/components"),
			$front_lib: path.resolve("../lib/front_lib"),
		},
	},
	preprocess: vitePreprocess()
};

export default config;
