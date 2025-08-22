import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Puzzle } from "lucide-react"
import TextSlider from "../TextSlider"

export default function FullyExtensibleCard() {
    return (
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
                Fully <TextSlider width={200} />
            </CardContent>
        </Card>
    )
}
