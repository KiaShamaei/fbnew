import { createContext, useContext } from "react";
import { CacheContextProps } from "../meta/types";

const CacheContext = createContext<CacheContextProps>({
    getCache: () => { },
    setCache: () => { },
})

export const useCache = () => {
    const { getCache, setCache } = useContext(CacheContext)
    return { getCache, setCache }
}

export default CacheContext;