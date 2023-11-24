"use client"

import React, { useEffect, useRef, useState, SetStateAction } from 'react'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import BeatLoader from "react-spinners/BeatLoader";
import { Song } from '@/types'
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import usePlayer from '@/hooks/usePlayer';
import { formatTime } from '@/utils/format';
import Slider from './Slider';
import * as RadixSlider from '@radix-ui/react-slider';
import usePlayerInfoModel from '@/hooks/usePlayerInfoModel';
import { RxLoop, RxShuffle } from 'react-icons/rx';


interface PlayerContentProps {
    song: Song;
    songUrl: string;
    isLoading?: boolean;
    shuffle: boolean;
    setShuffle: React.Dispatch<SetStateAction<boolean>>;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    songUrl,
    song,
    shuffle,
    setShuffle
}) => {

    const player = usePlayer();
    const audioRef = useRef(new Audio(songUrl));

    const audio = audioRef.current;

    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);
    const [volume, setVolume] = useState<number>(1);
    const [currentTime, setCurrentTime] = useState<number>(0);


    const [loop, setLoop] = useState(false);
    const { isOpen, onOpen, onClose } = usePlayerInfoModel();

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const ValueIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;


    const onPlayNext = () => {

        if (player.ids.length === 0) { return; }

        let nextIndex: number;

        if (Array.isArray(player.ids)) {

            if (shuffle) {
                nextIndex = Math.floor(Math.random() * player.ids.length)
            } else {
                const currentIndex = player.ids.findIndex((id) => id === player.activeId);
                nextIndex = currentIndex + 1;
            }
            if (nextIndex >= player.ids.length) {
                nextIndex = 0;
            }
        } else {
            nextIndex = 0;
        }

        const nextSong = player.ids[nextIndex];

        if (isPlaying) {
            setIsPlaying(false)
            setCurrentTime(0)
            audio.pause();
        } else {
            setIsPlaying(true)
            audio.play();
        }
        player.setId(nextSong);


    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) { return; }

        let previousIndex: number;

        if (Array.isArray(player.ids)) {
            if (shuffle) {
                previousIndex = Math.floor(Math.random() * player.ids.length)
            } else {
                const currentIndex = player.ids.findIndex((id) => id === player.activeId);
                previousIndex = currentIndex - 1;
            }

            if (previousIndex < 0) {
                previousIndex = player.ids.length - 1;
            }
        } else {
            previousIndex = 0;
        }

        const previousSong = player.ids[previousIndex];

        if (isPlaying) {
            setIsPlaying(false)
            setCurrentTime(0);
            audio.pause();
        } else {
            setIsPlaying(true)
            audio.play();
        }

        player.setId(previousSong);
    };

    const handlePlay = () => {
        if (isPlaying) {
            setIsPlaying(false)
            setCurrentTime(0);
            audio.pause();
        } else {
            setIsPlaying(true)
            audio.play();
        }
    };


    useEffect(() => {
        setIsPlaying(true)
        audio.play()

        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
        };

        const fetchDuration = () => {
            audio.addEventListener('loadeddata', () => {
                const songDuration = audio.duration;
                setDuration(isNaN(songDuration) ? null : songDuration);
            });
        };

        audio.addEventListener('timeupdate', updateProgress);
        fetchDuration();

        audio.addEventListener('ended', () => {

            if (player.ids.length === 0) { return; }

            let nextIndex: number;

            if (Array.isArray(player.ids)) {
                if (shuffle) {
                    nextIndex = Math.floor(Math.random() * player.ids.length)
                } else {
                    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
                    nextIndex = currentIndex + 1;
                }
                if (nextIndex >= player.ids.length) {
                    nextIndex = 0;
                }
            } else {
                nextIndex = 0;
            }

            const nextSong = player.ids[nextIndex];

            if (isPlaying) {
                setIsPlaying(true)
                audio.play()
            } else {
                setIsPlaying(false)
                setCurrentTime(0)
                audio.pause();
            }
            player.setId(nextSong);

        });

        return () => {

            audio.pause();
            audio.currentTime = 0
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadeddata', fetchDuration);
        };

    }, [audio, songUrl]);

    const toggleMute = () => {

        if (isVisible) {
            setIsVisible(false);
        } else {
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false)
            }, 5000);
        }

        if (audio.volume === 0) {
            setVolume(1);
            audio.volume = 1
        } else {
            setVolume(0);
            audio.volume = 0;
        }
    };

    const toogleLoop = () => {
        setLoop(!loop)
        audio.loop = !loop;
    }

    const onclick = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };

    const shuffleToggle = () => {
        setShuffle(!shuffle)
    }



    return (
        <>
            {!isOpen ?
                <div className='grid grid-cols-2 md:grid-cols-3 h-[90px] bg-black rounded-md z-10'>
                    <div className='flex sm:w-[200px] justify-start'>
                        <div className='flex items-center w-full gap-x-2' onClick={onclick}>
                            <MediaItem data={song} />
                            <div className='md:flex hidden'>
                                <LikeButton songId={song.id} />
                            </div>
                            {isPlaying && (
                                <BeatLoader
                                    color='#22c55e'
                                    size={10}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    className='md:flex hidden'
                                />
                            )}
                        </div>
                    </div>

                    <div className='flex md:hidden col-auto w-full justify-end  items-center '>
                        <div className='h-10 w-10 flex items-center justify-center  rounded-full
                               bg-white cusror-pointer '  onClick={handlePlay} >
                            <Icon
                                size={30}
                                className='text-black'
                            />
                        </div>
                    </div>

                    <div className='hidden h-full md:flex md:flex-col justify-center 
                    items-center w-full max-w-[722px] p-4 '>

                        <div className='justify-center items-center w-full gap-x-6 flex '>
                            <button className={`${!shuffle ? 'text-neutral-400' : 'text-white '} flex justify-center items-center gap-x-1 bg-transparent `}
                                onClick={shuffleToggle}>
                                <RxShuffle size={18} />
                            </button>
                            <AiFillStepBackward size={25} onClick={onPlayPrevious} className=' cursor-pointer text-neutral-400 hover:text-white transition ' />
                            <div className='flex items-center justify-center h-8 w-8 cursor-pointer 
                       rounded-full p-1 bg-white ' onClick={handlePlay} >
                                <Icon
                                    size={25}
                                    className='text-black'
                                />
                            </div>
                            <AiFillStepForward size={25} onClick={onPlayNext} className='cursor-pointer text-neutral-400 hover:text-white transition ' />
                            <div className={`relative w-fit flex justify-center items-center gap-x-1
                               ${!loop ? 'text-neutral-400 ' : 'text-white '}
                            `} onClick={toogleLoop} >
                                <RxLoop size={20} className='cursor-pointer  ' />

                            </div>
                        </div>
                        <div className='justify-center items-center w-full gap-x-4 flex'>
                            <p className='text-[12px] text-neutral-400'>
                                {formatTime(currentTime)}
                            </p>

                            <RadixSlider.Root className='relative flex items-center select-non touch-none w-full h-10'
                                defaultValue={[1]}
                                value={[currentTime / (duration || 1)]}
                                onValueChange={(values) => {
                                    const newPercentage = values[0];
                                    if (!isNaN(newPercentage) && duration !== null) {
                                        const newCurrentTime = newPercentage * duration;
                                        setCurrentTime(newCurrentTime);
                                        audio.currentTime = newCurrentTime;
                                    }
                                }
                                }
                                max={1}
                                step={0.1}
                                aria-label='Volume'
                            >
                                <RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
                                    <RadixSlider.Range className='absolute bg-white rounded-full h-full' />
                                </RadixSlider.Track>
                            </RadixSlider.Root>
                            <p className='text-[12px] text-neutral-400'>
                                {formatTime(duration || 0)}
                            </p>
                        </div>
                    </div>

                    <div className='hidden md:flex w-full justify-end pr-2'>
                        <div className='flex items-center gap-x-2 w-[120px]'>
                            <ValueIcon onClick={toggleMute} size={30} className='cursor-pointer' />
                            <Slider
                                value={volume}
                                onChange={(value) => { setVolume(value); audio.volume = value; }}
                            />
                        </div>
                    </div>
                </div >

                :
                <div className='h-[253px]  w-full flex flex-col bg-transparent 
                justify-center items-start md:items-center'>
                    <div className=' h-full flex flex-col justify-center 
                        items-center w-full p-2 gap-y-1 '>

                        <div className='justify-center items-center w-full gap-x-4 flex'>
                            <p className='text-[12px] text-neutral-400'>
                                {formatTime(currentTime)}
                            </p>

                            <RadixSlider.Root className='relative flex items-center select-non touch-none w-full h-10'
                                defaultValue={[1]}
                                value={[currentTime / (duration || 1)]}
                                onValueChange={(values) => {
                                    const newPercentage = values[0];
                                    if (!isNaN(newPercentage) && duration !== null) {
                                        const newCurrentTime = newPercentage * duration;
                                        setCurrentTime(newCurrentTime);
                                        audio.currentTime = newCurrentTime;
                                    }
                                }
                                }
                                max={1}
                                step={0.1}
                                aria-label='Volume'
                            >
                                <RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
                                    <RadixSlider.Range className='absolute bg-white rounded-full h-full' />
                                </RadixSlider.Track>
                            </RadixSlider.Root>
                            <p className='text-[12px] text-neutral-400'>
                                {formatTime(duration || 0)}
                            </p>
                        </div>


                        <div className='md:justify-center justify-between md:mt-0 mt-2 items-center w-full  md:gap-x-6  flex '>
                            <button className={`${!shuffle ? 'text-neutral-400' : 'text-white '} flex justify-center items-center gap-x-1 bg-transparent `}
                                onClick={shuffleToggle}>
                                <RxShuffle size={18} />
                            </button>
                            <AiFillStepBackward size={25} onClick={onPlayPrevious} className=' cursor-pointer text-neutral-200 hover:text-white transition ' />
                            <div className='flex items-center justify-center h-10 w-10 cursor-pointer 
                                     rounded-full p-1 backdrop-blur-sm  bg-neutral-800  ' onClick={handlePlay} >
                                <Icon
                                    size={25}
                                    className='text-white'
                                />
                            </div>
                            <AiFillStepForward size={25} onClick={onPlayNext} className='cursor-pointer text-neutral-200 hover:text-white transition ' />

                            <div className={`relative w-fit flex justify-center items-center gap-x-1
                               ${!loop ? 'text-neutral-400 ' : 'text-white '}
                            `} onClick={toogleLoop} >
                                <RxLoop size={20} className='cursor-pointer  ' />

                            </div>
                        </div>


                    </div>


                </div>

            }
        </>
    )
}

export default PlayerContent