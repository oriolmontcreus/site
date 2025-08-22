import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench } from "lucide-react"

export default function BuiltInToolbarCard() {
    return (
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
    )
}
