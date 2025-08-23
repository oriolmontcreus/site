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
        { word: "Hello", color: "text-cyan-500" }, // English
        { word: "Merhaba", color: "text-lime-500" }, // Turkish
        { word: "Salam", color: "text-rose-500" }, // Arabic
        { word: "Hej", color: "text-amber-500" }, // Swedish
        { word: "Aloha", color: "text-violet-500" }, // Hawaiian
        { word: "Sawubona", color: "text-emerald-500" }, // Zulu
        { word: "Shalom", color: "text-indigo-500" }, // Hebrew
        { word: "Namaste", color: "text-gray-500" }, // Hindi
        { word: "Sawasdee", color: "text-yellow-400" }, // Thai
    ]

    // Predefined sizes for each word for readability
    const wordStyles = [
        { fontSize: "1rem", color: "text-blue-500" }, // Bonjour
        { fontSize: "1.7rem", color: "text-red-500" }, // Hola
        { fontSize: "1.4rem", color: "text-green-500" }, // 你好
        { fontSize: "1.3rem", color: "text-yellow-500" }, // Hallo
        { fontSize: "1.2rem", color: "text-pink-500" }, // Ciao
        { fontSize: "1rem", color: "text-purple-500" }, // Olá
        { fontSize: "1.5rem", color: "text-orange-500" }, // Привет
        { fontSize: "1rem", color: "text-teal-500" }, // こんにちは
        { fontSize: "0.7rem", color: "text-fuchsia-500" }, // 안녕하세요
        { fontSize: "1.2rem", color: "text-cyan-500" }, // Hello
        { fontSize: "1.1rem", color: "text-lime-500" }, // Merhaba
        { fontSize: "1.3rem", color: "text-rose-500" }, // Salam
        { fontSize: "1rem", color: "text-amber-500" }, // Hej
        { fontSize: "1.2rem", color: "text-violet-500" }, // Aloha
        { fontSize: "1.1rem", color: "text-emerald-500" }, // Sawubona
        { fontSize: "1.2rem", color: "text-indigo-500" }, // Shalom
        { fontSize: "1.3rem", color: "text-gray-500" }, // Namaste
        { fontSize: "1.1rem", color: "text-yellow-400" }, // Sawasdee
    ];

    const [animatedWords, setAnimatedWords] = useState<Word[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Helper to get a random set of 6 words, ensuring no overlap with previous set
    const prevWordsRef = useRef<Set<string>>(new Set());
    const getRandomWords = () => {
        let available = words.filter(w => !prevWordsRef.current.has(w.word));
        // If not enough available, reset previous and shuffle all
        if (available.length < 6) {
            prevWordsRef.current.clear();
            available = [...words];
        }
        const shuffled = [...available].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        prevWordsRef.current = new Set(selected.map(w => w.word));
        return selected;
    };

    useEffect(() => {
        const initial = getRandomWords();
        setAnimatedWords(initial);
        intervalRef.current = setInterval(() => {
            setAnimatedWords(getRandomWords());
        }, 5000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <Card
            className="md:col-span-1 lg:col-span-1 xl:col-span-1 transition-shadow duration-300"
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
            <CardContent className="relative h-full min-h-[140px]">
                <AnimatePresence>
                    {animatedWords.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2 py-2"
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
                                    className={`font-bold pointer-events-none select-none ${wordStyles[i]?.color}`}
                                    style={{ fontSize: wordStyles[i]?.fontSize, fontWeight: 600, whiteSpace: "nowrap" }}
                                >
                                    {w.word}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                {animatedWords.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-6xl opacity-5 dark:opacity-10">
                            <Languages size={40} />
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    )
}
