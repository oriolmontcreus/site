import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function ExtensiveDocsCard() {
    return (
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
    )
}
