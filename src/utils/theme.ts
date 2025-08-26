import * as React from 'react';

type Theme = 'light' | 'dark';

// Simple theme utilities
export function setTheme(theme: Theme) {
    if (typeof document === 'undefined') return;
    
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
    
    // Dispatch custom event for React components to listen
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
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
