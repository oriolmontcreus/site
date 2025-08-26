import * as React from 'react';

// Global theme management utility
type Theme = 'light' | 'dark';

class ThemeManager {
    private static instance: ThemeManager;
    private theme: Theme = 'dark';
    private listeners: Set<(theme: Theme) => void> = new Set();
    private isInitialized = false;

    private constructor() { }

    static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    initialize() {
        if (this.isInitialized || typeof window === 'undefined') return;

        // Get initial theme from document class (set by Layout script)
        this.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        this.isInitialized = true;

        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme' && e.newValue) {
                const newTheme = e.newValue as Theme;
                if (this.theme !== newTheme) {
                    this.setTheme(newTheme, false);
                }
            }
        });
    }

    private applyTheme(theme: Theme) {
        if (typeof document === 'undefined') return;

        // Use requestAnimationFrame to avoid blocking
        requestAnimationFrame(() => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }

    getTheme(): Theme {
        if (!this.isInitialized && typeof window !== 'undefined') {
            this.initialize();
        }
        return this.theme;
    }

    setTheme(theme: Theme, updateStorage: boolean = true) {
        if (this.theme === theme) return;

        this.theme = theme;
        this.applyTheme(theme);

        if (updateStorage) {
            try {
                localStorage.setItem('theme', theme);
            } catch (e) {
                // ignore storage errors
            }
        }

        // Notify all listeners asynchronously
        setTimeout(() => {
            this.listeners.forEach(listener => listener(theme));
        }, 0);
    }

    toggleTheme() {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    }

    subscribe(listener: (theme: Theme) => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

// Export singleton instance
export const themeManager = ThemeManager.getInstance();

// Export hook for React components - hydration safe
export function useTheme() {
    // Always start with dark theme to match server rendering
    const [theme, setThemeState] = React.useState<Theme>('dark');
    const [isHydrated, setIsHydrated] = React.useState(false);

    React.useEffect(() => {
        // Mark as hydrated and get actual theme
        setIsHydrated(true);
        themeManager.initialize();
        setThemeState(themeManager.getTheme());

        // Subscribe to theme changes
        const unsubscribe = themeManager.subscribe((newTheme) => {
            setThemeState(newTheme);
        });

        return unsubscribe;
    }, []);

    return {
        theme,
        isHydrated,
        setTheme: (newTheme: Theme) => themeManager.setTheme(newTheme),
        toggleTheme: () => themeManager.toggleTheme(),
    };
}
