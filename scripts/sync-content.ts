import fs from 'fs/promises';
import path from 'path';

interface Page {
    _id: string;
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

async function syncPage(page: Page) {
    const contentDir = path.join(process.cwd(), 'src/content/pages');
    
    // Ensure the content directory exists
    await fs.mkdir(contentDir, { recursive: true });
    
    // Create the markdown file with frontmatter
    const content = `---
title: ${page.title}
createdAt: ${page.createdAt}
updatedAt: ${page.updatedAt}
---
${page.content}`;

    await fs.writeFile(
        path.join(contentDir, `${page.slug}.md`),
        content,
        'utf-8'
    );
}

// This function will be called from our CMS when a page is published
export async function syncContent(page: Page) {
    try {
        await syncPage(page);
        console.log(`Successfully synced page: ${page.slug}`);
        return true;
    } catch (error) {
        console.error(`Error syncing page ${page.slug}:`, error);
        return false;
    }
} 