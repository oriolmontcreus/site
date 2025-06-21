import type { Page } from '../../../shared/types/pages';

const CMS_API_BASE = 'http://localhost:3000/api'; // Adjust to your CMS API URL

export async function getPageData(slug: string): Promise<Page | null> {
  if (import.meta.env.DEV) {
    // In development, try to fetch from CMS API but fallback to static data
    try {
      const response = await fetch(`${CMS_API_BASE}/pages/${slug}`);
      if (!response.ok) {
        console.warn(`Failed to fetch page data for slug: ${slug}, falling back to static data`);
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log(`✅ Fetched live data for page: ${slug}`);
      return data;
    } catch (error: any) {
      console.warn('CMS API not available, using static data:', error?.message || 'Unknown error');
      // Fallback to static data
      try {
        const pages = await import('../data/pages.json');
        return pages.default.find((p: Page) => p.slug === slug) || null;
      } catch (staticError) {
        console.error('Error loading static page data:', staticError);
        return null;
      }
    }
  } else {
    // In production, use static data
    try {
      const pages = await import('../data/pages.json');
      return pages.default.find((p: Page) => p.slug === slug) || null;
    } catch (error) {
      console.error('Error loading static page data:', error);
      return null;
    }
  }
}

export async function getAllPagesData(): Promise<Page[]> {
  if (import.meta.env.DEV) {
    // In development, try to fetch from CMS API but fallback to static data
    try {
      const response = await fetch(`${CMS_API_BASE}/pages`);
      if (!response.ok) {
        console.warn('Failed to fetch pages data, falling back to static data');
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log(`✅ Fetched live data for ${data.length} pages`);
      return data;
    } catch (error: any) {
      console.warn('CMS API not available, using static data:', error?.message || 'Unknown error');
      // Fallback to static data
      try {
        const pages = await import('../data/pages.json');
        return pages.default;
      } catch (staticError) {
        console.error('Error loading static pages data:', staticError);
        return [];
      }
    }
  } else {
    // In production, use static data
    try {
      const pages = await import('../data/pages.json');
      return pages.default;
    } catch (error) {
      console.error('Error loading static pages data:', error);
      return [];
    }
  }
} 