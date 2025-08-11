import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

export default {
    name: 'cms-error-tracker',
    hooks: {
        'astro:config:setup': ({ addDevToolbarApp }) => {
            addDevToolbarApp({
                id: "cms-error-tracker",
                name: "CMS Error Tracker",
                icon: "🔧",
                entrypoint: fileURLToPath(new URL('./cms-error-tracker.ts', import.meta.url))
            });
        },
    },
} satisfies AstroIntegration;
