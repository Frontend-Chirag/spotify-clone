"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import TimeFormate from "@/components/TimeFormate";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types"

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No Songs Found
            </div>
        )
    };
    
    const onPlay = useOnPlay(songs);

    return (
        <div className="flex
         flex-col
         gap-y-2
         w-full 
         px-6
        ">
            {songs.map((song) => (
                <div className="md:grid md:grid-cols-2 flex justify-between items-center gap-x-4 w-full " key={song.id}>
                    <div className="flex-1 w-[220px] md:w-full">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                   
                    <div className="flex justify-end items-center ">

                        <LikeButton songId={song.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchContent