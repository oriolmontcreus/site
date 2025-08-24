import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./ModeToggle"
import { GithubIcon } from "./icons/GithubIcon"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
    { href: "#", label: "Home", active: true },
    { href: "#", label: "About" },
]

export default function Component() {
    // Start collapsed if the page isn't at the very top on mount.
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window !== "undefined") {
            return window.scrollY > 0
        }
        return false
    })

    // Track whether we're on the initial load (at very top). If true, the bar is large until
    // the user scrolls away; if the user scrolls back to top, we restore initial state.
    const [initialLoad, setInitialLoad] = useState(() => {
        if (typeof window !== "undefined") return window.scrollY === 0
        return true
    })

    useEffect(() => {
        if (typeof window !== "undefined" && window.scrollY > 0) {
            // If user landed mid-page, treat as already scrolled
            setInitialLoad(false)
            setCollapsed(true)
        }

        const onScroll = () => {
            const y = window.scrollY || window.pageYOffset

            if (y === 0) {
                // Back to very top: expand and mark as initial load
                setCollapsed(false)
                setInitialLoad(true)
                return
            }

            if (initialLoad && y > 0) {
                // First scroll away from top: collapse
                setCollapsed(true)
                setInitialLoad(false)
            }
            // Otherwise: do nothing — keep current collapsed state
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [initialLoad])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-400 dark:border-neutral-700 px-4 md:px-6 ${collapsed ? 'shadow-sm' : ''}`}
        >
            <div className={`flex ${collapsed ? 'h-12' : 'h-16'} items-center justify-between gap-4 transition-[height] duration-300 ease-in-out`}>
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-full">
                                            <NavigationMenuLink
                                                href={link.href}
                                                className="py-1.5"
                                                active={link.active}
                                            >
                                                {link.label}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-primary hover:text-primary/90">
                            <div className="flex items-center gap-1 group">
                                <div className="flex size-6 items-center justify-center rounded-md">
                                    <div className="bg-neutral-700 dark:bg-neutral-200 rounded-sm size-6 transition-colors duration-300 group-hover:bg-neutral-200 group-hover:dark:bg-neutral-700">
                                        <span
                                            className="flex justify-center text-sm h-full items-center text-neutral-200 dark:text-neutral-800 transition-colors duration-300 group-hover:text-neutral-800 group-hover:dark:text-neutral-200"
                                        >EX</span>
                                    </div>
                                </div>

                                <span className={`text-neutral-800 dark:text-neutral-100 font-light text-md transition-all duration-200 ${collapsed ? 'opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`} aria-hidden={collapsed}>
                                    CALIBUR CMS
                                </span>
                            </div>
                        </a>
                        {/* Navigation menu (always visible; becomes compact when collapsed) */}
                        <NavigationMenu className={`max-md:hidden transition-all duration-200`}>
                            <NavigationMenuList className="gap-2">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink
                                            active={link.active}
                                            href={link.href}
                                            className={`text-muted-foreground hover:text-primary font-medium transition-all duration-150 ${collapsed ? 'py-1 text-sm' : 'py-1.5'}`}
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                {/* Right side */}
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="icon" className="rounded-full">
                        <a href="https://github.com/oriolmontcreus/cms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <GithubIcon className="text-muted-foreground" size={24} />
                        </a>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
