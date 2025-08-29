import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { AstroLogo, WordPressLogo, GatsbyLogo, NextJsLogo, NuxtLogo } from "@/components/icons/logos"
import { AstroIconLight } from "@/components/icons/AstroIconLight"
import { AstroIconDark } from "@/components/icons/AstroIconDark"
import AnimatedLink from "@/components/ui/AnimatedLink"

export default function PerformanceCard() {
    const frameworks = [
        { name: "Astro", percentage: 63, LogoComponent: AstroLogo },
        { name: "WordPress", percentage: 44, LogoComponent: WordPressLogo },
        { name: "Gatsby", percentage: 42, LogoComponent: GatsbyLogo },
        { name: "Next.js", percentage: 27, LogoComponent: NextJsLogo },
        { name: "Nuxt", percentage: 24, LogoComponent: NuxtLogo }
    ]

    return (
        <Card className="relative md:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-2 overflow-hidden">
            {/* Big tilted icon in top right */}
            <div className="absolute top-6 right-4 opacity-50 pointer-events-none transform rotate-12">
                <AstroIconLight
                    className="block dark:hidden w-12 h-12 md:w-20 md:h-20"
                />
                <AstroIconDark
                    className="hidden dark:block w-12 h-12 md:w-20 md:h-20"
                />
            </div>
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Zap className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-2xl">Extreme Performance</CardTitle>
                <CardDescription className="text-base">
                    Fast website performance out of the box thanks to
                    <AnimatedLink href="https://astro.build" target="_blank" rel="noopener noreferrer" className="ml-1">
                        Astro
                    </AnimatedLink>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-4 sm:p-8 bg-muted/30 border border-border/20 rounded-xl sm:rounded-2xl">
                    <p className="text-muted-foreground">% of real-world sites with good Core Web Vitals</p>

                    <div className="mt-8 mb-5 space-y-4">
                        {frameworks.map((framework, index) => (
                            <div
                                key={framework.name}
                                className={`w-full group whitespace-nowrap flex flex-col lg:flex-row lg:items-center justify-start gap-4 ${index === 0 ? 'data-[glow=true]:glow' : ''
                                    }`}
                                data-glow={index === 0 ? "true" : undefined}
                            >
                                <p className="lg:w-2/12 xl:w-1/12 min-w-36 hidden lg:block text-xl lg:text-end text-foreground">
                                    {framework.name}
                                </p>
                                <div className="h-8 sm:h-10 w-full flex items-center gap-2 outline-1 outline-offset-2 sm:outline-offset-4 outline-muted-foreground/50 group-data-[glow]:outline-muted-foreground rounded-lg">
                                    <div
                                        style={{ width: `${framework.percentage}%` }}
                                        className={`px-2 h-full flex items-center gap-2 rounded-lg ${index === 0
                                            ? 'bg-muted-foreground/50 group-data-[glow]:bg-gradient-to-r group-data-[glow]:from-blue-500 group-data-[glow]:to-green-500'
                                            : 'bg-muted-foreground/50'
                                            }`}
                                    >
                                        <framework.LogoComponent className="text-white" />
                                    </div>
                                    <span className="sr-only">{framework.name} Core Web Vitals Passing</span>
                                    <p className={`text-lg sm:text-xl font-semibold ${index === 0
                                        ? 'group-data-[glow]:text-2xl sm:group-data-[glow]:text-3xl text-foreground group-data-[glow]:text-green-500'
                                        : 'text-foreground'
                                        }`}>
                                        {framework.percentage}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-muted-foreground text-balance text-sm">
                        <AnimatedLink
                            href="https://lookerstudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d2be/page/M6ZPC?params=%7B%22df44%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580WordPress%25EE%2580%2580Next.js%25EE%2580%2580Nuxt.js%25EE%2580%2580Gatsby%25EE%2580%2580Astro%25EE%2580%2580SvelteKit%25EE%2580%2580Remix%22%7D"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View the full dataset
                        </AnimatedLink>
                        ✦ Based on real-world performance data from{' '}
                        <AnimatedLink
                            href="https://httparchive.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            HTTP Archive
                        </AnimatedLink>
                        {' '}and the{' '}
                        <AnimatedLink
                            href="https://developer.chrome.com/docs/crux"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Chrome UX Report
                        </AnimatedLink>.
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
