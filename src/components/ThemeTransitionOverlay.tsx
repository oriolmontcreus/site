import * as React from 'react';

export function ThemeTransitionOverlay() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
        const handleThemeChange = () => {
            setIsVisible(true);
            setIsAnimating(true);
            
            // Start fade out after 150ms
            setTimeout(() => {
                setIsAnimating(false);
            }, 150);
            
            // Remove overlay after fade out completes
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
        };

        window.addEventListener('theme-change', handleThemeChange);

        return () => {
            window.removeEventListener('theme-change', handleThemeChange);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] pointer-events-none bg-black transition-opacity duration-150 ease-in-out"
            style={{
                opacity: isAnimating ? 1 : 0,
            }}
        />
    );
}
