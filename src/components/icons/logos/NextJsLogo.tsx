interface NextJsLogoProps {
    className?: string;
    width?: string;
    height?: string;
}

export default function NextJsLogo({ className = "size-5", width = "1em", height = "1em" }: NextJsLogoProps) {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            aria-label="Next.js logo"
            viewBox="0 0 20 20"
        >
            <g fill="none">
                <path
                    stroke="#fff"
                    strokeWidth="1.5"
                    d="M19.25 10a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0Z"
                />
                <path
                    fill="url(#nextjs-gradient-a)"
                    d="M16.61 17.5 7.68 6H6v8h1.35V7.7l8.2 10.62c.38-.25.73-.52 1.06-.82"
                />
                <path
                    fill="url(#nextjs-gradient-b)"
                    d="M14.11 6h-1.33v8h1.33z"
                />
                <defs>
                    <linearGradient
                        id="nextjs-gradient-a"
                        x1="12.11"
                        x2="16.06"
                        y1="12.94"
                        y2="17.83"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#fff" />
                        <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                        id="nextjs-gradient-b"
                        x1="13.44"
                        x2="13.42"
                        y1="6"
                        y2="11.88"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#fff" />
                        <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    )
}
