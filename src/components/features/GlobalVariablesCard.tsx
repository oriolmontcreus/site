import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

export default function GlobalVariablesCard() {
    return (
        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-2 hover:shadow-lg transition-shadow duration-300">
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
                <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Contact email across all pages</div>
                    <div>• Social media links</div>
                    <div>• Company information</div>
                </div>
            </CardContent>
        </Card>
    )
}
