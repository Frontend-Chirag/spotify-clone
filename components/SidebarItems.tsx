import React from 'react'
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

import { IconType } from 'react-icons';

interface SidebarItemsProps {
    icon: IconType;
    label: string;
    active: boolean;
    href: string;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ icon: Icon, label, active, href }) => {
    return (
        <Link href={href} className={twMerge(`
         flex flex-row h-auto items-center w-full gap-x-4 text-md
         font-medium cursor-pointer hover:text-white 
         transition
         text-neutral-400
        `, active && "text-white")}>
            <Icon size={26} />
            <p className='w-full truncate'>{label}</p>
        </Link>
    )
}

export default SidebarItems