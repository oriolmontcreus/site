import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages } from "lucide-react"

export default function TranslationModeCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                        <Languages className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Translation Mode</CardTitle>
                <CardDescription>
                    Switch between Content and Translation modes to focus on either creating or translating
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                        Content Mode
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        Translation Mode
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
