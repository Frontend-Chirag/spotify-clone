"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';

interface ListItemsProps {
    image: string;
    name: string;
    href: string;
}

const ListItems: React.FC<ListItemsProps> = ({ image, name, href }) => {

    const router = useRouter();

    const onClick = () => {
        // add authentication before push
        router.push(href)
    }

    return (
        <button
            onClick={onClick}
            className='
        relative 
        group 
        flex 
        items-center 
        gap-x-4
        bg-neutral-100/10 
        rounded-md 
        overflow-hidden
        hover:bg-neutral-100/20
        transition
        pr-4
        '>
            <div className='relative min-h-[64px] min-w-[64px]'>
                <Image
                    src={image}
                    alt='image'
                    fill
                    className='object-cover'
                />
            </div>
            <p className='font-medium truncate py-5'>{name}</p>
            <div className='
             text-black
             absolute
             transition
             opacity-0
             rounded-full 
             flex first-letter:items-center
             justify-center
             bg-green-500
             p-4
             group-shadow-md
             right-5
             group-hover:opacity-100
             hover:scale-110
            '>
                <FaPlay />
            </div>
        </button>
    )
}

export default ListItems