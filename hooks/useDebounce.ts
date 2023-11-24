import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay?: number): T {

    const [debounce, setDebounce] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay || 500);

        return () => {
            clearTimeout(timer)
        }

    }, [value, delay])

    return debounce
};

export default useDebounce;