
import React from 'react'
import getRelatedSongs from '@/actions/getRelatedSongs';
import getSongByParams from '@/actions/getSongByParams';
import ArtistSongs from './components/ArtistSongs';
import getSongs from '@/actions/getSongs';

interface PageProps {
    params: {
        id: string
    }
}

const page = async ({ params }: PageProps) => {

    const paramsAuthor = await getSongByParams(params.id);
    const data = await getRelatedSongs(paramsAuthor.author);
    const allSongs = await getSongs();


    return (

        <div className='text-white'>
            <ArtistSongs
                songs={data}
                currentSong={paramsAuthor}
                allSongs={allSongs}
            />
        </div>

    )
}

export default page;