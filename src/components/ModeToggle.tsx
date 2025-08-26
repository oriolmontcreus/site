import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/utils/theme";

export function ModeToggle() {
    const { theme, isHydrated, toggleTheme } = useTheme();

    // Show a placeholder during hydration to prevent mismatch
    if (!isHydrated) {
        return (
            <div className="size-8 rounded-full flex items-center justify-center">
                <div className="size-4 animate-pulse bg-muted-foreground/20 rounded"></div>
            </div>
        );
    }

    return (
        <div>
            <Toggle
                variant="outline"
                size="sm"
                className="group data-[state=on]:hover:bg-muted text-muted-foreground data-[state=on]:text-muted-foreground data-[state=on]:hover:text-foreground size-8 rounded-full border-none shadow-none data-[state=on]:bg-transparent cursor-pointer flex-shrink-0"
                pressed={theme === "dark"}
                onPressedChange={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
                <Moon
                    size={16}
                    className="shrink-0 scale-0 opacity-0 transition-all duration-150 group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                    aria-hidden="true"
                />
                <Sun
                    size={16}
                    className="absolute shrink-0 scale-100 opacity-100 transition-all duration-150 group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                    aria-hidden="true"
                />
                <span className="sr-only">Toggle theme</span>
            </Toggle>
        </div>
    );
}
