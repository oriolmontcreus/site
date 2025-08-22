import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function OpenSourceCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-slate-100 dark:bg-slate-900/20 rounded-lg">
                        <Github className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Open Source</CardTitle>
                <CardDescription>
                    Fully open source - see how it works, provide feedback, or help make it grow!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Transparent development</div>
                    <div>• Community contributions</div>
                    <div>• Free forever</div>
                </div>
            </CardContent>
        </Card>
    )
}
