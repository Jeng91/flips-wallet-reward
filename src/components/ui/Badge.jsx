import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    error: 'bg-red-100 text-red-700 border-red-200',
};

export const Badge = ({ children, variant = 'default', className, ...props }) => {
    return (
        <span
            className={twMerge(
                clsx(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
                    variants[variant],
                    className
                )
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
