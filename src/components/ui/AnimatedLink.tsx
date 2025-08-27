import React from 'react'
import { cn } from '@/lib/utils'

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
                "relative inline-block text-foreground hover:text-primary transition-colors duration-300 ease-out",
                "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:opacity-0 after:transition-opacity after:duration-300 after:ease-out hover:after:opacity-100",
                className
            )}
            {...props}
        >
            {children}
        </a>
    )
}
