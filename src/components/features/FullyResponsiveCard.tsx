import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone } from "lucide-react"

export default function FullyResponsiveCard() {
    return (
        <Card className="md:col-span-1 lg:col-span-1 xl:col-span-1">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                        <Smartphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                </div>
                <CardTitle className="text-lg">Responsive</CardTitle>
                <CardDescription>
                    Optimized for desktop and laptop workflows, but works perfectly on tablets and phones too
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Phone */}
                    <div className="flex flex-col items-center group">
                        <div className="relative transform transition-transform duration-200 group-hover:scale-105 select-none">
                            <img
                                src="/phone-opt.webp"
                                alt="Mobile phone"
                                width={64}
                                height={64}
                                loading="lazy"
                                draggable={false}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs text-muted-foreground mt-2">Mobile</span>
                    </div>

                    {/* Tablet */}
                    <div className="flex flex-col items-center group">
                        <div className="relative transform transition-transform duration-200 group-hover:scale-105 select-none">
                            <img
                                src="/ipad-opt.webp"
                                alt="iPad tablet"
                                width={64}
                                height={64}
                                loading="lazy"
                                draggable={false}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs text-muted-foreground mt-2">Tablet</span>
                    </div>

                    {/* Laptop */}
                    <div className="flex flex-col items-center group">
                        <div className="relative transform transition-transform duration-200 group-hover:scale-105 select-none">
                            <img
                                src="/laptop-opt.webp"
                                alt="Laptop computer"
                                width={64}
                                height={64}
                                loading="lazy"
                                draggable={false}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs text-muted-foreground mt-2">Desktop</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}