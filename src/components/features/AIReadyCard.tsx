import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"

export default function AIReadyCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300 group">
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
            <CardContent className="h-full">
                <div className="flex justify-center items-center h-full">
                    <div className="w-32 h-20 rounded-xl flex items-center justify-center font-bold text-xl text-blue-600 dark:text-blue-400 select-none tracking-widest bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-400 group-hover:animate-chip-glow">
                        AI
                    </div>
                </div>
            </CardContent>
            <style>{`
                @keyframes chip-glow {
                    0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
                    50% { box-shadow: 0 0 12px 2px rgba(59,130,246,0.5); }
                    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
                }
                .animate-chip-glow {
                    animation: chip-glow 1.2s ease-in-out infinite;
                }
            `}</style>
        </Card>
    )
}
