import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Layers } from "lucide-react"
import { ReactIcon } from "../icons/ReactIcon"
import { SvelteIcon } from "../icons/SvelteIcon"
import { VueIcon } from "../icons/VueIcon"
import { PreactIcon } from "../icons/PreactIcon"
import { SolidIcon } from "../icons/SolidIcon"
import { AlpineIcon } from "../icons/AlpineIcon"
import { AngularIcon } from "../icons/AngularIcon"
import { QwikIcon } from "../icons/QwikIcon"

export default function FrameworkAgnosticCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Framework Agnostic</CardTitle>
                <CardDescription>
                    Built with Astro, use any framework you love
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <ReactIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>React</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <VueIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Vue</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <SvelteIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Svelte</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <PreactIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Preact</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <SolidIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Solid</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <AlpineIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Alpine.js</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <AngularIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Angular</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <QwikIcon size={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Qwik</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </CardContent>
        </Card>
    )
}
