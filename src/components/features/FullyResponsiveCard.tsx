import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone } from "lucide-react"

export default function FullyResponsiveCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                        <Smartphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Fully Responsive</CardTitle>
                <CardDescription>
                    Optimized for desktop and laptop workflows, but works perfectly on tablets and phones too
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>📱 Mobile</span>
                    <span>💻 Desktop</span>
                    <span>📟 Tablet</span>
                </div>
            </CardContent>
        </Card>
    )
}
