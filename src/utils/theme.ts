import * as React from 'react';

type Theme = 'light' | 'dark';

// Simple theme utilities
export function setTheme(theme: Theme) {
    if (typeof document === 'undefined') return;

    // Show overlay
    showThemeOverlay();

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // ignore
    }

    // Hide overlay after 300ms delay
    setTimeout(() => {
        hideThemeOverlay();
    }, 300);

    // Dispatch custom event for React components to listen
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
}

function showThemeOverlay() {
    if (typeof document === 'undefined') return;

    // Remove existing overlay if any
    const existingOverlay = document.getElementById('theme-transition-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'theme-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0.1;
        z-index: 9999;
        pointer-events: none;
        transition: opacity 0.15s ease;
    `;

    document.body.appendChild(overlay);

    // Force reflow and fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '0.3';
    });
}

function hideThemeOverlay() {
    if (typeof document === 'undefined') return;

    const overlay = document.getElementById('theme-transition-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
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

export function toggleTheme() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
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
