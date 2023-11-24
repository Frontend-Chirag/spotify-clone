"use client";

import React, { useState } from 'react'
import Model from './Model';
import { Price, ProductWithPrice } from '@/types';
import Button from './Button';
import { subscribe } from 'diagnostics_channel';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import useSubscribeModel from '@/hooks/useSubscribeModel';


interface SubscribeModelProps {
    products: ProductWithPrice[];
}

const SubscribeModel: React.FC<SubscribeModelProps> = ({ products }) => {

    const subscribeModel = useSubscribeModel();

    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModel.onClose();
        }
    };

    const handleCheckOut = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast('Already subscribed');
        }
        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    }

    const formatePrice = (prices: Price) => {
        const priceString = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: prices.currency,
            minimumFractionDigits: 0,
        }).format((prices.unit_amount || 0) / 100);

        return priceString;
    }

    let content = (
        <div className='text-center'>
            No Products Available
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No Prices Available
                            </div>
                        );
                    }

                    return product.prices.map((price) => (
                        <Button key={price.id}
                            onClick={() => handleCheckOut(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className='mb-4'
                        >
                            {`Subscribe for ${formatePrice(price)} a  ${price.interval}`}
                        </Button>
                    ));
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div className='text-center'>
                Already Subscribed
            </div>
        )
    }

    return (
        <Model
            title='Only for Premium users'
            description='Listen to music with spotify Premium'
            isOpen={subscribeModel.isOpen}
            onChange={onChange}
        >
            {content}
        </Model>
    )
}

export default SubscribeModel