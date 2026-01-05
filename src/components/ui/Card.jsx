import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, padding = 'p-6', ...props }) => {
    return (
        <div
            className={twMerge(
                clsx(
                    'bg-white rounded-2xl border border-gray-100 shadow-sm',
                    padding,
                    className
                )
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
