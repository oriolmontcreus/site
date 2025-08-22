import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Layers,
    Zap,
    Code2,
    Shield,
    Terminal,
    Wrench,
    Globe,
    Languages,
    Palette,
    Smartphone,
    Github,
    BookOpen,
    Puzzle,
    Bot,
    Rocket,
    Upload,
} from "lucide-react"
import { ReactIcon } from "./icons/ReactIcon"
import { SvelteIcon } from "./icons/SvelteIcon"

export default function FeaturesBento() {
    return (
        <main className="min-h-screen bg-background">
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Features that speak for themselves
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover why Excalibur CMS is the perfect choice for modern web development with Astro
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Performance - Large featured card */}
                        <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-2 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <Badge variant="secondary">Performance</Badge>
                                </div>
                                <CardTitle className="text-2xl">Extreme Performance</CardTitle>
                                <CardDescription className="text-base">
                                    Thanks to Astro's build process, we inject CMS data directly into the final build, delivering plain
                                    HTML and CSS for lightning-fast websites
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Build Output</span>
                                        <span className="font-semibold">Plain HTML/CSS</span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div className="bg-primary h-2 rounded-full w-[98%]"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary">0ms</div>
                                            <div className="text-xs text-muted-foreground">Hydration Time</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary">100</div>
                                            <div className="text-xs text-muted-foreground">Lighthouse Score</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Framework Agnostic */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                        <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Framework Agnostic</CardTitle>
                                <CardDescription>
                                    Built with Astro, use any framework you love - React, Vue, Svelte, or plain HTML
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <ReactIcon />
                                    <Badge variant="outline" className="text-xs">
                                        Vue
                                    </Badge>
                                    <SvelteIcon />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Type Safety */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Full Type Safety</CardTitle>
                                <CardDescription>
                                    Everything is built with TypeScript for complete type safety and IDE autocompletion
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Type Coverage</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">100%</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Global Variables */}
                        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-2 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg">
                                        <Globe className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Global Variables</CardTitle>
                                <CardDescription>
                                    Define once, use everywhere. Perfect for contact info, social links, and shared content
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                    <div>• Contact email across all pages</div>
                                    <div>• Social media links</div>
                                    <div>• Company information</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fluent API - Wider card */}
                        <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                        <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <Badge variant="secondary">Developer Experience</Badge>
                                </div>
                                <CardTitle className="text-lg">Fluent API Design</CardTitle>
                                <CardDescription>
                                    Inspired by Filament V3, create custom CMS components with an intuitive, chainable API
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                                    <div className="text-purple-600 dark:text-purple-400">Textarea('subtitle')</div>
                                    <div className="text-muted-foreground ml-4">.label('Subtitle')</div>
                                    <div className="text-muted-foreground ml-4">.required()</div>
                                    <div className="text-muted-foreground ml-4">.translatable()</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* CLI Tools */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                        <Terminal className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Custom CLI</CardTitle>
                                <CardDescription>Powerful commands to scaffold pages, components, and manage users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 font-mono text-xs text-muted-foreground">
                                    <div>excalibur create:page</div>
                                    <div>excalibur create:component</div>
                                    <div>excalibur create:user</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Built-in Toolbar */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                                        <Wrench className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Built-in Toolbar</CardTitle>
                                <CardDescription>
                                    Integrated Astro toolbar with debugging, error traces, and development tips
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                    >
                                        Errors
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                                    >
                                        Warnings
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                    >
                                        Tips
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Translation Mode */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                                        <Languages className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Translation Mode</CardTitle>
                                <CardDescription>
                                    Switch between Content and Translation modes to focus on either creating or translating
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-xs">
                                        Content Mode
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        Translation Mode
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fully Themable */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                                        <Palette className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Fully Themable</CardTitle>
                                <CardDescription>
                                    Built with shadcn/ui components, customize colors and support both light and dark modes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                                    <div className="w-4 h-4 rounded-full bg-muted"></div>
                                    <span className="text-xs text-muted-foreground ml-2">+ Dark Mode</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fully Responsive */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                                        <Smartphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Fully Responsive</CardTitle>
                                <CardDescription>
                                    Optimized for desktop and laptop workflows, but works perfectly on tablets and phones too
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>📱 Mobile</span>
                                    <span>💻 Desktop</span>
                                    <span>📟 Tablet</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Open Source */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-slate-100 dark:bg-slate-900/20 rounded-lg">
                                        <Github className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Open Source</CardTitle>
                                <CardDescription>
                                    Fully open source - see how it works, provide feedback, or help make it grow!
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                    <div>• Transparent development</div>
                                    <div>• Community contributions</div>
                                    <div>• Free forever</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Extensive Docs */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Extensive Docs</CardTitle>
                                <CardDescription>
                                    Comprehensive documentation covering all components, procedures, and best practices
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Coverage</span>
                                    <span className="font-bold text-amber-600 dark:text-amber-400">Complete</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fully Extensible */}
                        <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-violet-100 dark:bg-violet-900/20 rounded-lg">
                                        <Puzzle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <Badge variant="secondary">Extensible</Badge>
                                </div>
                                <CardTitle className="text-lg">Fully Extensible</CardTitle>
                                <CardDescription>
                                    Built with Svelte, HonoJs, and MongoDB - modern, easy-to-use technologies perfect for AI-assisted
                                    development
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge
                                        variant="outline"
                                        className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                    >
                                        Svelte
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                    >
                                        HonoJs
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                                    >
                                        MongoDB
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Ready */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                        <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">AI Ready</CardTitle>
                                <CardDescription>
                                    LLM text files included for easy AI agent context - get help from your favorite AI assistant
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                        Context Files
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        AI Friendly
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fast Development */}
                        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                                        <Rocket className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Fast Development</CardTitle>
                                <CardDescription>
                                    Hybrid storage approach: database, Redis cache, JSON files, and localStorage for optimal speed
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                    <div>• Database for persistence</div>
                                    <div>• Redis for caching</div>
                                    <div>• JSON for structure</div>
                                    <div>• LocalStorage for preferences</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Smart Assets */}
                        <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                                        <Upload className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <Badge variant="secondary">Asset Management</Badge>
                                </div>
                                <CardTitle className="text-lg">Smart Assets</CardTitle>
                                <CardDescription>
                                    Upload images, videos, and files with automatic cleanup - no stale files cluttering your disk
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <div>• Auto file cleanup</div>
                                        <div>• Images & videos</div>
                                        <div>• Clean disk management</div>
                                    </div>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <div>• Drag & drop uploads</div>
                                        <div>• File type validation</div>
                                        <div>• Storage optimization</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}
