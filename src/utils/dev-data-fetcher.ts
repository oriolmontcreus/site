import type { Page } from '../../../shared/types/pages';

export async function getPageData(slug: string): Promise<Page | null> {
  try {
    const pages = await import('../data/pages.json');
    const page = pages.default.find((p: Page) => p.slug === slug) || null;
    if (page) {
      console.log(`✅ Loaded page data for: ${slug}`);
    }
    return page;
  } catch (error) {
    console.error('Error loading page data:', error);
    return null;
  }
}

export async function getAllPagesData(): Promise<Page[]> {
  try {
    const pages = await import('../data/pages.json');
    console.log(`✅ Loaded ${pages.default.length} pages from JSON`);
    return pages.default;
  } catch (error) {
    console.error('Error loading pages data:', error);
    return [];
  }
} 