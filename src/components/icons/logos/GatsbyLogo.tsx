interface GatsbyLogoProps {
    className?: string;
    width?: string;
    height?: string;
}

export default function GatsbyLogo({ className = "size-[19px]", width = "1em", height = "1em" }: GatsbyLogoProps) {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            aria-label="Gatsby logo"
            viewBox="0 0 18 18"
        >
            <path
                fill="#fff"
                d="M9 0C4.05 0 0 4.05 0 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9M3.986 14.014c-1.35-1.35-2.057-3.15-2.057-4.885l7.007 6.942c-1.8-.064-3.6-.707-4.95-2.057m6.557 1.865L2.12 7.457C2.83 4.307 5.657 1.93 9 1.93a7.09 7.09 0 0 1 5.721 2.892l-.964.836C12.664 4.18 10.93 3.214 9 3.214c-2.507 0-4.629 1.607-5.464 3.857l7.393 7.393c1.864-.643 3.278-2.25 3.728-4.178h-3.086V9h4.5c0 3.343-2.378 6.171-5.528 6.879"
            />
        </svg>
    )
}
