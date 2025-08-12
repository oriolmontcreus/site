import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
    words: string[];
    interval?: number;
}

function AnimatedText({ words, interval = 2000 }: AnimatedTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (currentIndex === words.length - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, interval);
        return () => clearTimeout(timeoutId);
    }, [currentIndex, words, interval]);

    return (
        <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
            &nbsp;
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="absolute font-semibold text-blue-400"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                        currentIndex === index
                            ? {
                                y: 0,
                                opacity: 1,
                            }
                            : {
                                y: currentIndex > index ? -150 : 150,
                                opacity: 0,
                            }
                    }
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

export { AnimatedText };
