import React, { useState, useRef, useEffect, useCallback } from "react";
import type { PointerEvent, KeyboardEvent } from "react";

const MIN_RANGE = 50; // px – minimum gap between the two handles
const ROTATION_DEG = -2.76; // matches CSS transform
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);

interface TextSliderProps {
    width?: number;
    height?: number;
    handleSize?: number;
    onChange?: (range: { left: number; right: number; range: number }) => void;
}

function TextSlider({ width: initialWidth, height = 70, handleSize = 28, onChange }: TextSliderProps): React.JSX.Element {
    // Use a ref to measure the container width if not provided
    const containerRef = useRef<HTMLDivElement>(null);
    const [measuredWidth, setMeasuredWidth] = useState<number>(initialWidth ? initialWidth + 35 : 0);

    useEffect(() => {
        if (!initialWidth && containerRef.current) {
            const resizeObserver = new window.ResizeObserver(() => {
                const w = containerRef.current?.getBoundingClientRect().width || 0;
                setMeasuredWidth(w > 0 ? w : 0);
            });
            resizeObserver.observe(containerRef.current);
            // Initial measure
            const w = containerRef.current?.getBoundingClientRect().width || 0;
            setMeasuredWidth(w > 0 ? w : 0);
            return () => resizeObserver.disconnect();
        } else if (initialWidth) {
            setMeasuredWidth(initialWidth + 35);
        }
    }, [initialWidth]);

    const width = measuredWidth;
    const [left, setLeft] = useState<number>(0);
    const [right, setRight] = useState<number>(width);
    const [draggingHandle, setDraggingHandle] = useState<"left" | "right" | null>(null);
    // State to hold the dynamic rotation angle
    const [dynamicRotation, setDynamicRotation] = useState<number>(ROTATION_DEG);

    const leftRef = useRef<number>(left);
    const rightRef = useRef<number>(right);
    const dragRef = useRef<{
        handle: "left" | "right";
        startX: number;
        startY: number;
        initialLeft: number;
        initialRight: number;
    } | null>(null);

    useEffect(() => {
        leftRef.current = left;
        rightRef.current = right;
        onChange?.({ left, right, range: right - left });
    }, [left, right, onChange]);

    // Effect to calculate and set the dynamic rotation
    useEffect(() => {
        if (width > 0) {
            const handleMidpoint = (left + right) / 2;
            const sliderCenter = width / 2;
            // Calculate deviation of the handle midpoint from the slider's absolute center
            const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
            // Define the maximum amount of additional tilt
            const maxAdditionalTilt = 3;
            // Calculate the new rotation based on the deviation
            const newRotation = ROTATION_DEG + (deviationFactor * maxAdditionalTilt);
            setDynamicRotation(newRotation);
        }
    }, [left, right, width]);

    useEffect(() => setRight(width), [width]);

    const startDrag = (handle: "left" | "right", e: PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = {
            handle,
            startX: e.clientX,
            startY: e.clientY,
            initialLeft: leftRef.current,
            initialRight: rightRef.current,
        };
        setDraggingHandle(handle);
    };

    const moveDrag = useCallback(
        (e: PointerEvent | globalThis.PointerEvent) => {
            if (!dragRef.current) return;
            const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
            const dX = e.clientX - startX;
            const dY = e.clientY - startY;
            // We still project onto the *original* angle for consistent drag feel
            const projected = dX * COS_THETA + dY * SIN_THETA;
            if (handle === "left") {
                const newLeft = clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE);
                setLeft(newLeft);
            } else {
                const newRight = clamp(initialRight + projected, leftRef.current + MIN_RANGE, width);
                setRight(newRight);
            }
        },
        [width]
    );

    const endDrag = useCallback(() => {
        dragRef.current = null;
        setDraggingHandle(null);
    }, []);

    useEffect(() => {
        window.addEventListener("pointermove", moveDrag);
        window.addEventListener("pointerup", endDrag);
        window.addEventListener("pointercancel", endDrag);
        return () => {
            window.removeEventListener("pointermove", moveDrag);
            window.removeEventListener("pointerup", endDrag);
            window.removeEventListener("pointercancel", endDrag);
        };
    }, [moveDrag, endDrag]);

    const nudgeHandle = (handle: "left" | "right") => (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        const delta = e.key === "ArrowLeft" ? -10 : 10;
        if (handle === "left") {
            setLeft((prev) => clamp(prev + delta, 0, rightRef.current - MIN_RANGE));
        } else {
            setRight((prev) => clamp(prev + delta, leftRef.current + MIN_RANGE, width));
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative select-none transition-transform duration-300 ease-out"
            style={{ width: initialWidth ? width : "100%", height, transform: `rotate(${dynamicRotation}deg)` }}
        >
            <div className="absolute inset-0 rounded-2xl border border-yellow-500 pointer-events-none" />
            {(["left", "right"] as Array<"left" | "right">).map((handle) => {
                const x = handle === "left" ? left : right - handleSize;
                const scaleClass = draggingHandle === handle ? "scale-125" : "hover:scale-110";

                return (
                    <button
                        key={handle}
                        type="button"
                        aria-label={handle === "left" ? "Adjust start" : "Adjust end"}
                        onPointerDown={(e) => startDrag(handle, e)}
                        onKeyDown={nudgeHandle(handle)}
                        className={`z-20 absolute top-0 h-full w-7 rounded-full bg-[#262626] border border-yellow-500 flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-transform duration-150 ease-in-out opacity-100 ${scaleClass}`}
                        style={{ left: x, touchAction: "none" }}
                    >
                        <span className="w-1 h-8 rounded-full bg-yellow-500" />
                    </button>
                );
            })}
            {/* Decreased font size for "Video Editor" text to be smaller than the main title */}
            <div
                className="flex z-10 items-center justify-center w-full h-full px-4 overflow-hidden pointer-events-none font-bold tracking-tighter text-5xl text-black dark:text-white md:text-7xl"
                style={{ clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)` }}
            >
                Extensibleeeeee
            </div>
        </div>
    );
}

export default TextSlider;
