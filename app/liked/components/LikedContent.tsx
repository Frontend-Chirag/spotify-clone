"use client";

import { useRouter } from 'next/navigation';

import { Song } from '@/types'
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import TimeFormate from '@/components/TimeFormate';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {

    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);
    
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/')
        }
    }, [user, isLoading, router]);

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No Liked Songs
            </div>
        )
    };

    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {songs.map((item) => (
                <div key={item.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                      <MediaItem
                       onClick={(id: string) => onPlay(id)}
                       data={item}
                      />
                    </div>
                    <TimeFormate
                     song={item}
                    />
                    <LikeButton songId={item.id}/>
                </div>
            ))}
        </div>
    )
}

export default LikedContent