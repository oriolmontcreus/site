
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

export const CommitsGrid = ({ text }: { text: string }) => {
    const cleanString = (str: string): string => {
        const upperStr = str.toUpperCase();
        const allowedChars = Object.keys(letterPatterns);
        return upperStr
            .split("")
            .filter((char) => allowedChars.includes(char))
            .join("");
    };

    const generateHighlightedCells = (text: string) => {
        const cleanedText = cleanString(text);
        const width = Math.max(cleanedText.length * 6, 6) + 1;
        let currentPosition = 1;
        const highlightedCells: number[] = [];
        cleanedText
            .toUpperCase()
            .split("")
            .forEach((char) => {
                if (letterPatterns[char]) {
                    const pattern = letterPatterns[char].map((pos) => {
                        const row = Math.floor(pos / 50);
                        const col = pos % 50;
                        return (row + 1) * width + col + currentPosition;
                    });
                    highlightedCells.push(...pattern);
                }
                currentPosition += 6;
            });
        return {
            cells: highlightedCells,
            width,
            height: 9,
        };
    };

    const {
        cells: highlightedCells,
        width: gridWidth,
        height: gridHeight,
    } = generateHighlightedCells(text);

    // Precompute randoms in state for hydration safety
    type CellData = {
        isHighlighted: boolean;
        shouldFlash: boolean;
        animationDelay: string;
        highlightColor: string;
    };

    const commitColors = ["#48d55d", "#016d32", "#0d4429"];
    // Removed hoverColors

    const [cells, setCells] = useState<CellData[]>([]);


    // Only generate animation data once on mount
    useEffect(() => {
        const timeout = setTimeout(() => {
            const arr: CellData[] = Array.from({ length: gridWidth * gridHeight }).map((_, index) => {
                const isHighlighted = highlightedCells.includes(index);
                const shouldFlash = !isHighlighted && Math.random() < 0.3;
                const animationDelay = `${(Math.random() * 0.6).toFixed(1)}s`;
                const highlightColor = commitColors[Math.floor(Math.random() * commitColors.length)];
                return { isHighlighted, shouldFlash, animationDelay, highlightColor };
            });
            setCells(arr);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    return (
        <section
            className="w-full bg-card border grid p-1.5 sm:p-3 gap-0.5 sm:gap-1 rounded-[10px] sm:rounded-[15px]"
            style={{
                gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`,
            }}
        >
            {cells.length === gridWidth * gridHeight
                ? cells.map((cell, index) => (
                    <div
                        key={index}
                        className={cn(
                            `border h-full w-full aspect-square rounded-[4px] sm:rounded-[3px] transition-all duration-300 ease-out`,
                            cell.isHighlighted ? "animate-highlight" : "",
                            cell.shouldFlash ? "animate-flash" : "",
                            !cell.isHighlighted && !cell.shouldFlash ? "bg-card" : ""
                        )}
                        style={{
                            animationDelay: cell.animationDelay,
                            "--highlight": cell.highlightColor,
                        } as CSSProperties}
                    />
                ))
                : Array.from({ length: gridWidth * gridHeight }).map((_, index) => {
                    // Use deterministic values for SSR
                    const deterministicDelay = "0s";
                    return (
                        <div
                            key={index}
                            className={cn(
                                `border h-full w-full aspect-square rounded-[4px] sm:rounded-[3px] transition-all duration-300 ease-out`,
                                highlightedCells.includes(index) ? "animate-highlight" : "",
                                "bg-card"
                            )}
                            style={{
                                animationDelay: deterministicDelay,
                            } as CSSProperties}
                        />
                    );
                })}
        </section>
    );
};

const letterPatterns: { [key: string]: number[] } = {
    A: [
        1, 2, 3, 50, 100, 150, 200, 250, 300, 54, 104, 154, 204, 254, 304, 151, 152,
        153,
    ],
    B: [
        0, 1, 2, 3, 4, 50, 100, 150, 151, 200, 250, 300, 301, 302, 303, 304, 54,
        104, 152, 153, 204, 254, 303,
    ],
    C: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304],
    D: [
        0, 1, 2, 3, 50, 100, 150, 200, 250, 300, 301, 302, 54, 104, 154, 204, 254,
        303,
    ],
    E: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304, 151, 152],
    F: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 151, 152, 153],
    G: [
        0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 153, 204, 154,
        304, 254,
    ],
    H: [
        0, 50, 100, 150, 200, 250, 300, 151, 152, 153, 4, 54, 104, 154, 204, 254,
        304,
    ],
    I: [0, 1, 2, 3, 4, 52, 102, 152, 202, 252, 300, 301, 302, 303, 304],
    J: [0, 1, 2, 3, 4, 52, 102, 152, 202, 250, 252, 302, 300, 301],
    K: [0, 4, 50, 100, 150, 200, 250, 300, 151, 152, 103, 54, 203, 254, 304],
    L: [0, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304],
    M: [
        0, 50, 100, 150, 200, 250, 300, 51, 102, 53, 4, 54, 104, 154, 204, 254, 304,
    ],
    N: [
        0, 50, 100, 150, 200, 250, 300, 51, 102, 153, 204, 4, 54, 104, 154, 204,
        254, 304,
    ],
    Ñ: [
        0, 50, 100, 150, 200, 250, 300, 51, 102, 153, 204, 4, 54, 104, 154, 204,
        254, 304,
    ],
    O: [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 303, 54, 104, 154, 204, 254],
    P: [0, 50, 100, 150, 200, 250, 300, 1, 2, 3, 54, 104, 151, 152, 153],
    Q: [
        1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 54, 104, 154, 204, 202, 253, 304,
    ],
    R: [
        0, 50, 100, 150, 200, 250, 300, 1, 2, 3, 54, 104, 151, 152, 153, 204, 254,
        304,
    ],
    S: [1, 2, 3, 4, 50, 100, 151, 152, 153, 204, 254, 300, 301, 302, 303],
    T: [0, 1, 2, 3, 4, 52, 102, 152, 202, 252, 302],
    U: [0, 50, 100, 150, 200, 250, 301, 302, 303, 4, 54, 104, 154, 204, 254],
    V: [0, 50, 100, 150, 200, 251, 302, 4, 54, 104, 154, 204, 253],
    W: [
        0, 50, 100, 150, 200, 250, 301, 152, 202, 252, 4, 54, 104, 154, 204, 254,
        303,
    ],
    X: [0, 50, 203, 254, 304, 4, 54, 152, 101, 103, 201, 250, 300],
    Y: [0, 50, 101, 152, 202, 252, 302, 4, 54, 103],
    Z: [0, 1, 2, 3, 4, 54, 103, 152, 201, 250, 300, 301, 302, 303, 304],
    "0": [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 303, 54, 104, 154, 204, 254],
    "1": [1, 52, 102, 152, 202, 252, 302, 0, 2, 300, 301, 302, 303, 304],
    "2": [0, 1, 2, 3, 54, 104, 152, 153, 201, 250, 300, 301, 302, 303, 304],
    "3": [0, 1, 2, 3, 54, 104, 152, 153, 204, 254, 300, 301, 302, 303],
    "4": [0, 50, 100, 150, 4, 54, 104, 151, 152, 153, 154, 204, 254, 304],
    "5": [0, 1, 2, 3, 4, 50, 100, 151, 152, 153, 204, 254, 300, 301, 302, 303],
    "6": [
        1, 2, 3, 50, 100, 150, 151, 152, 153, 200, 250, 301, 302, 204, 254, 303,
    ],
    "7": [0, 1, 2, 3, 4, 54, 103, 152, 201, 250, 300],
    "8": [
        1, 2, 3, 50, 100, 151, 152, 153, 200, 250, 301, 302, 303, 54, 104, 204, 254,
    ],
    "9": [1, 2, 3, 50, 100, 151, 152, 153, 154, 204, 254, 304, 54, 104],
    " ": [],
};
