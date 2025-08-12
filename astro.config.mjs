// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import excaliburCmsIntegration from './excalibur-cms-integration.ts';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), excaliburCmsIntegration],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static'
});