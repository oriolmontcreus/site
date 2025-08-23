import type { Page } from '../../../shared/types/pages.type';
import { processPageWithGlobalVariables, processPagesWithGlobalVariables } from './global-variables';

export async function getPageData(slug: string): Promise<Page | null> {
  try {
    const pages = await import('../data/pages.json');
    const page = pages.default.find((p: Page) => p.slug === slug);

    if (!page) {
      console.log(`❌ Page not found: "${slug}"`);
      return null;
    }

    return await processPageWithGlobalVariables(page);

  } catch (error) {
    console.error('❌ Error loading page:', error);
    return null;
  }
}

export async function getAllPagesData(): Promise<Page[]> {
  try {
    const pages = await import('../data/pages.json');
    console.log(`📚 Loading ${pages.default.length} pages`);

    return await processPagesWithGlobalVariables(pages.default);

  } catch (error) {
    console.error('❌ Error loading pages:', error);
    return [];
  }
} 