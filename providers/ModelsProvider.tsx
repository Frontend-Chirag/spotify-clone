"use client";

import AuthModel from '@/components/AuthModel';
import SubscribeModel from '@/components/SubscribeModel';
import UploadModal from '@/components/UploadModal';

import { useState, useEffect } from 'react';
import { ProductWithPrice } from "@/types";

interface ModelsProviderProps {
    products: ProductWithPrice[];
}

const ModelsProvider: React.FC<ModelsProviderProps> = ({ products }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)

    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModel />
            <UploadModal />
            <SubscribeModel  
             products={products}
            />
        </>
    )
}

export default ModelsProvider