import React from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
}

export default function AnimatedLink({
    children,
    className,
    ...props
}: AnimatedLinkProps) {
    return (
        <a
            className={cn(
                "group inline-flex items-center text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ease-out",
                className
            )}
            {...props}
        >
            <span className="relative px-1 py-0.5 rounded-sm transition-all duration-300 ease-out group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 inline-flex items-center">
                {children}
                <div className="w-0 overflow-hidden transition-all duration-300 ease-out group-hover:w-5">
                    <ExternalLink
                        className="size-3 ml-[4px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                    />
                </div>
            </span>
        </a>
    )
}
