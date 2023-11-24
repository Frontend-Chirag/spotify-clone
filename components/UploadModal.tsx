"use client";

import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import uniqid from 'uniqid';


import useUploadModal from "@/hooks/useUploadModal"
import Model from "./Model"
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RingLoader } from 'react-spinners';



const UploadModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });


    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueId = uniqid();

            // upload song
            const { data: songData, error: songError } = await supabaseClient.storage.from('songs')
                .upload(`song-${values.title}-${uniqueId}`, songFile, { cacheControl: '3600', upsert: false });

            if (songError) {
                setIsLoading(false);
                return toast.error('Failed to upload song')
            }

            // upload image
            const { data: imageData, error: imageError } = await supabaseClient.storage.from('images')
                .upload(`image-${values.title}-${uniqueId}`, imageFile, { cacheControl: '3600', upsert: false });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload image')
            }

            const { error: supabaseError } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                song_path: songData.path,
                image_path: imageData.path,
                author: values.author,
            });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            };

         router.refresh();
         setIsLoading(false);
         toast.success('Song created!')
         reset();
         uploadModal.onClose()

        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Model
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                <Input
                    id='title'
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder='Song title'
                />
                <Input
                    id='author'
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder='Song author'
                />
                <div>
                    <div className='pb-1'>
                        Select a song file
                    </div>
                    <Input
                        id='song'
                        type='file'
                        accept='.mp3'
                        disabled={isLoading}
                        {...register('song', { required: true })}
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select an image
                    </div>
                    <Input
                        id='image'
                        type='file'
                        accept='image/*'
                        disabled={isLoading}
                        {...register('image', { required: true })}
                    />
                </div>

                <Button disabled={isLoading} type='submit'>
                 {!isLoading ?   'Create' : 'Uploading...'}
                </Button>
            </form>
        </Model>
    )
}

export default UploadModal