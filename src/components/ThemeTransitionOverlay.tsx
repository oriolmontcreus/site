import * as React from 'react';

export function ThemeTransitionOverlay() {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const handleThemeStart = () => {
            setIsVisible(true);
        };

        const handleThemeEnd = () => {
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
        };

        window.addEventListener('theme-change', handleThemeStart);
        window.addEventListener('theme-change', handleThemeEnd);

        return () => {
            window.removeEventListener('theme-change', handleThemeStart);
            window.removeEventListener('theme-change', handleThemeEnd);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] pointer-events-none bg-black transition-opacity duration-300"
            style={{
                opacity: isVisible ? 1 : 0,
            }}
        />
    );
}
