import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"
import { Comparison } from "./Comparison"

export default function FluentAPICard() {
    return (
        <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2">
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
                <div className="py-4">
                    <Comparison />
                </div>
            </CardContent>
        </Card>
    )
}
