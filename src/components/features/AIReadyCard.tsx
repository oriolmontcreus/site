import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"

export default function AIReadyCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">AI Ready</CardTitle>
                <CardDescription>
                    LLM text files included for easy AI agent context - get help from your favorite AI assistant
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                        Context Files
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        AI Friendly
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
