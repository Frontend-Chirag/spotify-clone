"use client";
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai';
import useAuthModel from '@/hooks/useAuthModel';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import useSubscribeModel from '@/hooks/useSubscribeModel';



interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {

    const subscribeModel = useSubscribeModel();
    const authmodal = useAuthModel();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();

    const onClick = () => {
        if (!user) {
            return authmodal.onOpen();
        }
        if (!subscription) {
            return subscribeModel.onOpen();
        }
        return uploadModal.onOpen();
    };


    const onPlay = useOnPlay(songs);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist size={26} className='text-neutral-400' />
                    <p className=' text-neutral-400 font-medium text-md'>Your Library</p>
                </div>

                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 hover:text-white transition cursor-pointer"
                />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 px-3'>
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library