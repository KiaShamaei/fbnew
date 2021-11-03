export interface CacheContextProps {
    getCache: (key: string) => any;
    setCache: (key: string, value: any) => void;
}