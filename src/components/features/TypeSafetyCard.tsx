import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function TypeSafetyCard() {
    return (
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
    )
}
