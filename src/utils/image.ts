/**
 * Image utilities for handling CMS file objects and URL resolution
 * 
 * This utility provides a consistent way to handle images coming from the Excalibur CMS system.
 * The CMS FileInput component returns file objects with metadata instead of simple URLs,
 * so this utility resolves those objects to proper web URLs.
 * 
 * @example Basic usage in a component:
 * ```tsx
 * import { resolveImageUrl, type CmsFileObject } from '@/utils/image';
 * 
 * interface MyComponentProps {
 *   image: string | CmsFileObject | null;
 * }
 * 
 * function MyComponent({ image }: MyComponentProps) {
 *   return (
 *     <img 
 *       src={resolveImageUrl(image, '/default-image.jpg', 'MyComponent')} 
 *       alt="Description" 
 *     />
 *   );
 * }
 * ```
 * 
 * @example With custom fallback:
 * ```tsx
 * const imageUrl = resolveImageUrl(
 *   cmsImage, 
 *   '/custom-placeholder.svg', 
 *   'ProductCard'
 * );
 * ```
 */

/**
 * Represents a file object returned by the CMS FileInput component
 */
export interface CmsFileObject {
    id: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    path: string;
    uploadedAt: string;
}

/**
 * Union type for image data that can be either a string URL or CMS file object
 */
export type ImageInput = string | CmsFileObject | null | undefined;

/**
 * Resolves image URL from various input formats (string URL, CMS file object, etc.)
 * 
 * @param image - Image input (string URL, CMS file object, or null/undefined)
 * @param fallbackUrl - Fallback URL to use when image is invalid (default: '/placeholder-image.jpg')
 * @param componentName - Optional component name for debugging (helps identify where the warning comes from)
 * @returns Resolved image URL
 */
export function resolveImageUrl(
    image: ImageInput,
    fallbackUrl: string = '/placeholder-image.jpg',
    componentName?: string
): string {
    const debugPrefix = componentName ? `${componentName}: ` : '';

    if (!image) {
        if (componentName) {
            console.warn(`${debugPrefix}No image provided, using fallback`);
        }
        return fallbackUrl;
    }

    // Handle string URLs (direct URLs, relative paths, etc.)
    if (typeof image === 'string') {
        return image;
    }

    // Handle CMS file objects
    if (typeof image === 'object' && 'path' in image && image.path) {
        return resolveCmsImageUrl(image.path, componentName);
    }

    if (componentName) {
        console.warn(`${debugPrefix}Invalid image format, using fallback:`, image);
    }
    return fallbackUrl;
}

/**
 * Resolves a CMS image path to a full URL
 * 
 * @param path - File path from CMS (e.g., "uploads\\filename.jpg")
 * @param componentName - Optional component name for debugging
 * @returns Full URL to the image
 */
export function resolveCmsImageUrl(path: string, componentName?: string): string {
    // Convert Windows path separators to forward slashes for web URLs
    const webPath = path.replace(/\\/g, '/');

    // If it's an uploads path, serve it from the CMS backend
    if (webPath.startsWith('uploads/')) {
        // Get the backend URL from environment or default to localhost:3001
        const backendUrl = getCmsBackendUrl();
        const fullUrl = `${backendUrl}/${webPath}`;

        return fullUrl;
    }

    // Return the path as-is if it's not an uploads path
    return webPath;
}

/**
 * Gets the CMS backend URL from environment variables with fallback
 * Cached at module level to avoid repeated environment variable access
 * 
 * @returns CMS backend URL
 */
const CACHED_BACKEND_URL = import.meta.env.PUBLIC_CMS_BACKEND_URL || 'http://localhost:3001';

export function getCmsBackendUrl(): string {
    return CACHED_BACKEND_URL;
}/**
 * Validates if an image object has the required properties
 * 
 * @param image - Image object to validate
 * @returns True if the image object is valid
 */
export function isValidCmsFileObject(image: any): image is CmsFileObject {
    return (
        typeof image === 'object' &&
        image !== null &&
        typeof image.id === 'string' &&
        typeof image.path === 'string' &&
        typeof image.fileName === 'string' &&
        typeof image.mimeType === 'string'
    );
}

/**
 * Extracts the file extension from a CMS file object or URL
 * 
 * @param image - Image input
 * @returns File extension (e.g., 'jpg', 'png') or empty string if not found
 */
export function getImageExtension(image: ImageInput): string {
    if (!image) return '';

    let filename = '';

    if (typeof image === 'string') {
        filename = image;
    } else if (typeof image === 'object' && 'fileName' in image) {
        filename = image.fileName || '';
    }

    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.substring(lastDot + 1).toLowerCase() : '';
}
