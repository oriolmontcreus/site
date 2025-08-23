import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TranslationModeCard() {
    type Word = { word: string; color: string }
    const words: Word[] = [
        { word: "Bonjour", color: "text-blue-500" }, // French
        { word: "Hola", color: "text-red-500" }, // Spanish
        { word: "你好", color: "text-green-500" }, // Chinese
        { word: "Hallo", color: "text-yellow-500" }, // German
        { word: "Ciao", color: "text-pink-500" }, // Italian
        { word: "Olá", color: "text-purple-500" }, // Portuguese
        { word: "Привет", color: "text-orange-500" }, // Russian
        { word: "こんにちは", color: "text-teal-500" }, // Japanese
        { word: "안녕하세요", color: "text-fuchsia-500" }, // Korean
    ]

    const [showWords, setShowWords] = useState(false)
    const [animatedWords, setAnimatedWords] = useState<Word[]>([])
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        const shuffled = words.sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, 6) // Increased to 6 words since we have more space with flexbox
        setAnimatedWords(selected)
        setShowWords(true)
    }

    const handleMouseLeave = () => {
        setShowWords(false)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setAnimatedWords([])
            timeoutRef.current = null
        }, 300)
    }

    return (
        <Card
            className="md:col-span-1 lg:col-span-1 xl:col-span-1 hover:shadow-lg transition-shadow duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl">
                        <Languages className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <CardTitle className="text-xl font-semibold leading-tight">Translation Mode</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2 text-muted-foreground">
                    Switch between Content and Translation modes to focus on either creating or translating
                </CardDescription>
            </CardHeader>
            <CardContent className="relative h-full min-h-[120px]">
                <AnimatePresence>
                    {showWords && animatedWords.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inset-0 flex flex-wrap items-center justify-center gap-4 p-4"
                        >
                            {animatedWords.map((w, i) => (
                                <motion.span
                                    key={`${w.word}-${i}`}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.6,
                                        y: -10,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 25,
                                        delay: i * 0.1,
                                    }}
                                    className={`font-bold text-lg pointer-events-none select-none ${w.color} drop-shadow-sm`}
                                    style={{
                                        textShadow: "0 2px 12px rgba(0,0,0,0.15)",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {w.word}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showWords && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-6xl opacity-5 dark:opacity-10">
                            <Languages />
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    )
}
