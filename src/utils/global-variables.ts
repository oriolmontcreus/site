import type { Component, Page } from '../../../shared/types/pages.type';

export interface GlobalVariablesData {
    [key: string]: any;
}

export interface GlobalVariableOptions {
    locale?: string;
    fallback?: any;
}

// Cache for global variables (loaded once per build)
let globalVariablesCache: GlobalVariablesData | null = null;

/**
 * Load global variables with caching
 */
async function loadGlobalVariables(): Promise<GlobalVariablesData> {
    if (globalVariablesCache) {
        return globalVariablesCache;
    }

    try {
        const module = await import('../data/globalVariables.json');
        globalVariablesCache = module.default;
        return globalVariablesCache;
    } catch (error) {
        console.error('❌ [GlobalVars] Failed to load:', error);
        return {};
    }
}

// ========================================
// PUBLIC API - Direct Variable Access 
// ========================================

/**
 * Get a single global variable
 * Usage: const siteName = await getGlobalVariable('siteName');
 */
export async function getGlobalVariable(
    key: string,
    options: GlobalVariableOptions = {}
): Promise<any> {
    try {
        const variables = await loadGlobalVariables();
        const { locale, fallback } = options;

        // Check translation first if locale provided
        if (locale && variables.translations?.[locale]?.[key] !== undefined) {
            return variables.translations[locale][key];
        }

        // Check root level
        if (variables[key] !== undefined) return variables[key];

        return fallback;

    } catch (error) {
        console.error(`Failed to get global variable "${key}":`, error);
        return options.fallback;
    }
}

/**
 * Get multiple global variables efficiently
 * Usage: const {siteName, theme} = await getGlobalVariables(['siteName', 'theme']);
 */
export async function getGlobalVariables(
    keys: string[],
    options: GlobalVariableOptions = {}
): Promise<Record<string, any>> {
    try {
        const variables = await loadGlobalVariables();
        const { locale, fallback } = options;

        const result: Record<string, any> = {};
        for (const key of keys) {
            // Check translation first if locale provided
            if (locale && variables.translations?.[locale]?.[key] !== undefined) {
                result[key] = variables.translations[locale][key];
            } else if (variables[key] !== undefined) {
                result[key] = variables[key];
            } else {
                result[key] = fallback;
            }
        }

        return result;
    } catch (error) {
        console.error('Failed to get global variables:', error);
        return keys.reduce((acc, key) => {
            acc[key] = options.fallback;
            return acc;
        }, {} as Record<string, any>);
    }
}

// =======================
// TEMPLATE PROCESSING
// =======================

/**
 * Replace {{variable}} patterns in text with tracking
 */
function processTextWithTracking(text: string, variables: GlobalVariablesData, locale: string | undefined, usedVariables: Set<string>): string {
    if (!text?.includes?.('{{')) return text;

    return text.replace(/\{\{([^}]+)\}\}/g, (match, name) => {
        const key = name.trim();
        const value = locale && variables.translations?.[locale]?.[key]
            ? variables.translations[locale][key]
            : variables[key];

        if (value !== undefined) {
            usedVariables.add(key);
            return String(value);
        }

        return match;
    });
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
            return String(value);
        }

        return match;
    });
}

/**
 * Process any value recursively with tracking
 */
function processValueWithTracking(value: any, variables: GlobalVariablesData, locale: string | undefined, usedVariables: Set<string>): any {
    if (typeof value === 'string') return processTextWithTracking(value, variables, locale, usedVariables);
    if (Array.isArray(value)) return value.map(item => processValueWithTracking(item, variables, locale, usedVariables));
    if (value && typeof value === 'object') {
        const result: any = {};
        for (const [key, val] of Object.entries(value)) {
            result[key] = processValueWithTracking(val, variables, locale, usedVariables);
        }
        return result;
    }
    return value;
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
    const variables = await loadGlobalVariables();

    // Track which variables are being used
    const usedVariables = new Set<string>();

    const processedComponents = page.components.map(component => {
        const processedFormData = processValueWithTracking(component.formData, variables, locale, usedVariables);
        return {
            ...component,
            formData: processedFormData
        };
    });

    return { ...page, components: processedComponents };
}

/**
 * Process multiple pages with global variables
 */
export async function processPagesWithGlobalVariables(pages: Page[], locale?: string): Promise<Page[]> {
    const variables = await loadGlobalVariables();

    return pages.map(page => ({
        ...page,
        components: page.components.map(component => ({
            ...component,
            formData: processValue(component.formData, variables, locale)
        }))
    }));
}
