import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function ModeToggle() {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const handleToggle = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        document.documentElement.classList[newIsDark ? "add" : "remove"]("dark");
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", newIsDark ? "dark" : "light");
        }
    };

    return (
        <Toggle
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            pressed={isDark}
            onPressedChange={handleToggle}
            variant="outline"
            className="bg-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-800 transition-colors duration-200 ease-in-out"
            size="sm"
        >
            {isDark ? (
                <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Toggle>
    );
}
