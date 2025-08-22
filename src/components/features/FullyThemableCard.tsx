import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette } from "lucide-react"

export default function FullyThemableCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                        <Palette className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Fully Themable</CardTitle>
                <CardDescription>
                    Built with shadcn/ui components, customize colors and support both light and dark modes
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                    <div className="w-4 h-4 rounded-full bg-muted"></div>
                    <span className="text-xs text-muted-foreground ml-2">+ Dark Mode</span>
                </div>
            </CardContent>
        </Card>
    )
}
