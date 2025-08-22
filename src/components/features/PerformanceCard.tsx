import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

export default function PerformanceCard() {
    return (
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
    )
}
