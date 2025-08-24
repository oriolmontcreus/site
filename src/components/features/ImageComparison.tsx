import React, { useState, useRef } from "react";

import { GripVertical, ArrowDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function ImageComparison() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // form state for right-side controls
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [isPublic, setIsPublic] = useState<boolean>(true);

  // Static, hardcoded HTML-like block using divs/spans with Tailwind classes (no runtime processing)
  const StaticCodeBlock = (
    <div>
      <div>
        <span className="text-purple-300">TextInput</span>(<span className="text-green-300">'title'</span>)
      </div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">label</span>(<span className="text-green-300">'Article title'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">required</span>()</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">placeholder</span>(<span className="text-green-300">'Enter the article title'</span>)  </div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">translatable</span>(),</div>

      <div className="leading-6"><br /><span className="text-purple-300">Select</span>(<span className="text-green-300">'category'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">label</span>(<span className="text-green-300">'Category'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">options</span>([<span className="text-green-300">"Tech"</span>, <span className="text-green-300">"Cars"</span>, <span className="text-green-300">"Fashion"</span>]),  </div>

      <div className="leading-6"><br /><span className="text-purple-300">Toggle</span>(<span className="text-green-300">'isPublic'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">label</span>(<span className="text-green-300">'Should be public?'</span>)</div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">helperText</span>(<span className="text-green-300">'Makes the article public'</span>)  </div>
      <div className="leading-6">{'    '}.<span className="text-sky-300">default</span>(<span className="text-green-300">true</span>),</div>
    </div>
  );

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    // Use the container ref if available to compute width/left reliably
    const rect = containerRef.current
      ? containerRef.current.getBoundingClientRect()
      : (e.currentTarget as Element).getBoundingClientRect();

    let x = 0;
    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    let percentage = (x / rect.width) * 100;

    // enforce a minimum width (in pixels) for each side so divider can't go to edges
    const MIN_PX = 60; // minimum pixels for each side
    const minPercent = Math.min((MIN_PX / rect.width) * 100, 49); // at most 49%
    percentage = Math.max(percentage, minPercent);
    percentage = Math.min(percentage, 100 - minPercent);

    setInset(percentage);
  };

  return (
    <div className="w-full">
      {/* scoped styles to hide scrollbar for the left panel */}
      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>

      {/* Desktop / large screens: keep existing interactive split view (md+ only) */}
      <div
        ref={containerRef}
        className="relative hidden md:block aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
        onMouseMove={onMouseMove}
        onMouseUp={() => setOnMouseDown(false)}
        onTouchMove={onMouseMove}
        onTouchEnd={() => setOnMouseDown(false)}
      >
        {/* two-column grid: left column width follows `inset` percent, right column contains controls */}
        <div
          className="grid h-full w-full rounded-2xl border overflow-hidden"
          style={{ gridTemplateColumns: `${inset}% 1fr` }}
        >
          <div
            className="bg-slate-900/80 text-sm text-slate-50 overflow-auto p-6 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* prevent wrapping so content keeps its layout and only overflows/clips when inset changes */}
            <pre className="m-0 whitespace-pre font-mono text-sm">
              <code className="block w-max">{StaticCodeBlock}</code>
            </pre>
          </div>

          <div className="bg-white/3 p-6 flex items-center">
            <div className="w-full max-w-[200px] mx-auto flex flex-col gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-50">Title</label>
                <Input
                  data-slot="input"
                  className="w-full"
                  placeholder="Enter the article title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-50">Category</label>
                <Select onValueChange={(v: string) => setCategory(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="cars">Cars</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-50">Public</div>
                  <div className="text-xs text-muted-foreground">Makes the article public</div>
                </div>
                <Switch checked={isPublic} onCheckedChange={(v) => setIsPublic(Boolean(v))} />
              </div>
            </div>
          </div>
        </div>

        {/* draggable divider positioned between the two grid columns */}
        <div
          className="bg-muted h-full w-1 absolute z-20 top-0 -ml-1 select-none"
          style={{ left: inset + "%" }}
        >
          <button
            className="bg-muted rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center"
            onTouchStart={(e) => {
              setOnMouseDown(true);
              onMouseMove(e as any);
            }}
            onMouseDown={(e) => {
              setOnMouseDown(true);
              onMouseMove(e as any);
            }}
            onTouchEnd={() => setOnMouseDown(false)}
            onMouseUp={() => setOnMouseDown(false)}
          >
            <GripVertical className="h-4 w-4 select-none" />
          </button>
        </div>
      </div>

      {/* Mobile: simple stacked column - code, arrow, then components/controls */}
      <div className="relative md:hidden w-full overflow-hidden rounded-2xl select-none">
        <div className="bg-slate-900/80 text-sm text-slate-50 overflow-auto p-4 hide-scrollbar rounded-2xl">
          <pre className="m-0 whitespace-pre font-mono text-sm">
            <code className="block w-full pr-4">{StaticCodeBlock}</code>
          </pre>
        </div>

        <div className="flex justify-center mt-3">
          <ArrowDown className="h-6 w-6 text-slate-400" />
        </div>

        <div className="bg-white/3 p-4 flex items-center">
          <div className="w-full max-w-md mx-auto flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-50">Title</label>
              <Input
                data-slot="input"
                className="w-full"
                placeholder="Enter the article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-50">Category</label>
              <Select onValueChange={(v: string) => setCategory(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="cars">Cars</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-50">Public</div>
                <div className="text-xs text-muted-foreground">Makes the article public</div>
              </div>
              <Switch checked={isPublic} onCheckedChange={(v) => setIsPublic(Boolean(v))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ImageComparison };
