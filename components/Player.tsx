"use client";

import React, { useState } from 'react'

import useGetSongById from '@/hooks/useGetSongsById';
import useLoadSong from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer'
import PlayerContent from './PlayerContent';
import usePlayerInfoModel from '@/hooks/usePlayerInfoModel';
import PlayerImage from './PlayerImage';
import { FaTimes } from 'react-icons/fa';
import LikeButton from './LikeButton';

const Player = () => {

    const player = usePlayer();
    const [shuffle, setShuffle] = useState(false);
    const { song, isLoading } = useGetSongById(player.activeId);
    const songUrl = useLoadSong(song!);

    const { isOpen, onClose } = usePlayerInfoModel();



    const onclick = () => {
        onClose();
    }

    if (!song || !songUrl || !player.activeId) {
        return null
    }

    return (
        <div className='relative '>

            <div className={`fixed bottom-0 justify-end flex flex-col 
            ${isOpen ? 'bg-neutral-900 ' : 'bg-black'} w-full py-2 
             ease-in-out transition-all ${isOpen ? 'h-full' : 'h-[80px]'} px-4 gap-5`}
            >
                <div className={`${isOpen ? 'flex' : 'hidden'} w-full h-full md:justify-start
                 md:items-end justify-center items-center relative`}>
                    <div className='absolute top-4 right-3 z-10 w-6 h-6 flex justify-center 
                    items-center rounded-full bg-white' onClick={onclick}>
                        <FaTimes className=' text-black ' />
                    </div>
                    <PlayerImage
                        song={song}
                        types='bg'
                    />
                    <div className='md:flex-row flex flex-col  gap-x-6 w-full justify-start md:items-end 
                    items-center '>
                        <PlayerImage
                            song={song}
                            types='fr'
                        />
                        <div className=' w-full h-full flex flex-col md:items-start md:mt-0 mt-4 
                        overflow-hidden
                        md:p-0 p-2 items-center '>
                            <h1 className=' font-semibold md:text-[46px] text-[26px] z-10 text-white w-full truncate'>
                                {song.title}
                            </h1>
                            <div className='flex gap-2 w-full mt-2 z-10'>
                                <h1 className='text-white font-semibold md:text-base w-full truncate text-sm '>
                                  By - {song?.author} 
                                </h1>
                                <div className=' flex items-center justify-end'>
                                <LikeButton songId={song.id} />
                            </div>
                            </div>
                        </div>
                    </div>

                </div>

                <PlayerContent
                    key={songUrl}
                    song={song}
                    songUrl={songUrl}
                    isLoading={isLoading}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                />

            </div>

        </div>
    )
}

export default Player