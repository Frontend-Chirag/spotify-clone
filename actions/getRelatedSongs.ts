
import { Song } from "@/types";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getRelatedSongs = async (author: string): Promise<Song[]> => {

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('songs').select('*').ilike('author', `%${author}%`)
    .order('created_at', { ascending: false });

   
    if (error) {
        console.log(error)
    }

    return (data as any) || [];
};

export default getRelatedSongs;
