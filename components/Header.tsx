"use client";

import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi'
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useAuthModel from '@/hooks/useAuthModel';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { usePalette } from 'react-palette';
import Link from 'next/link';
import usePlayer from '@/hooks/usePlayer';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
    imageUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, imageUrl }) => {

    const player = usePlayer();
    const { data, error } = usePalette(imageUrl || '')
    const authModel = useAuthModel();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();

    const { user } = useUser();


    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Logged out')
        }
    }
    return (
        <div className={twMerge(`
        h-fit  
        p-6
        ${!imageUrl && 'bg-gradient-to-b from-emerald-800'}
        `, className)}
            style={{ background: imageUrl && `linear-gradient(to bottom, ${data.vibrant} , black)` }}
        >
            <div className='w-full mb-4 flex items-center  justify-between '>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button onClick={() => router.back()} className='rounded-full  bg-black flex items-center justify-center hover:opacity-75
                    transition'>
                        <RxCaretLeft size={35} className="text-white" />
                    </button>

                    <button onClick={() => router.forward()} className='rounded-full  bg-black flex items-center justify-center hover:opacity-75
                    transition'>
                        <RxCaretRight size={35} className="text-white" />
                    </button>
                </div>

                <div className='flex md:hidden gap-x-2 items-center'>
                    <button className='bg-white p-2 flex items-center justify-center rounded-full hover:opacity-75 transition'>
                        <Link href={'/'}>
                            <HiHome className='text-black' />
                        </Link>
                    </button>
                    <button className='bg-white p-2 flex items-center justify-center rounded-full hover:opacity-75 transition'>
                        <Link href={'/search'}>

                            <BiSearch className='text-black' />
                        </Link>
                    </button>
                </div>

                <div className='flex justify-between items-center gap-x-4'>
                    {
                        user ? (
                            <div className='flex gap-x-4 items-center'>
                                <Button className='bg-white px-6 py-2' onClick={handleLogout}>
                                    Logout
                                </Button>
                                <Button onClick={() => router.push('/account')}
                                    className='bg-white'
                                >
                                    <FaUserAlt />
                                </Button>
                            </div>
                        ) :
                            <>
                                <div>
                                    <Button className='bg-transparent text-neutral-300 font-medium'
                                        onClick={authModel.onOpen}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                                <div>
                                    <Button className='bg-white px-6 py-2'
                                        onClick={authModel.onOpen}
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </>
                    }
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header