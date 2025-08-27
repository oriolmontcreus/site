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
                "group inline-flex items-center text-foreground hover:text-blue-600 transition-colors duration-300 ease-out",
                className
            )}
            {...props}
        >
            <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                {children}
            </span>
            <div className="w-0 overflow-hidden transition-all duration-300 ease-out group-hover:w-5">
                <ExternalLink
                    className="size-3 ml-[4px] mt-[2px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />
            </div>
        </a>
    )
}
