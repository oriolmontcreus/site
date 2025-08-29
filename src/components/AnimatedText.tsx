import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  words: string[];
  interval?: number;
}

function AnimatedText({ words, interval = 2000 }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasStarted)  setHasStarted(true);
        } else setIsVisible(false);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "50px", // Start animation 50px before entering viewport
      }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current)  observer.unobserve(containerRef.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!isVisible || !hasStarted) return;

    const timeoutId = setTimeout(() => {
      if (currentIndex === words.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, interval);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, words, interval, isVisible, hasStarted]);

  return (
    <span
      ref={containerRef}
      className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 select-none"
      data-oid=".6btiza"
    >
      &nbsp;
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="absolute font-semibold text-blue-400"
          initial={{ opacity: 0, y: "0" }}
          transition={{ type: "spring", stiffness: 50 }}
          animate={
            hasStarted && isVisible && currentIndex === index
              ? {
                y: 0,
                opacity: 1,
              }
              : {
                y: hasStarted && currentIndex > index ? -150 : 150,
                opacity: 0,
              }
          }
          data-oid="1rle.-s"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export { AnimatedText };
