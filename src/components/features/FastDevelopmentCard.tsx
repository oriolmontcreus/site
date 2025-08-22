import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket } from "lucide-react"

export default function FastDevelopmentCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <Rocket className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Fast Development</CardTitle>
                <CardDescription>
                    Hybrid storage approach: database, Redis cache, JSON files, and localStorage for optimal speed
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Database for persistence</div>
                    <div>• Redis for caching</div>
                    <div>• JSON for structure</div>
                    <div>• LocalStorage for preferences</div>
                </div>
            </CardContent>
        </Card>
    )
}
