import * as React from 'react';
import { waitMs } from './waitMs';

type Theme = 'light' | 'dark';

// Simple theme utilities
export async function setTheme(theme: Theme) {
    if (typeof document === 'undefined') return;

    showThemeOverlay();
    await waitMs(100);

    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    try {
        setTimeout(() => { localStorage.setItem('theme', theme); }, 500);
    } catch (e) {
        // ignore
    }
    setTimeout(() => { hideThemeOverlay(); }, 100);
}

function showThemeOverlay() {
    if (typeof document === 'undefined') return;

    const existingOverlay = document.getElementById('theme-transition-overlay');
    if (existingOverlay) existingOverlay.remove();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'theme-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0;
        z-index: 9999;
        pointer-events: none;
        transition: opacity 0.15s ease-in-out;
    `;

    document.body.appendChild(overlay);

    // Force reflow and fade in to full opacity
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
}

function hideThemeOverlay() {
    if (typeof document === 'undefined') return;

    const overlay = document.getElementById('theme-transition-overlay');
    if (overlay) {
        // Fade out
        overlay.style.opacity = '0';

        // Remove after transition completes
        setTimeout(() => {
            if (overlay.parentNode) overlay.remove();
        }, 150);
    }
}

export function getTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';

    try {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
        // ignore
    }

    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export async function toggleTheme() {
    const current = getTheme();
    await setTheme(current === 'dark' ? 'light' : 'dark');
}

// Simple React hook
export function useTheme() {
    const [theme, setThemeState] = React.useState<Theme>('dark');
    const [isHydrated, setIsHydrated] = React.useState(false);

    React.useEffect(() => {
        setIsHydrated(true);
        setThemeState(getTheme());

        const handleThemeChange = (e: CustomEvent) => {
            setThemeState(e.detail);
        };

        window.addEventListener('theme-change', handleThemeChange as EventListener);
        return () => window.removeEventListener('theme-change', handleThemeChange as EventListener);
    }, []);

    return {
        theme,
        isHydrated,
        setTheme,
        toggleTheme,
    };
}
