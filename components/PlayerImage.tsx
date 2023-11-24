import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'

interface PlayerImageProps {
    song: Song
    types: 'bg' | 'fr'
}

const PlayerImage: React.FC<PlayerImageProps> = ({ song, types }) => {

    const imageUrl = useLoadImage(song)

    return (
        <>
            {types === 'bg' ?
                <Image
                    src={imageUrl || ''}
                    alt='backgroundImage'
                    fill
                    className={`${types === 'bg' ? 'flex' : 'hidden'} blur-[20px]`}
                />
                :
                <>
                    <Image
                        src={imageUrl || ''}
                        alt='backgroundImage'
                        width={250}
                        height={250}
                        className={`w-[250] h-[250] z-10 ${types === 'fr' ? 'flex' : 'hidden'} rounded-lg shadow-xl shadow-black`}
                    />
                   
                </>
            }
        </>
    )
}

export default PlayerImage