import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function ModeToggle() {
    // Initialize theme from localStorage (if present) or from the document element (set by Layout script)
    const [theme, setTheme] = React.useState<string>(() => {
        if (typeof window === "undefined") return "light";
        try {
            const stored = localStorage.getItem("theme");
            if (stored === "dark" || stored === "light") return stored;
        } catch (e) {
            /* ignore */
        }
        // Fallback to checking the document class (Layout may have set it) or prefers-color-scheme
        if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
            return "dark";
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    React.useEffect(() => {
        if (typeof document !== "undefined") {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
        try {
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("theme", theme);
            }
        } catch (e) {
            // ignore storage errors
        }
    }, [theme]);

    return (
        <div>
            <Toggle
                variant="outline"
                size="sm"
                className="group data-[state=on]:hover:bg-muted text-muted-foreground data-[state=on]:text-muted-foreground data-[state=on]:hover:text-foreground size-8 rounded-full border-none shadow-none data-[state=on]:bg-transparent cursor-pointer flex-shrink-0"
                pressed={theme === "dark"}
                onPressedChange={() =>
                    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
                <Moon
                    size={16}
                    className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                    aria-hidden="true"
                />
                <Sun
                    size={16}
                    className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                    aria-hidden="true"
                />
                <span className="sr-only">Toggle theme</span>
            </Toggle>
        </div >
    );
}
