import React, { useState } from "react";

interface ImageComparisonProps {
  leftImageSrc: string;
  leftImageAlt?: string;
  rightImageSrc: string;
  rightImageAlt?: string;
}

import { GripVertical } from "lucide-react";

function ImageComparison({ leftImageSrc, leftImageAlt, rightImageSrc, rightImageAlt }: ImageComparisonProps) {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  // Static, hardcoded HTML-like block using divs/spans with Tailwind classes (no runtime processing)
  const StaticCodeBlock = (
    <div>
      <div>
        <span className="text-purple-300">TextInput</span>(<span className="text-green-300">'title'</span>)
      </div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">label</span>(<span className="text-green-300">'Article title'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">required</span>()</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">placeholder</span>(<span className="text-green-300">'Enter the article title'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">translatable</span>(),</div>
    </div>
  );

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <div className="w-full py-8 lg:py-12">
      <div className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
        onMouseMove={onMouseMove}
        onMouseUp={() => setOnMouseDown(false)}
        onTouchMove={onMouseMove}
        onTouchEnd={() => setOnMouseDown(false)}
      >
        <div
          className="bg-muted h-full w-1 absolute z-20 top-0 -ml-1 select-none"
          style={{ left: inset + "%" }}
        >
          <button
            className="bg-muted rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center"
            onTouchStart={(e) => {
              setOnMouseDown(true);
              onMouseMove(e);
            }}
            onMouseDown={(e) => {
              setOnMouseDown(true);
              onMouseMove(e);
            }}
            onTouchEnd={() => setOnMouseDown(false)}
            onMouseUp={() => setOnMouseDown(false)}
          >
            <GripVertical className="h-4 w-4 select-none" />
          </button>
        </div>
        <div
          className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none border bg-slate-900/80 text-sm text-slate-50 overflow-auto"
          // clip the right side so the left content is visible up to `inset`%
          style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }}
        >
          <pre className="m-0 p-6 whitespace-pre-wrap font-mono text-sm">
            <code className="block">
              {StaticCodeBlock}
            </code>
          </pre>
        </div>
        <img
          src="../"
          alt={rightImageAlt || "Representation of the right image"}
          width={1920}
          height={1080}
          loading="lazy"
          draggable={false}
          className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none border"
        />
      </div>
    </div>
  );
}

export { ImageComparison };
