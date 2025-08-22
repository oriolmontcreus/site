import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket } from "lucide-react"
import Folder from "../Folder"

import React, { useState } from "react"

export default function FastDevelopmentCard() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    return (
        <Card
            className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardHeader onClick={handleClick}>
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
            <CardContent
                className="flex justify-center pt-18 pb-6"
            >
                <Folder open={open} />
            </CardContent>
        </Card>
    );
}
