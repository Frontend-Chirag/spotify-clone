"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import qs from 'query-string';
import Input from './Input';

const SearchInput = () => {

    const router = useRouter();
    const [value, setValue] = useState<string>("");

    const debounceValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debounceValue,
        };
        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });

        router.push(url);

    }, [debounceValue, router]);

    return (
       <Input
        placeholder='what do you want to Listen to ? '
        value={value}
        onChange={(e) => setValue(e.target.value)}
       />
    )
}

export default SearchInput