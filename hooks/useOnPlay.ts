import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModel";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[] | Song) => {
    const player = usePlayer();
    const authModal = useAuthModel();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        const songIds = Array.isArray(songs) ? songs.map((song) => song.id) : [songs.id];
        player.setId(id)
        player.setIds(songIds);
    }

    return onPlay;
};

export default useOnPlay;
