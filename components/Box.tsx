import React from 'react'
import { twMerge } from 'tailwind-merge';


interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div className={twMerge(`
          bg-neutral-900
          w-full 
          rounded-lg
          h-fit
        `, className)}

        >
            {children}
        </div>
    )
}

export default Box