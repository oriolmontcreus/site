import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

export default {
    name: 'excalibur-cms-devtool',
    hooks: {
        'astro:config:setup': ({ addDevToolbarApp }) => {
            addDevToolbarApp({
                id: "excalibur-cms-devtool",
                name: "Excalibur CMS",
                icon: "EX",
                entrypoint: fileURLToPath(new URL('./excalibur-cms-devtool.ts', import.meta.url))
            });
        },
    },
} satisfies AstroIntegration;
