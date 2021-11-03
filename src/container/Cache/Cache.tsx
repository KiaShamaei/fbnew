import React from 'react'
import { useContext } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react'
import CacheContext from './context/CacheContext'

const Cache: React.FC = ({
    children
}) => {
    const cache = useRef<any>({ });
    const setCache = useCallback((key: string, value: any) => {
        cache.current[key] = value;
    }, [])

    const getCache = useCallback((key: string) => {
        return cache.current[key];
    }, [])

    return (
        <CacheContext.Provider value={{
            setCache,
            getCache
        }}>
            {children}
        </CacheContext.Provider>
    )
}

export const useCache = () => {
    const {
        getCache,
        setCache
    } = useContext(CacheContext)
    return {
        getCache,
        setCache
    }
}

export default Cache
