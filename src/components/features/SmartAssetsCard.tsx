import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload } from "lucide-react"

export default function SmartAssetsCard() {
    return (
        <Card className="md:col-span-2 lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                        <Upload className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <Badge variant="secondary">Asset Management</Badge>
                </div>
                <CardTitle className="text-lg">Smart Assets</CardTitle>
                <CardDescription>
                    Upload images, videos, and files with automatic cleanup - no stale files cluttering your disk
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-xs text-muted-foreground">
                        <div>• Auto file cleanup</div>
                        <div>• Images & videos</div>
                        <div>• Clean disk management</div>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                        <div>• Drag & drop uploads</div>
                        <div>• File type validation</div>
                        <div>• Storage optimization</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
