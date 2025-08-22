import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal } from "lucide-react"

export default function CLIToolsCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                        <Terminal className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Custom CLI</CardTitle>
                <CardDescription>Powerful commands to scaffold pages, components, and manage users</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1 font-mono text-xs text-muted-foreground">
                    <div>excalibur create:page</div>
                    <div>excalibur create:component</div>
                    <div>excalibur create:user</div>
                </div>
            </CardContent>
        </Card>
    )
}
