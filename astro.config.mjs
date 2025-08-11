// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import cmsErrorTracker from './cms-error-tracker-integration.ts';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), cmsErrorTracker],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static'
});