import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { TypescriptIcon } from "@/components/icons/TypescriptIcon"

export default function TypeSafetyCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 relative overflow-hidden group">
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
                <div className="flex justify-between items-center mb-20 md:mb-8">
                    <span className="text-sm text-muted-foreground">Type Coverage</span>
                    <span className="font-bold text-green-600 dark:text-green-400">100%</span>
                </div>
                {/* Desktop version with absolute positioning */}
                <div className="absolute -bottom-8 -right-4 group-hover:-bottom-2 group-hover:-right-2 group-hover:rotate-12 transition-all duration-300 ease-in-out">
                    <TypescriptIcon size={120} />
                </div>
            </CardContent>
        </Card>
    )
}
