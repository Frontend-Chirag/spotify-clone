"use client";

import React, { useState, useEffect } from 'react';

import useSubscribeModel from '@/hooks/useSubscribeModel';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { postData } from '@/libs/helpers';
import toast from 'react-hot-toast';
import Button from '@/components/Button';

const AccountContent = () => {

    const router = useRouter();
    const subscribeModel = useSubscribeModel();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });

            window.location.assign(url);
        } catch (error) {
            if (error) {
                toast.error((error as Error)?.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className='mb-7 px-6'>
            {!subscription && (
                <div className='flec flec-col gap-y-4'>
                    <p>
                        No active plan.
                    </p>
                    <Button onClick={subscribeModel.onOpen} className='w-[300px]'>
                         Subscribe
                    </Button>
                </div>
            )}
            {subscription && (
                <div className='flex flex-col gap-y-4'>
                 <p>You are currently on the <b>{subscription?.prices?.products?.name}</b> Plan</p>
                  <Button className='w-[300px]'
                  disabled={loading || isLoading}
                  onClick={redirectToCustomerPortal}
                  >
                    Open customer Portal
                  </Button>
                </div>
            )}
        </div>
    )
}

export default AccountContent