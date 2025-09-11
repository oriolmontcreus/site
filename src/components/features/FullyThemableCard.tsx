import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, RotateCcw } from "lucide-react"
import { useState, useEffect } from "react"

// Predefined color themes
const colorThemes = [
    {
        name: "Default",
        lightColors: {
            "--background": "oklch(1 0 0)",
            "--foreground": "oklch(0.145 0 0)",
            "--card": "oklch(1 0 0)",
            "--card-foreground": "oklch(0.145 0 0)",
            "--primary": "oklch(0.205 0 0)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--border": "oklch(0.922 0 0)",
        },
        darkColors: {
            "--background": "oklch(0.145 0 0)",
            "--foreground": "oklch(0.985 0 0)",
            "--card": "oklch(0.205 0 0)",
            "--card-foreground": "oklch(0.985 0 0)",
            "--primary": "oklch(0.922 0 0)",
            "--primary-foreground": "oklch(0.205 0 0)",
            "--border": "oklch(1 0 0 / 10%)",
        }
    },
    {
        name: "Ocean",
        lightColors: {
            "--background": "oklch(0.97 0.02 220)",
            "--foreground": "oklch(0.15 0.05 220)",
            "--card": "oklch(0.99 0.01 220)",
            "--card-foreground": "oklch(0.15 0.05 220)",
            "--primary": "oklch(0.4 0.15 220)",
            "--primary-foreground": "oklch(0.98 0.02 220)",
            "--border": "oklch(0.85 0.05 220)",
        },
        darkColors: {
            "--background": "oklch(0.12 0.03 220)",
            "--foreground": "oklch(0.92 0.02 220)",
            "--card": "oklch(0.18 0.04 220)",
            "--card-foreground": "oklch(0.92 0.02 220)",
            "--primary": "oklch(0.6 0.15 220)",
            "--primary-foreground": "oklch(0.12 0.03 220)",
            "--border": "oklch(0.3 0.05 220)",
        }
    },
    {
        name: "Forest",
        lightColors: {
            "--background": "oklch(0.97 0.02 140)",
            "--foreground": "oklch(0.15 0.05 140)",
            "--card": "oklch(0.99 0.01 140)",
            "--card-foreground": "oklch(0.15 0.05 140)",
            "--primary": "oklch(0.35 0.12 140)",
            "--primary-foreground": "oklch(0.98 0.02 140)",
            "--border": "oklch(0.85 0.05 140)",
        },
        darkColors: {
            "--background": "oklch(0.12 0.03 140)",
            "--foreground": "oklch(0.92 0.02 140)",
            "--card": "oklch(0.18 0.04 140)",
            "--card-foreground": "oklch(0.92 0.02 140)",
            "--primary": "oklch(0.55 0.12 140)",
            "--primary-foreground": "oklch(0.12 0.03 140)",
            "--border": "oklch(0.3 0.05 140)",
        }
    },
    {
        name: "Sunset",
        lightColors: {
            "--background": "oklch(0.97 0.02 40)",
            "--foreground": "oklch(0.15 0.05 40)",
            "--card": "oklch(0.99 0.01 40)",
            "--card-foreground": "oklch(0.15 0.05 40)",
            "--primary": "oklch(0.45 0.15 40)",
            "--primary-foreground": "oklch(0.98 0.02 40)",
            "--border": "oklch(0.85 0.08 40)",
        },
        darkColors: {
            "--background": "oklch(0.12 0.03 40)",
            "--foreground": "oklch(0.92 0.02 40)",
            "--card": "oklch(0.18 0.04 40)",
            "--card-foreground": "oklch(0.92 0.02 40)",
            "--primary": "oklch(0.65 0.15 40)",
            "--primary-foreground": "oklch(0.12 0.03 40)",
            "--border": "oklch(0.3 0.08 40)",
        }
    },
    {
        name: "Purple",
        lightColors: {
            "--background": "oklch(0.97 0.02 280)",
            "--foreground": "oklch(0.15 0.05 280)",
            "--card": "oklch(0.99 0.01 280)",
            "--card-foreground": "oklch(0.15 0.05 280)",
            "--primary": "oklch(0.4 0.15 280)",
            "--primary-foreground": "oklch(0.98 0.02 280)",
            "--border": "oklch(0.85 0.05 280)",
        },
        darkColors: {
            "--background": "oklch(0.12 0.03 280)",
            "--foreground": "oklch(0.92 0.02 280)",
            "--card": "oklch(0.18 0.04 280)",
            "--card-foreground": "oklch(0.92 0.02 280)",
            "--primary": "oklch(0.6 0.15 280)",
            "--primary-foreground": "oklch(0.12 0.03 280)",
            "--border": "oklch(0.3 0.05 280)",
        }
    }
]

export default function FullyThemableCard() {
    const [originalTheme, setOriginalTheme] = useState<Record<string, string>>({})

    useEffect(() => {
        // Store original theme values
        const root = document.documentElement
        const original: Record<string, string> = {}
        const variablesToStore = [
            "--background",
            "--foreground", 
            "--card",
            "--card-foreground",
            "--primary",
            "--primary-foreground",
            "--border"
        ]
        variablesToStore.forEach(key => {
            original[key] = getComputedStyle(root).getPropertyValue(key).trim()
        })
        setOriginalTheme(original)
    }, [])

    const applyTheme = (theme: typeof colorThemes[0]) => {
        const root = document.documentElement
        const isDarkMode = root.classList.contains('dark')
        
        // Apply the appropriate colors based on current mode
        const colorsToApply = isDarkMode ? theme.darkColors : theme.lightColors
        Object.entries(colorsToApply).forEach(([property, value]) => {
            root.style.setProperty(property, value as string)
        })
        
        // Store the theme data for mode switching
        root.setAttribute('data-current-theme', JSON.stringify(theme))
    }

    // Listen for dark mode changes and reapply the current theme
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const root = document.documentElement
                    const currentThemeData = root.getAttribute('data-current-theme')
                    if (currentThemeData) {
                        try {
                            const theme = JSON.parse(currentThemeData)
                            const isDarkMode = root.classList.contains('dark')
                            const colorsToApply = isDarkMode ? theme.darkColors : theme.lightColors
                            Object.entries(colorsToApply).forEach(([property, value]) => {
                                root.style.setProperty(property, value as string)
                            })
                        } catch (e) {
                            console.warn('Failed to parse theme data:', e)
                        }
                    }
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [])

    const resetTheme = () => {
        const root = document.documentElement
        Object.entries(originalTheme).forEach(([property, value]) => {
            if (value) {
                root.style.setProperty(property, value)
            }
        })
        
        // Remove the theme data attribute
        root.removeAttribute('data-current-theme')
    }

    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                        <Palette className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Themable</CardTitle>
                <CardDescription>
                    Built with shadcn/ui components, customize colors and support both light and dark modes
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                    <div className="w-4 h-4 rounded-full bg-muted"></div>
                    <span className="text-xs text-muted-foreground ml-2">+ Dark Mode</span>
                </div>

                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Try different themes:</div>
                    <div className="grid grid-cols-2 gap-2">
                        {colorThemes.map((theme, index) => (
                            <Button
                                key={theme.name}
                                variant={index === 0 ? "outline" : "secondary"}
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => applyTheme(theme)}
                            >
                                {theme.name}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs h-8 mt-2"
                        onClick={resetTheme}
                    >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
