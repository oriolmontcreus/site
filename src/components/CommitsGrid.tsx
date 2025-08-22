
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

export const CommitsGrid = ({ text, isHovered = false }: { text: string; isHovered?: boolean }) => {
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
        hoverAnimationDelay: string;
    };

    const commitColors = ["#48d55d", "#016d32", "#0d4429"];
    const hoverColors = ["#e2f8e7", "#cef2d7", "#b8ecc5"]; // Light, subtle colors for hover

    const [cells, setCells] = useState<CellData[]>([]);

    // Generate deterministic pattern based on index to avoid hydration issues
    const getDeterministicDelay = (index: number) => {
        return `${((index * 0.05) % 0.6).toFixed(1)}s`;
    };

    const getDeterministicHoverDelay = (index: number) => {
        return `${((index * 0.08) % 1.2).toFixed(1)}s`;
    };

    const getDeterministicColor = (index: number, colors: string[]) => {
        return colors[index % colors.length];
    };

    const shouldCellFlash = (index: number) => {
        // Use a deterministic pattern instead of random
        return (index * 7 + 13) % 10 < 3; // Roughly 30% of cells will flash
    };

    // Pre-generate all cell data deterministically
    const generateCellData = (width: number, height: number): CellData[] => {
        return Array.from({ length: width * height }).map((_, index) => {
            const isHighlighted = highlightedCells.includes(index);
            const shouldFlash = !isHighlighted && shouldCellFlash(index);
            const animationDelay = getDeterministicDelay(index);
            const hoverAnimationDelay = getDeterministicHoverDelay(index);
            const highlightColor = getDeterministicColor(index, commitColors);
            return { isHighlighted, shouldFlash, animationDelay, highlightColor, hoverAnimationDelay };
        });
    };


    // Only generate animation data once on mount
    useEffect(() => {
        setCells(generateCellData(gridWidth, gridHeight));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gridWidth, gridHeight]); // Re-run when grid dimensions change

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
                            isHovered ? "animate-hover-wave" : "",
                            !cell.isHighlighted && !cell.shouldFlash ? "bg-card" : ""
                        )}
                        style={{
                            animationDelay: isHovered ? cell.hoverAnimationDelay : cell.animationDelay,
                            "--highlight": cell.highlightColor,
                            "--hover-color": getDeterministicColor(index, hoverColors),
                        } as CSSProperties}
                    />
                ))
                : Array.from({ length: gridWidth * gridHeight }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            `border h-full w-full aspect-square rounded-[4px] sm:rounded-[3px] transition-all duration-300 ease-out`,
                            highlightedCells.includes(index) ? "animate-highlight" : "",
                            isHovered ? "animate-hover-wave" : "",
                            "bg-card"
                        )}
                        style={{
                            animationDelay: isHovered ? getDeterministicHoverDelay(index) : "0s",
                            "--hover-color": getDeterministicColor(index, hoverColors),
                        } as CSSProperties}
                    />
                ))}
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
