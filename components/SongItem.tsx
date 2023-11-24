"use client";

import Link from 'next/link';
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import React from 'react'
import PlayButton from './PlayButton';


interface SongItemProps {
    data: Song;
    onClick: ((id: string) => void);
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {

    const imagePath = useLoadImage(data);
   
    return (
        <div

            className='
         relative
         group
         flex 
         flex-col
         items-center
         justify-center
         rounded-md
         overflow-hidden
         gap-x-4
         bg-neutral-400/5
         cursor-pointer
         hover:bg-neutral-400/10
         transition
         p-3

        '
        >
            <div className='
          relative
          aspect-square
          w-full
          h-full
          overflow-hidden
          rounded-md
         '>
                <Link href={`/track/${data.id}`}>
                    <Image
                        src={imagePath || '/images/Liked.png'}
                        className='object-cover'
                        fill
                        alt='image'
                    />
                </Link>
            </div>

            <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
                <p className='font-semibold truncate w-full '>
                    {data.title}
                </p>
                <p className='text-neutral-400 text-sm pb-4 w-full truncate'>
                    By - {data.author}
                </p>
            </div>

            <div className='absolute bottom-24 right-5 ' onClick={() => onClick(data.id)} >
                    <PlayButton         
                    />
            </div>
        </div>
    )
}

export default SongItem