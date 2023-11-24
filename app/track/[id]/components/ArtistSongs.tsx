"use client";

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header';
import MediaItem from '@/components/MediaItem';
import useGetSongById from '@/hooks/useGetSongsById';
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';
import { FaPlay } from 'react-icons/fa';
import useLoadSong from '@/hooks/useLoadSongUrl';
import { formatMinutes } from '@/utils/format';
import usePlayer from '@/hooks/usePlayer';
import getSongs from '@/actions/getSongs';


interface ArtistSongsProps {
  songs: Song[];
  currentSong: Song;
  allSongs: Song[];
}

const ArtistSongs: React.FC<ArtistSongsProps> = ({ songs, currentSong, allSongs }) => {

  const { id } = useParams();
  const { song } = useGetSongById(id.toString());
  const imageUrl = useLoadImage(song!);
  const songUrl = useLoadSong(song!);


  const filterCurrentSongs = songs.filter((current) => current.id !== song?.id);
  const onPlay = useOnPlay(songs);

  let onSinglePlay = useOnPlay(currentSong);

  const [duration, setDuration] = useState<number | null>(null);

  const player = usePlayer();




  useEffect(() => {

    const audio = new Audio(songUrl);

    const fetchDuration = () => {
      audio.addEventListener('loadeddata', () => {
        const songDuration = audio.duration;

        setDuration(isNaN(songDuration) ? null : songDuration);
      });
    };

    fetchDuration();



  }, [songUrl]);

  if (!songUrl) {
    return null;
  }


  return (
    <div className=' flex flex-col gap-y-5'>
      <Header imageUrl={`${imageUrl}`}>
        <div className='flex w-full mt-16 items-center md:items-end md:flex-row 
        flex-col'>
          <Image
            src={imageUrl || ''}
            alt='image'
            width={200}
            height={200}
            className='shadow-xl shadow-black rounded-md'
          />
          <div className='w-full h-full flex flex-col p-6  md:items-start items-center '>
            <p className='text-white font-semibold'>song</p>
            <h1 className='text-white font-semibold md:text-[46px] text-[36px]'>
              {song?.title}
            </h1>
            <h1 className='text-white font-semibold md:text-base text-sm '>
              {song?.author} - {song?.title} - {formatMinutes(duration || 0)}
            </h1>
          </div>

        </div>
        <div className='flex mt-8 gap-x-4 w-full'>
          <button className='rounded-full flex items-center bg-green-500 drop-shodow-md p-4'
            onClick={() => onSinglePlay(currentSong.id)}
          >
            <FaPlay className='text-black' />
          </button>
          <LikeButton
            songId={currentSong.id}
          />
        </div>
      </Header>

      <div className='flex flex-col gap-y-1 w-full p-6'>
        {filterCurrentSongs.length === 0 ?
          <>
            <h1 className='text-white text-2xl mb-6'>Songs May u like</h1>
            {
              allSongs.map((relatedSongs) => (
                <div key={relatedSongs.id} className='flex items-center gap-x-4 w-full'
                >
                  <div className='flex-1'>
                    <MediaItem
                      onClick={(id: string) => onPlay(id)}
                      data={relatedSongs}
                    />
                  </div>
                  <LikeButton
                    songId={relatedSongs.id}
                  />
                </div>
              ))
            }
          </>
          :
          <>
            <h1 className='text-neutral-400'>Tracks By</h1>
            <h1 className='text-white text-2xl mb-6'>{currentSong.author}</h1>
            {
              filterCurrentSongs.map((relatedSongs) => (
                <div key={relatedSongs.id} className='flex items-center gap-x-4 w-full'
                >
                  <div className='flex-1'>
                    <MediaItem
                      onClick={(id: string) => onPlay(id)}
                      data={relatedSongs}
                    />
                  </div>
                  <LikeButton
                    songId={relatedSongs.id}
                  />
                </div>
              ))
            }
          </>
        }

      </div>
    </div>
  )
}

export default ArtistSongs