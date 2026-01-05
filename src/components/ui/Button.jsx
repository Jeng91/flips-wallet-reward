import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300',
    ghost: 'text-gray-700 hover:bg-gray-100',
    white: 'bg-white text-gray-900 hover:bg-gray-50 shadow-sm',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
};

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    return (
        <button
            className={twMerge(
                clsx(
                    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200',
                    variants[variant],
                    sizes[size],
                    className
                )
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
