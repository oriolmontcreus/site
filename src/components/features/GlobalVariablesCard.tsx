import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Globe } from "lucide-react"

export default function GlobalVariablesCard() {
    return (
        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-2">
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
                <div className="space-y-4">
                    <div className="text-sm">
                        <span className="text-muted-foreground">Welcome to </span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span
                                    className="cursor-help font-medium dark:text-blue-400 text-blue-500 font-mono px-1 py-0.5 rounded transition-colors hover:bg-accent"
                                    style={{
                                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                                    }}
                                >
                                    {"{{siteName}}"}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>EXCALIBUR CMS</p>
                            </TooltipContent>
                        </Tooltip>
                        <span className="text-muted-foreground">!</span>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <div>• Update once, change everywhere</div>
                            <div>• Perfect for contact info & branding</div>
                            <div>• Keep content consistent across pages</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
