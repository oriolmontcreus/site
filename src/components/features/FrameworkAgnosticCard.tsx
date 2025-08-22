import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react"
import { ReactIcon } from "../icons/ReactIcon"
import { SvelteIcon } from "../icons/SvelteIcon"
import { VueIcon } from "../icons/VueIcon"
import { PreactIcon } from "../icons/PreactIcon"
import { SolidIcon } from "../icons/SolidIcon"
import { AlpineIcon } from "../icons/AlpineIcon"

export default function FrameworkAgnosticCard() {
    return (
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
                    <VueIcon />
                    <SvelteIcon />
                    <PreactIcon />
                    <SolidIcon />
                    <AlpineIcon />
                </div>
            </CardContent>
        </Card>
    )
}
