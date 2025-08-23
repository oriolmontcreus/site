import type { Component, Page } from '../../../shared/types/pages.type';

interface GlobalVariablesData {
    [key: string]: any;
}

// Cache for global variables (loaded once per build)
let globalVariablesCache: GlobalVariablesData | null = null;

/**
 * Load global variables with caching
 */
async function loadGlobalVariables(): Promise<GlobalVariablesData> {
    if (globalVariablesCache) {
        console.log('⚡ [GlobalVars] Using cache');
        return globalVariablesCache;
    }

    try {
        console.log('📁 [GlobalVars] Loading variables...');
        const module = await import('../data/globalVariables.json');
        globalVariablesCache = module.default;
        console.log(`✅ [GlobalVars] Loaded ${Object.keys(globalVariablesCache).length} variables`);
        return globalVariablesCache;
    } catch (error) {
        console.error('❌ [GlobalVars] Failed to load:', error);
        return {};
    }
}

/**
 * Replace {{variable}} patterns in text
 */
function processText(text: string, variables: GlobalVariablesData, locale?: string): string {
    if (!text?.includes?.('{{')) return text;

    return text.replace(/\{\{([^}]+)\}\}/g, (match, name) => {
        const key = name.trim();
        const value = locale && variables.translations?.[locale]?.[key]
            ? variables.translations[locale][key]
            : variables[key];

        if (value !== undefined) {
            console.log(`  🔄 [GlobalVars] ${key} → "${value}"`);
            return String(value);
        }

        console.warn(`  ⚠️ [GlobalVars] Variable "${key}" not found`);
        return match;
    });
}

/**
 * Process any value recursively
 */
function processValue(value: any, variables: GlobalVariablesData, locale?: string): any {
    if (typeof value === 'string') return processText(value, variables, locale);
    if (Array.isArray(value)) return value.map(item => processValue(item, variables, locale));
    if (value && typeof value === 'object') {
        const result: any = {};
        for (const [key, val] of Object.entries(value)) {
            result[key] = processValue(val, variables, locale);
        }
        return result;
    }
    return value;
}

/**
 * Process a page with global variables
 */
export async function processPageWithGlobalVariables(page: Page, locale?: string): Promise<Page> {
    console.log(`📄 [GlobalVars] Processing: ${page.title}`);

    const variables = await loadGlobalVariables();
    const processedComponents = page.components.map(component => ({
        ...component,
        formData: processValue(component.formData, variables, locale)
    }));

    return { ...page, components: processedComponents };
}

/**
 * Process multiple pages with global variables
 */
export async function processPagesWithGlobalVariables(pages: Page[], locale?: string): Promise<Page[]> {
    console.log(`📚 [GlobalVars] Processing ${pages.length} pages`);

    const variables = await loadGlobalVariables();

    return pages.map(page => ({
        ...page,
        components: page.components.map(component => ({
            ...component,
            formData: processValue(component.formData, variables, locale)
        }))
    }));
}
