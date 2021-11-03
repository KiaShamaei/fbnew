import { useState, useEffect, useRef, useCallback } from 'react'
import API from '../API';
import axios, { Method } from 'axios'
import isEqual from 'react-fast-compare'
import { usePrevious } from './usePrevious';

interface Props {
    url?: string,
    params?: any,
    method?: Method,
    fetchFirst?: boolean,
    onSuccess?: (data: any) => void,
    onFailur?: (error: any) => void,
    isTest?: boolean;
    parseData?: boolean;
    responseType?: any;
}

function useDataGetter<T = any>({
    url,
    params,
    method = 'GET',
    fetchFirst = true,
    onSuccess,
    onFailur,
    isTest = true,
    parseData = false,
    responseType
}: Props) {
    const isFirst = useRef(true);
    const cancelToken = useRef<any>();
    const [state, setState] = useState<{
        loading: boolean,
        data: T | null,
        error: any,
        count?: number,
        statusCode: number | null | undefined,
        msg: string[] | null,
        message?: string | null
    }>({
        loading: (isFirst && fetchFirst) ? true : false,
        data: null,
        error: null,
        statusCode: null,
        msg: null,
        message: null
    })
    const fetch = useCallback((p = {}, data?, urlInput?: string) => {
        return new Promise<T>((resolve, reject) => {
            setState((s: any) => ({ ...s, loading: true }));
            API({
                url: urlInput || url,
                method,
                params: { ...params, ...p },
                data,
                responseType,
                cancelToken: new axios.CancelToken((token: any) => {
                    cancelToken.current = token
                })
            }).then(res => {
                cancelToken.current = null
                const count: number = res.data?.total
                const finalData: T = parseData ? res.data?.data : res.data
                const msg = res.data?.msg
                if (res.data.success === false) {
                    throw res;
                }
                resolve(finalData as T)
                setState({
                    data: finalData as T,
                    loading: false,
                    error: null,
                    count,
                    msg,
                    statusCode: res.status,
                })
                onSuccess && onSuccess(finalData);
            })
                .catch((e: any) => {
                    if (axios.isCancel(e)) {
                        return
                    }
                    if (e && (e?.response?.data || e?.data)) {
                        const msg = e.response?.data?.msg || e.data?.msg
                        setState({
                            data: null,
                            error: e?.response?.data || e.data,
                            loading: false,
                            statusCode: e?.response?.status || e.status,
                            msg,
                        })
                    } else {
                        setState({
                            data: null,
                            error: e?.message,
                            msg: [e?.message],
                            loading: false,
                            statusCode: e?.response?.status
                        })
                    }
                    reject({ error: e.message, msg: e?.data?.msg });
                    onFailur && onFailur(e.response?.data)
                    console.error('ERROR ', e)
                })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [method, onFailur, onSuccess, parseData, url])
    const changeData = useCallback((newData: any) => {
        setState((prev: any) => ({
            ...prev,
            data: newData
        }))
    }, [])
    const myPreviousState = usePrevious(params)
    useEffect(() => {
        if (isFirst.current && !fetchFirst)
            return;
        const is = isEqual(params, myPreviousState);
        if (!is || !params)
            fetch(params);
        isFirst.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch, fetchFirst]);
    return { ...state, fetch, changeData };
}

export default useDataGetter
