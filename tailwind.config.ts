import { join } from 'path';
import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';

const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		join(require.resolve(
			"@skeletonlabs/skeleton"),
			"../**/*.{html,js,svelte,ts}"
		)
	],
  
	theme: {
	  extend: {},
	},
  
	plugins: [
		skeleton({
			themes: { preset: [ { name: "seafoam", enhancements: true } ] }
		}),
		forms
	],
} satisfies Config;
  
export default config;
  