

import getSongsByArtist from '@/actions/getSongsByArtist'

interface SongArtistProps {
    author: string | undefined;
}

const SongArtist: React.FC<SongArtistProps> = async ({author}) => {

    const  songs  =  await  getSongsByArtist(author!)
    console.log(songs)

    return (
    <div>
        
    </div>
  )
}

export default SongArtist