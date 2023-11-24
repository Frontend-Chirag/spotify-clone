"use client";

import useLoadSong from '@/hooks/useLoadSongUrl';
import { usePlayerModel } from '@/hooks/usePlayerModel';
import { Song } from '@/types';
import { formatTime } from '@/utils/format';
import React, { useEffect, useState } from 'react'

interface TimeFormateProps {
    song: Song | undefined;
}

const TimeFormate: React.FC<TimeFormateProps> = ({ song }) => {

    const songUrl = useLoadSong(song!);

    const audio = new Audio(songUrl);
    const [duration, setDuration] = useState<number | null>(null);


    useEffect(() => {
        const fetchDuration = () => {
            audio.addEventListener('loadeddata', () => {
                const songDuration = audio.duration;
                setDuration(isNaN(songDuration) ? null : songDuration);
            });
        };

        fetchDuration();
        return () => {
            audio.removeEventListener('loadeddata', fetchDuration);
        };
    }, []);

    if (!songUrl) {
        return null;
    }

    return (
        <>
            <p className='text-neutral-400 text-sm truncate hover:text-white transition-all ease-linear cursor-mouse'>
                {formatTime(duration || 0)}
            </p>
        </>
    )
}

export default TimeFormate